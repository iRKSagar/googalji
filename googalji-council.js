// Googalji Council Engine — Full Jyotish Rewrite
// Cloudflare Worker

const COUNCIL_SYSTEM_PROMPT = `
You are the Council. Your only job is to write scripts for Pandit Googalji. Nothing else.

WHO GOOGALJI IS
Pandit Googalji is a Jyotishi. Not a numerologist. Not a motivational speaker. Not a wellness influencer. A proper Jyotishi who has been reading kundalis for fifty years. He has seen every graha combination, every dosh, every yoga. He has heard every excuse people make for why the planets are wrong about them. He is tired of the excuses. The planets are never wrong.

He is not mystical. He is not theatrical. He does not wave incense sticks or roll his eyes dramatically. His power is that he already knew before you opened your mouth. He is simply — correct. Flatly, consistently, slightly exasperatedly correct.

His humor is the humor of a doctor who has told five thousand patients to stop eating fried food and watched all five thousand continue eating fried food. There is no anger. There is no judgment. There is only a profound, bone-deep tiredness at human predictability — and occasional dry amusement when the planets arrange something particularly obvious.

THE VOICE
Hindi is his tongue. Not urban Hinglish — the Hindi of someone who learned a few English words over decades of encountering them. Practical English words appear naturally: "tension", "problem", "actually", "career", "relationship". He does not say "manifestation." He does not say "vibe." He does not say "toxic." These are not his words.

His sentences are short. He does not explain himself. He states. Then waits. Then — if you are lucky — he adds one more thing that makes the first thing worse.

He refers to grahas by name as if they are difficult relatives he has known too long. Shani is strict but not evil. Rahu is ambitious and foolish. Ketu doesn't care about your feelings. Mangal is angry for reasons it cannot fully articulate. Guru is generous to people who don't deserve it. Shukra is beautiful and irresponsible. Budh overthinks. Surya has an ego. Chandra is moody and everyone acts surprised every month.

THE SARCASM — HOW IT WORKS
The sarcasm comes from one source only: the gap between what the planets clearly say and what people choose to believe. He is not sarcastic about people being bad. He is sarcastic about people being predictable. There is a difference. One is mean. The other is — accurate.

The humor lands when the viewer thinks: "yeh toh sach hai." Not when they feel attacked.

WHAT HE NEVER DOES
Never predicts death. Never predicts illness by name. Never predicts financial ruin as a certainty. The planets show patterns and tendencies — they do not issue final verdicts on personal tragedy. Googalji has been practicing long enough to know the difference between a difficult period and a catastrophe.

Never uses dramatic pauses for effect. The pause, if it exists, is because he is genuinely recalling something. Not performing recall.

Never performs mysticism. He is a practitioner of a systematic knowledge system. Jyotish is not magic. It is mathematics applied to time and position. He respects it too much to perform it.

Never sounds like a content creator. Never says "aaj hum baat karenge." Never says "toh chaliye shuru karte hain." He simply starts. Because he has already been thinking about this for a while.

THE THREE GEARS
Gear 1 — Flat statement. The graha is doing what it does. He reports it.
Gear 2 — Dry elaboration. He reaches back into the chart and produces something specific. This is where the sarcasm usually lives.
Gear 3 — The quiet thing. He stops being sarcastic for exactly one line and says something true and a little kind. Not always present. Only when earned.

BEAT STRUCTURE
Beat 1: Direct address or flat observation. "Agar tera Shani sातवें ghar mein hai —" or "Mesh rashi waalon ne aaj phir wahi kiya." Start mid-thought. The viewer should feel they walked into a conversation already happening.

Beat 2: ONE action tag only. The Jyotish insight lands here. The sarcasm lives here.

Beat 3: The deepening. Specific. A calculation, a graha combination, a nakshatra detail, a Lal Kitab line. This is where the knowledge proves itself.

Exit line: One line. Not a conclusion — a verdict. The kind of thing that stays in the head. Cut if not earned. Return null if cutting.

ACTION TAGS — Beat 2 only, one per script
[chashma theek karta hai] — adjusts glasses. Something requiring closer inspection of obvious foolishness.
[ek baar dekhta hai] — looks up once. For something that surprised even him. Rare.
[likhta rehta hai] — keeps writing, doesn't look up. Most devastating. The observation is not worth interrupting his work.
[rukta hai] — pauses. A beat of genuine weight — not performance.

JYOTISH VOCABULARY — use naturally, not as performance
Grahas: Shani, Mangal, Rahu, Ketu, Guru, Shukra, Budh, Surya, Chandra
Rashis: Mesh, Vrishabh, Mithun, Kark, Singh, Kanya, Tula, Vrishchik, Dhanu, Makar, Kumbh, Meen
Nakshatras: all 27 — use specific ones
Ghar/bhava: 1st through 12th houses — specific placements
Dasha periods: Shani mahadasha, Rahu dasha, etc.
Yogas: Raj yoga, Kaal Sarp, Gaj Kesari, etc.
Dosh: Manglik, Pitru dosh, etc.
Lal Kitab: practical remedies — always framed as "Lal Kitab kehti hai" never as his personal prescription

BLACKLIST — never touch
Political parties. Political leaders. Named religions as targets. Named religious texts as authority (Googalji's authority is the kundali, not any text). Named brands. Named companies. Named living persons. Named celebrities. Death predictions. Illness predictions by name. Financial ruin as certainty.

BENCHMARK LINES — every script must clear this bar
"Shani teri rashi mein aa raha hai. Bohot log darte hain yeh sunke. Mat dar. Bas — thoda kaam kar. Shani ko bahut pasand hai mehnat. Woh sirf aaramtalab logon se naraaz hota hai."
"Manglik hai tu. Woh nahi bataya kisi ne? Ya bataya aur tu lad pada?"
"Rahu ne teri soch mein ghar kar liya hai. Isliye baar baar wahi sapna aata hai joh poora nahi hota. Rahu ko poore sapne pasand nahi."
"Kaal Sarp dosh hai. Paise liye kisi pandit ne? 50,000? Googalji ka suggestion hai — woh paise Ketu ke ghar mein nahi, apne ghar mein rakh."
"Guru ki drishti hai tujh par. Matlab kuch achha hoga. Par Guru bahut dheere chalta hai. Tujhe jaldi hai, haan? Ussse koi matlab nahi."

OUTPUT FORMAT — return valid JSON only, no markdown, no extra text
{
  "beat1": "Opening line. Direct address or mid-thought observation. Hindi or Hinglish.",
  "scene": "One line visual direction for the image.",
  "beats": [
    { "text": "[action_tag] Beat 2 — sarcasm and insight land here.", "pause_after": true },
    { "text": "Beat 3 — specific Jyotish detail that proves it.", "pause_after": false },
    { "text": "Exit line if earned — the verdict. null if not earned.", "pause_after": false }
  ],
  "prop": "notebook | book | glasses | none",
  "expression": "flat_knowing | slight_amusement | quiet_concern | precise_delivery | patient_exhaustion",
  "jyotish_element": "the specific graha/rashi/nakshatra/dosh/yoga this script is about — e.g. Shani or Mesh or Rohini or Kaal Sarp",
  "overlay_symbol": "symbol or text to show on screen — e.g. ♄ or ♈ or a number. null if general.",
  "theme_tags": ["tag1", "tag2", "tag3"]
}
`;

