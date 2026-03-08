// Googalji Voice Worker
// Cloudflare Worker

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1";

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

async function getScript(supabaseUrl, supabaseKey, scriptId) {
  const url = scriptId
    ? `${supabaseUrl}/rest/v1/googalji_scripts?id=eq.${scriptId}&limit=1`
    : `${supabaseUrl}/rest/v1/googalji_scripts?published=eq.false&order=created_at.asc&limit=1`;

  const response = await fetch(url, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch script from Supabase');
  const scripts = await response.json();
  if (scripts.length === 0) throw new Error('No unprocessed scripts found');
  return scripts[0];
}

async function generateAudio(elevenLabsKey, voiceId, text) {
  const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': elevenLabsKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_v3',
      voice_settings: {
        stability: 0.82,        // Slightly lower — allows natural variation in flat delivery
        similarity_boost: 0.90, // Keep high — stay true to the voice
        style: 0.12,            // Slightly more — lets the dryness come through
        use_speaker_boost: true,
        speed: 0.87             // Slower — Googalji does not rush
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${error}`);
  }

  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function uploadAudioToSupabase(supabaseUrl, supabaseKey, scriptId, audioBuffer) {
  const fileName = `audio/${scriptId}.mp3`;

  const response = await fetch(
    `${supabaseUrl}/storage/v1/object/googalji-media/${fileName}`,
    {
      method: 'PUT',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': '3600'
      },
      body: audioBuffer
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Supabase storage upload failed: ${error}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/googalji-media/${fileName}`;
}

async function updateVideoRecord(supabaseUrl, supabaseKey, scriptId, audioUrl) {
  const checkResponse = await fetch(
    `${supabaseUrl}/rest/v1/googalji_videos?script_id=eq.${scriptId}&limit=1`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    }
  );

  const existing = await checkResponse.json();

  if (existing.length > 0) {
    const updateRes = await fetch(`${supabaseUrl}/rest/v1/googalji_videos?script_id=eq.${scriptId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ voice_file_url: audioUrl })
    });
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Video record update failed: ${err}`);
    }
  } else {
    const insertRes = await fetch(`${supabaseUrl}/rest/v1/googalji_videos`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        script_id: scriptId,
        voice_file_url: audioUrl
      })
    });
    if (!insertRes.ok) {
      const err = await insertRes.text();
      throw new Error(`Video record insert failed: ${err}`);
    }
  }
}

function buildFullScript(beats, beat1) {
  // Structure: beat1 (plain observation) ... beat 2 ... beat 3 ... exit line
  // Trailing ellipsis after each beat for natural breath
  const parts = [];

  if (beat1) {
    parts.push(beat1.trim() + '...');
  }

  beats.forEach((beat, index) => {
    // Strip action tags from spoken text — they are visual direction only
    let text = beat.text.replace(/^\[.*?\]\s*/, '').trim();
    if (index < beats.length - 1) {
      text += beat.pause_after ? '...' : '.';
    }
    parts.push(text);
  });

  return parts.join('  ').trim() + '...';
}

export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === 'GET') {
      return new Response(JSON.stringify({ status: 'Googalji Voice standing by.' }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${env.COUNCIL_SECRET}`) {
      return new Response('Unauthorized', { status: 401, headers: CORS_HEADERS });
    }

    try {
      const body = await request.json();
      const scriptId = body.script_id || null;

      const script = await getScript(env.SUPABASE_URL, env.SUPABASE_KEY, scriptId);
      const fullText = buildFullScript(script.beats, script.beat1);
      const audioBuffer = await generateAudio(env.ELEVENLABS_API_KEY, env.GOOGALJI_VOICE_ID, fullText);
      const audioUrl = await uploadAudioToSupabase(env.SUPABASE_URL, env.SUPABASE_KEY, script.id, audioBuffer);
      await updateVideoRecord(env.SUPABASE_URL, env.SUPABASE_KEY, script.id, audioUrl);

      return new Response(JSON.stringify({
        success: true,
        script_id: script.id,
        audio_url: audioUrl,
        text_spoken: fullText
      }), {
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
      });
    }
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      fetch(`https://${env.WORKER_DOMAIN}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${env.COUNCIL_SECRET}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
    );
  }
};
