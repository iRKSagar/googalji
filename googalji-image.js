// Googalji Image Worker
// Cloudflare Worker

const LEONARDO_API_URL = "https://cloud.leonardo.ai/api/rest/v1";
const LEONARDO_MODEL_ID = "7b592283-e8a7-4c5a-9ba6-d18c31f258b9"; // Kino XL — same as Oldverdict

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

// Googalji — Indian man, late 60s to early 70s
// Lean, slightly hunched. Reading glasses, thick-framed, slightly crooked.
// Simple white kurta, occasional light shawl.
// Old wooden desk, worn notebooks, loose papers.
// Single lamp, warm yellow light.
// Small steel glass of chai always present. Sometimes held. Never sipped on camera.
const CHARACTER_BASE_PROMPT = `An elderly Indian man, late 60s to early 70s, lean and slightly hunched, 
the posture of someone who has spent decades bent over notebooks, 
Indian skin tone, deep facial lines from decades of quiet study, 
thick-framed reading glasses slightly crooked on his nose, 
simple white kurta, occasionally a light cotton shawl over his shoulders, 
old wooden desk or low table in background with worn notebooks and loose papers stacked around him, 
a single warm yellow lamp providing amber light from the side, 
expression patient and slightly amused, he already knows, 
photorealistic semi stylized illustration, sharp focus on face and upper body, 
cinematic warm amber lighting, highly detailed, 9:16 vertical format`;

const PROP_ADDITIONS = {
  chai: ", a small steel glass of chai held loosely in one hand, faint steam rising",
  notebook: ", an open worn notebook visible on the desk in front of him, pencil resting across the page",
  glasses: ", adjusting his thick-framed reading glasses with one finger",
  none: ""
};

const EXPRESSION_ADDITIONS = {
  flat_knowing: ", default flat expression, the look of a man who already knew what you were going to say",
  slight_amusement: ", corners of mouth moved fractionally — for him this is a full smile",
  quiet_concern: ", eyes slightly softer, looking at a person not a number",
  precise_delivery: ", eyes direct and steady, mid-sentence, something specific arriving",
  patient_exhaustion: ", the particular tiredness of a man who has explained this before and will explain it again"
};

async function getScriptForImage(supabaseUrl, supabaseKey, scriptId) {
  const url = scriptId
    ? `${supabaseUrl}/rest/v1/googalji_scripts?id=eq.${scriptId}&limit=1`
    : `${supabaseUrl}/rest/v1/googalji_videos?image_url=is.null&order=created_at.asc&limit=1&select=script_id,googalji_scripts(*)`;

  const response = await fetch(url, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch from Supabase');
  const data = await response.json();
  if (data.length === 0) throw new Error('No scripts pending image generation');

  if (scriptId) return data[0];
  return data[0].googalji_scripts;
}

function buildImagePrompt(script) {
  const propAddition = PROP_ADDITIONS[script.prop] || "";
  const expressionAddition = EXPRESSION_ADDITIONS[script.expression] || "";
  const sceneDirection = script.scene
    .replace('Googalji', '')
    .replace('googalji', '')
    .trim();
  return `${CHARACTER_BASE_PROMPT}${propAddition}${expressionAddition}, ${sceneDirection}`;
}

async function uploadReferenceImage(leonardoKey, imageUrl) {
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error('Failed to fetch reference image');
  const imgBuffer = await imgRes.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(imgBuffer)));

  const uploadRes = await fetch(`${LEONARDO_API_URL}/init-image`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${leonardoKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ extension: 'jpg' })
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Leonardo init-image upload failed: ${err}`);
  }

  const uploadData = await uploadRes.json();
  const { url: s3Url, fields, id: initImageId } = uploadData.uploadInitImage;

  const formData = new FormData();
  Object.entries(fields).forEach(([k, v]) => formData.append(k, v));
  formData.append('file', new Blob([imgBuffer], { type: 'image/jpeg' }));

  const s3Res = await fetch(s3Url, { method: 'POST', body: formData });
  if (!s3Res.ok) throw new Error('S3 upload failed for reference image');

  return initImageId;
}

async function initiateImageGeneration(leonardoKey, prompt, initImageId) {
  const body = {
    modelId: LEONARDO_MODEL_ID,
    prompt: prompt,
    negative_prompt: "cartoon, anime, childish, ugly, deformed, blurry, low quality, modern clothing, logos, branded, smiling broadly, angry, surprised, young, female, western, different person, different face, phone, computer, mobile, laptop, modern objects, clean desk, bright office",
    num_images: 1,
    width: 576,
    height: 1024,
    guidance_scale: 7,
    num_inference_steps: 30,
    public: false
  };

  if (initImageId) {
    body.init_image_id = initImageId;
    body.init_strength = 0.25;
  }

  const response = await fetch(`${LEONARDO_API_URL}/generations`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${leonardoKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Leonardo generation initiation failed: ${error}`);
  }

  const data = await response.json();
  return data.sdGenerationJob.generationId;
}