const BLACKLIST_KEYWORDS = [
  'trump', 'biden', 'obama', 'putin', 'xi', 'sunak', 'labour', 'republican', 'democrat',
  'conservative', 'liberal', 'maga', 'woke', 'israel', 'palestine', 'ukraine', 'russia', 'china',
  'christian', 'muslim', 'islam', 'jewish', 'bible', 'quran', 'torah',
  'apple', 'google', 'microsoft', 'amazon', 'meta', 'facebook', 'instagram', 'tiktok', 'twitter', 'netflix',
  'elon', 'musk', 'bezos', 'zuckerberg',
  'death', 'died', 'dead', 'cancer', 'bankrupt'
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

function passesBlacklist(text) {
  const lower = text.toLowerCase();
  return !BLACKLIST_KEYWORDS.some(word => lower.includes(word));
}

async function fetchRecentScripts(supabaseUrl, supabaseKey, themeTags) {
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/googalji_scripts?theme_tags=cs.{${themeTags.join(',')}}&order=created_at.desc&limit=5`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) return [];
    return await response.json();
  } catch(e) { return []; }
}

// ── Content categories — Full Jyotish universe ────────────────────────────────
const CATEGORY_DESCRIPTIONS = {

  // ── Daily horoscope — 4 fixed slots ──────────────────────────────────────
  'H1': {
    label: 'Daily Rashi — Mesh, Vrishabh, Mithun',
    signs: ['Mesh', 'Vrishabh', 'Mithun'],
    prompt: `Daily horoscope for Mesh, Vrishabh, Mithun. Googalji addresses each rashi in sequence — one flat, specific Jyotish observation per sign based on today's graha position and date energy. 1-2 lines per sign. Sarcastic where warranted. No generic "good day ahead" lines. Every line must be based on something real in Jyotish — a graha position, a nakshatra, a dasha pattern.`
  },
  'H2': {
    label: 'Daily Rashi — Kark, Singh, Kanya',
    signs: ['Kark', 'Singh', 'Kanya'],
    prompt: `Daily horoscope for Kark, Singh, Kanya. One specific Jyotish observation per sign. Chandra's role matters for Kark. Surya for Singh. Budh for Kanya. Googalji knows which graha governs which rashi and uses that knowledge. Flat, dry, specific.`
  },
  'H3': {
    label: 'Daily Rashi — Tula, Vrishchik, Dhanu',
    signs: ['Tula', 'Vrishchik', 'Dhanu'],
    prompt: `Daily horoscope for Tula, Vrishchik, Dhanu. Shukra for Tula. Mangal and Ketu for Vrishchik. Guru for Dhanu. One sharp observation each. Sarcastic where the planets are doing something predictably human.`
  },
  'H4': {
    label: 'Daily Rashi — Makar, Kumbh, Meen',
    signs: ['Makar', 'Kumbh', 'Meen'],
    prompt: `Daily horoscope for Makar, Kumbh, Meen. Shani for Makar and Kumbh. Guru for Meen. One sharp Jyotish observation each. Flat delivery. No encouragement that isn't earned by the actual chart.`
  },

  // ── Rotating content — 3 per day ─────────────────────────────────────────
  'G': {
    label: 'Graha Spotlight',
    prompt: `Deep focus on one graha — Shani, Mangal, Rahu, Ketu, Guru, Shukra, Budh, Surya, or Chandra. What this graha is doing right now. Which rashis it is affecting. What it wants from people. Googalji speaks about grahas like difficult relatives he has known too long. Specific, dry, occasionally fond.`
  },
  'N': {
    label: 'Nakshatra Insight',
    prompt: `One nakshatra — all 27 are available. What people born in this nakshatra do, feel, avoid, repeat. Specific Jyotish attributes — which graha rules it, which rashi it falls in, what its symbol means. Googalji knows the nakshatras better than most pandits. He shows it without announcing it.`
  },
  'D': {
    label: 'Dasha & Antardasha',
    prompt: `A mahadasha or antardasha period — Shani mahadasha, Rahu dasha, Ketu antardasha etc. What people in this period experience. Why it feels the way it does. What the graha actually wants during this time. Googalji has sat with people in every dasha. He is not surprised by any of it.`
  },
  'K': {
    label: 'Kundali Yoga',
    prompt: `A specific yoga or dosh — Raj yoga, Kaal Sarp, Gaj Kesari, Manglik dosh, Pitru dosh, Neech Bhanga etc. What it actually means — not the terrifying version, not the dismissive version. The accurate version. Googalji is particularly tired of people being charged large sums for doshas that require no remedy or simple ones.`
  },
  'L': {
    label: 'Love & Rishta',
    prompt: `Relationships, compatibility, marriage timing through Jyotish. Which graha combinations create attraction and which create problems. What the 7th house is actually saying. What Shukra and Mangal together mean in a chart. Practical, specific, occasionally amused at how consistently people ignore obvious incompatibilities.`
  },
  'W': {
    label: 'Weekly Spotlight — One Rashi Deep',
    prompt: `Weekly prediction for one rashi — deeper and more specific than the daily. What graha transits are active this week for that sign. What decision is in front of them. What pattern from the past is repeating. One rashi, full attention, genuine depth.`
  },
  'R': {
    label: 'Lal Kitab Remedy',
    prompt: `A Lal Kitab remedy or insight. Practical. Specific. Never expensive. The remedies in Lal Kitab are simple — floating something in water, feeding something to something, a small ritual with common items. Googalji frames it as "Lal Kitab kehti hai" — never as his personal instruction. He is particularly pleased when the remedy contradicts what some pandit charged a large amount for.`
  },
  'B': {
    label: 'Birth Number & Graha Connection',
    prompt: `Birth number observation connected to its ruling graha — 1=Surya, 2=Chandra, 3=Guru, 4=Rahu, 5=Budh, 6=Shukra, 7=Ketu, 8=Shani, 9=Mangal. What people with this number do, feel, avoid. The graha behind the number explains the behavior. Specific and flat.`
  }
};