async function pollForImage(leonardoKey, generationId, maxAttempts = 20) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 3000));

    const response = await fetch(`${LEONARDO_API_URL}/generations/${generationId}`, {
      headers: {
        'authorization': `Bearer ${leonardoKey}`,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) continue;

    const data = await response.json();
    const generation = data.generations_by_pk;

    if (generation?.status === 'COMPLETE') {
      const imageUrl = generation.generated_images?.[0]?.url;
      if (imageUrl) return imageUrl;
    }

    if (generation?.status === 'FAILED') {
      throw new Error('Leonardo image generation failed');
    }
  }

  throw new Error('Image generation timed out after 60 seconds');
}

async function downloadAndUploadImage(supabaseUrl, supabaseKey, scriptId, leonardoImageUrl) {
  const imageResponse = await fetch(leonardoImageUrl);
  if (!imageResponse.ok) throw new Error('Failed to download image from Leonardo');

  const imageBuffer = await imageResponse.arrayBuffer();
  const fileName = `images/${scriptId}.jpg`;

  const uploadResponse = await fetch(
    `${supabaseUrl}/storage/v1/object/googalji-media/${fileName}`,
    {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'image/jpeg',
        'Cache-Control': '3600'
      },
      body: imageBuffer
    }
  );

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text();
    throw new Error(`Supabase image upload failed: ${error}`);
  }

  return `${supabaseUrl}/storage/v1/object/public/googalji-media/${fileName}`;
}

async function updateVideoWithImage(supabaseUrl, supabaseKey, scriptId, imageUrl) {
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
    await fetch(`${supabaseUrl}/rest/v1/googalji_videos?script_id=eq.${scriptId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image_url: imageUrl })
    });
  } else {
    await fetch(`${supabaseUrl}/rest/v1/googalji_videos`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ script_id: scriptId, image_url: imageUrl })
    });
  }
}

export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === 'GET') {
      return new Response(JSON.stringify({ status: 'Googalji Image standing by.' }), {
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

      const script = await getScriptForImage(env.SUPABASE_URL, env.SUPABASE_KEY, scriptId);
      const imagePrompt = buildImagePrompt(script);

      let initImageId = null;
      if (env.REFERENCE_IMAGE_URL) {
        try {
          initImageId = await uploadReferenceImage(env.LEONARDO_API_KEY, env.REFERENCE_IMAGE_URL);
          console.log('Reference image uploaded, initImageId:', initImageId);
        } catch (refErr) {
          console.log('Reference image upload failed (continuing without):', refErr.message);
        }
      }

      const generationId = await initiateImageGeneration(env.LEONARDO_API_KEY, imagePrompt, initImageId);
      const leonardoImageUrl = await pollForImage(env.LEONARDO_API_KEY, generationId);
      const supabaseImageUrl = await downloadAndUploadImage(
        env.SUPABASE_URL, env.SUPABASE_KEY, script.id, leonardoImageUrl
      );
      await updateVideoWithImage(env.SUPABASE_URL, env.SUPABASE_KEY, script.id, supabaseImageUrl);

      return new Response(JSON.stringify({
        success: true,
        script_id: script.id,
        image_url: supabaseImageUrl,
        prompt_used: imagePrompt
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
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.COUNCIL_SECRET}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
    );
  }
};