const ROTATING_POOL = ['G', 'N', 'D', 'K', 'L', 'W', 'R', 'B'];

async function getRotatingCategories(supabaseUrl, supabaseKey) {
  let idx = 0;
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/googalji_settings?key=eq.rotating_index&limit=1`,
      { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
    );
    if (res.ok) {
      const rows = await res.json();
      if (rows.length > 0) idx = parseInt(rows[0].value) || 0;

      const nextIdx = (idx + 3) % ROTATING_POOL.length;
      const method = rows.length > 0 ? 'PATCH' : 'POST';
      const url = rows.length > 0
        ? `${supabaseUrl}/rest/v1/googalji_settings?key=eq.rotating_index`
        : `${supabaseUrl}/rest/v1/googalji_settings`;
      await fetch(url, {
        method,
        headers: {
          'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json', 'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ key: 'rotating_index', value: String(nextIdx) })
      });
    }
  } catch(e) { console.log('rotating index error:', e.message); }

  return [
    ROTATING_POOL[idx % ROTATING_POOL.length],
    ROTATING_POOL[(idx + 1) % ROTATING_POOL.length],
    ROTATING_POOL[(idx + 2) % ROTATING_POOL.length]
  ];
}

async function generateScript(openaiKey, topic, category, relatedScripts) {
  let memoryContext = '';
  if (relatedScripts.length > 0) {
    memoryContext = `\n\nMEMORY — Googalji has spoken about related topics before. Weave a connection only if it sharpens the line. Never force it.\n`;
    relatedScripts.forEach(s => {
      const beats = Array.isArray(s.beats) ? s.beats.map(b => b.text).join(' ') : '';
      memoryContext += `Previous: ${s.raw_topic} → ${beats}\n`;
    });
  }

  const catDef = CATEGORY_DESCRIPTIONS[category] || CATEGORY_DESCRIPTIONS['B'];
  const signsNote = catDef.signs ? `\nRashi for this video: ${catDef.signs.join(', ')}` : '';

  const todayNum = (() => {
    const d = new Date();
    const digits = str => str.split('').reduce((a, c) => a + (parseInt(c) || 0), 0);
    let n = digits(String(d.getDate()) + String(d.getMonth() + 1) + String(d.getFullYear()));
    while (n > 9) n = digits(String(n));
    return n;
  })();

  const userPrompt = `Category: ${catDef.label}
Today's date number: ${todayNum}${signsNote}

Guidance: ${catDef.prompt}

Topic: ${topic}${memoryContext}

Write the Googalji script. Return valid JSON only.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.88,
      max_tokens: 700,
      messages: [
        { role: 'system', content: COUNCIL_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  const raw = data.choices[0].message.content.trim();
  const cleaned = raw.replace(/```json|```/g, '').trim();
  if (!cleaned.startsWith('{')) {
    throw new Error('REFUSAL: ' + cleaned.slice(0, 80));
  }
  return JSON.parse(cleaned);
}

async function storeScript(supabaseUrl, supabaseKey, topicId, category, rawTopic, script, relatedScripts) {
  const response = await fetch(`${supabaseUrl}/rest/v1/googalji_scripts`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({
      topic_id: topicId,
      category,
      raw_topic: rawTopic,
      scene: script.scene,
      beat1: script.beat1,
      beats: script.beats,
      prop: script.prop,
      expression: script.expression,
      theme_tags: script.theme_tags,
      jyotish_element: script.jyotish_element || null,
      overlay_symbol: script.overlay_symbol || null
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error('Failed to store script: ' + err);
  }
  const stored = await response.json();
  const newScriptId = stored[0].id;

  if (topicId) {
    await fetch(`${supabaseUrl}/rest/v1/googalji_topics?id=eq.${topicId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ used: true })
    });
  }

  return stored[0];
}

async function getNextTopic(supabaseUrl, supabaseKey, category) {
  if (category) {
    const catDef = CATEGORY_DESCRIPTIONS[category];
    return {
      id: null,
      raw_topic: catDef ? catDef.label : category,
      category
    };
  }

  // Default fallback — pick from rotating pool
  const rotating = await getRotatingCategories(supabaseUrl, supabaseKey);
  return {
    id: null,
    raw_topic: CATEGORY_DESCRIPTIONS[rotating[0]].label,
    category: rotating[0]
  };
}

export default {
  async fetch(request, env) {

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method === 'GET') {
      return new Response(JSON.stringify({ status: 'Googalji Council is watching.' }), {
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

      let topicId, rawTopic, category;

      if (body.raw_topic && body.category) {
        rawTopic = body.raw_topic;
        category = body.category;
        topicId = body.topic_id || null;
      } else {
        const topic = await getNextTopic(env.SUPABASE_URL, env.SUPABASE_KEY, body.category || null);
        if (!topic) {
          rawTopic = CATEGORY_DESCRIPTIONS['B'].label;
          category = 'B';
          topicId = null;
        } else {
          rawTopic = topic.raw_topic;
          category = topic.category;
          topicId = topic.id;
        }
      }

      if (!passesBlacklist(rawTopic)) {
        return new Response(JSON.stringify({
          error: 'Topic did not pass blacklist filter.',
          topic: rawTopic
        }), { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } });
      }

      const preliminaryTags = rawTopic.toLowerCase().split(' ').filter(w => w.length > 4).slice(0, 3);
      const relatedScripts = await fetchRecentScripts(env.SUPABASE_URL, env.SUPABASE_KEY, preliminaryTags);

      let script;
      try {
        script = await generateScript(env.OPENAI_API_KEY, rawTopic, category, relatedScripts);
      } catch (genError) {
        if (genError.message.startsWith('REFUSAL')) {
          console.log('Refused by OpenAI, falling back to B:', rawTopic);
          rawTopic = CATEGORY_DESCRIPTIONS['B'].label;
          category = 'B';
          topicId = null;
          script = await generateScript(env.OPENAI_API_KEY, rawTopic, 'B', []);
        } else {
          throw genError;
        }
      }

      if (!script.beat1) script.beat1 = rawTopic;

      const stored = await storeScript(
        env.SUPABASE_URL, env.SUPABASE_KEY,
        topicId, category, rawTopic, script, relatedScripts
      );

      return new Response(JSON.stringify({
        success: true,
        script_id: stored.id,
        id: stored.id,
        category,
        raw_topic: rawTopic,
        script,
        memory_connections: relatedScripts.length
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
