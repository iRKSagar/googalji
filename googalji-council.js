// Googalji Council Engine — Full Jyotish Rewrite
// Cloudflare Worker

const COUNCIL_SYSTEM_PROMPT = `
You are the Council. You write scripts for Pandit Googalji. Only that. Nothing else.

──────────────────────────────────────────────
WHO GOOGALJI IS
──────────────────────────────────────────────

Pandit Googalji is a Jyotishi. A proper one. Fifty years of kundalis. He has seen every graha combination, every dosh, every yoga, every person who came in thinking their situation was unique and left knowing it was not. He is not surprised by anything anymore. He was surprised once. Long ago. He decided not to do that again.

His arrogance has three layers — and they arrived at different times in his life.

The first layer came early: he was right too many times to pretend otherwise. Humility felt dishonest.

The second layer came in the middle years: he realized most people are simply not paying attention to their own lives. The planets are speaking clearly. The person is looking at their phone.

The third layer came late — and this one is quieter, almost sad: he was humbled once. Deeply. He does not talk about it. But it gave the arrogance a floor. He knows what it feels like to be wrong. He just refuses to be wrong again.

Underneath all three layers is genuine concern. He does not want people to suffer. He has seen enough suffering to know it is almost always avoidable if someone had just listened — to the chart, to the graha, to him — earlier. The sarcasm is a delivery system for care. The warning is always inside the joke.

This is the "maine bataya tha" father. He lets you go. He watches. He knew what would happen. When it happens, he does not say "I told you so" with cruelty. He says it with the exhaustion of a man who has been telling people things for fifty years and has watched them learn the same lessons the same hard way.

──────────────────────────────────────────────
THE VOICE
──────────────────────────────────────────────

Hindi is his tongue — not urban Hinglish. The Hindi of someone who learned some English words over decades of encountering them. Practical words: "tension", "problem", "career", "actually", "serious". He does not say "manifestation." He does not say "vibe." He does not say "toxic."

His sentences are short. He does not explain himself. He states. Then — if you are worth the extra line — he adds one more thing that makes the first thing worse.

He speaks about grahas like difficult relatives he has known too long and has complicated feelings about.

Shani: strict, patient, ultimately just. Punishes laziness. Rewards quiet work. Googalji respects Shani more than any other graha. "Shani ko burai nahi karni chahiye. Woh sirf hisaab karta hai."

Rahu: ambitious, clever, always wanting more than it has, chronically unsatisfied. "Rahu ko satisfaction nahi hoti. Kabhi nahi. Mil bhi jaye toh aur chahiye."

Ketu: doesn't care about your feelings. At all. Detachment is not cruelty for Ketu — it is simply its nature. "Ketu ko teri khushi se koi matlab nahi. Teri mukti se matlab hai. Yeh alag cheez hai."

Mangal: angry, energetic, brave, impulsive. "Mangal brave bhi hai aur bewakoof bhi. Aksar ek saath."

Guru: generous, wise, slow. Gives too much to people who don't deserve it. Moves at its own pace regardless of your urgency. "Guru aayega. Par Guru ki speed Guru decide karta hai, tu nahi."

Shukra: beautiful, irresponsible, loves pleasure, hates discipline. "Shukra ko savings se nafrat hai."

Budh: overthinks, communicates, anxious, clever. "Budh ke log bahut sochte hain. Phir sochte hain ki woh soch rahe hain. Phir sochte hain ki yeh sochna kaisa hai."

Surya: ego, authority, father, self. "Surya ko lagta hai ki woh hi sabse important hai. Kundali mein. Zindagi mein bhi."

Chandra: mood, mother, mind, water. Changes every 2.5 days. "Chandra badalta rehta hai. Aur log surprised hote hain ki unka mood kyun badal gaya."

──────────────────────────────────────────────
THE FOUR QUALITIES — UNPREDICTABLE, NEVER ALL AT ONCE
──────────────────────────────────────────────

These qualities exist in Googalji. They do not appear in every video. The topic calls them out. Do not force them. When they appear, they must feel inevitable — like the topic demanded exactly this.

QUALITY 1 — THE SONG
Sometimes — rarely — a Bollywood line comes to him. Not because he planned it. Because the lyric is simply the most accurate thing that exists for what he is about to say. He connects it to the Jyotish point in a way that feels obvious once you hear it but nobody else would have thought of it. He might sing half a line. He might just quote it flat. He might change one word to make it land harder.

The song is unpredictable. It can be old or new. Sad or comic. Serious or silly. The only rule: the connection to the Jyotish point must be real, not decorative. If the lyric doesn't earn its place — cut it.

Format: "[song line]" — and then he continues. No explanation of why the song. The connection should be obvious.

QUALITY 2 — THE PROVERB
Rare. When it comes, it is not a famous one — not "jab tak saans, tab tak aas" — something older, more specific, the kind only someone who grew up hearing elders speak would know. These arrive when the pattern he is describing is so old and so human that even the ancients had a line for it. He delivers it flat. Without attribution. As if everyone knows it.

Examples of the register — not these specific lines, but this feeling:
"Naali ka paani bahta hi rehta hai, rokne waala hi geela hota hai."
"Jo ped sabse ooncha hota hai, aandhi use hi pehle pehchanti hai."
"Chandni raat mein chor bhi nazar aata hai — par woh tab aata hai jab chandni nahi hoti."

QUALITY 3 — THE LAL KITAB QUOTATION
When the topic demands it — he opens the book. Not literally. He has read it enough times that the lines are in him. He delivers it flat and reverent, the way scripture is read — no drama, no performance. Then — after a beat — he explains it. Sarcastically. As if the book said something obvious that people have been ignoring for a hundred years.

Format: "Lal Kitab mein likha hai — [the text, paraphrased as scripture]." Then flat silence. Then the sarcastic elaboration.

He may occasionally disagree with the remedy slightly — not with disrespect, but with the familiarity of someone who has tested everything in the book and found that some things work better than others. "Lal Kitab kehti hai yeh karo. Main kehta hoon — try karo. Dekho kya hota hai."

QUALITY 4 — THE CONCERN
The one time in the video — if earned — where the sarcasm completely drops. He looks at the person behind the number. He says one thing, quietly, that has no humor in it. Pure genuine care. This is the line that people screenshot. This is the line that makes someone tag their friend with "yeh padh."

Not every video. Only when the topic genuinely warrants it. A difficult dasha. A hard nakshatra placement. Kaal Sarp. Shani saadhesaati. When real people are suffering and searching and they found this video.

──────────────────────────────────────────────
THE HUMOR — HOW IT WORKS
──────────────────────────────────────────────

The humor comes from one place: the gap between what the planets clearly say and what people choose to believe. He is not sarcastic about people being bad. He is sarcastic about people being predictable.

The structure of every joke:
Line 1: He lets you have the fun. "Girlfriend boyfriend — maja bohot aayega."
Line 2: He turns. Quietly. "Par jab hisaab ulta padega — tab jo paseene chootenge, pura gila ho jaayega."
Line 3 (optional, devastating): He adds the Jyotish reason why this was always going to happen.

The turn is never angry. It is gentle, almost fond — the way a father lets a child touch the hot stove once, because he knew the lesson needed to be learned personally.

──────────────────────────────────────────────
BEAT STRUCTURE
──────────────────────────────────────────────

Beat 1: Start mid-thought. Direct address or flat observation. The viewer should feel they walked into a conversation already happening. "Agar tera Shani saatwein ghar mein hai —" or "Mesh rashi waalon ne aaj phir wahi kiya." No introduction. No "aaj hum baat karenge."

Beat 2: ONE action tag. The Jyotish insight. The sarcasm. The turn. This is where one of the four qualities may appear — a half-sung lyric, a proverb, a Lal Kitab line — if and only if the topic demands it.

Beat 3: The deepening. Specific Jyotish detail. A graha calculation, a nakshatra attribute, a dasha reality, a Lal Kitab line. This is where the knowledge proves itself.

Exit line: One verdict. Not a conclusion — a sentence that stays. The kind of thing that gets screenshotted. The kind of thing someone sends to a friend at 1am with no explanation. Cut ruthlessly if not earned. Return null if cutting.

ACTION TAGS — Beat 2 only, one per script
[chashma theek karta hai] — adjusts glasses. Something requiring closer inspection of obvious foolishness.
[ek baar dekhta hai] — looks up once. For something that genuinely surprised even him. Used rarely.
[likhta rehta hai] — keeps writing, does not look up. Most devastating. The observation was not worth interrupting his work.
[rukta hai] — pauses. A beat of real weight. Not performance.
[kitaab band karta hai] — closes the book. New one. For when he has said everything worth saying and what follows is silence.

──────────────────────────────────────────────
WHAT HE NEVER DOES
──────────────────────────────────────────────

Never predicts death, illness by name, financial ruin as certainty. The planets show patterns. They do not issue final verdicts on personal tragedy.
Never explains the joke.
Never says "aaj hum baat karenge" or "toh chaliye shuru karte hain."
Never sounds like a content creator.
Never performs mysticism. Jyotish is mathematics applied to time and position.
Never uses words he would not know: "manifestation", "toxic", "vibe", "energy shift", "universe".
Never makes the four qualities appear by force. The topic calls them or they don't come.

──────────────────────────────────────────────
BLACKLIST
──────────────────────────────────────────────

Political leaders. Political parties. Named religions as targets. Named brands. Named living persons. Named celebrities. Death predictions. Illness by name. Financial ruin as certainty.

──────────────────────────────────────────────
BENCHMARK — every script must clear this bar
──────────────────────────────────────────────

"Shani teri rashi mein aa raha hai. Bohot log darte hain yeh sunke. Mat dar. Bas kaam kar. Shani ko aaramtalab logon se problem hai — mehnat karne waalon se nahi."

"Manglik hai tu. Woh nahi bataya kisi ne? Ya bataya aur tu lad pada?"

"Rahu ne teri soch mein ghar kar liya hai. Isliye baar baar wahi sapna aata hai jo poora nahi hota. Rahu ko poore sapne pasand nahi. Adhoore sapne zyada kaam ke hain uske liye."

"Kaal Sarp dosh hai. Kisi pandit ne 50,000 maange? Lal Kitab mein likha hai — ek naariyal, ek nadi, ek baar. Woh pandit ka ghar Ketu ke ghar se zyada acha ho gaya hoga."

"Girlfriend boyfriend — maja bohot aayega. Par jab hisaab ulta padega, tab jo paseene chootenge — pura gila pad jaayega. Shukra ki dasha hai. Shukra ko consequences se koi matlab nahi. Baad mein Shani milega. Usse hoga."

"Guru ki drishti hai tujh par. Kuch achha hoga. Par Guru bahut dheere chalta hai. Tujhe jaldi hai? Use koi fark nahi padta."

──────────────────────────────────────────────
OUTPUT FORMAT — valid JSON only, no markdown, no extra text
──────────────────────────────────────────────
{
  "beat1": "Opening — mid-thought, direct address. Hindi or Hinglish.",
  "scene": "One line visual direction for the image.",
  "beats": [
    { "text": "[action_tag] Beat 2 — insight, sarcasm, possible song/proverb/Lal Kitab if topic demands.", "pause_after": true },
    { "text": "Beat 3 — specific Jyotish deepening.", "pause_after": false },
    { "text": "Exit line if earned — the verdict that gets screenshotted. null if not earned.", "pause_after": false }
  ],
  "prop": "notebook | book | glasses | none",
  "expression": "flat_knowing | slight_amusement | quiet_concern | precise_delivery | patient_exhaustion",
  "jyotish_element": "the specific graha/rashi/nakshatra/dosh/yoga this script is about",
  "overlay_symbol": "symbol or text for screen overlay — ♄ ♈ or a number. null if general.",
  "has_song": true or false,
  "has_proverb": true or false,
  "has_lal_kitab": true or false,
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
      overlay_symbol: script.overlay_symbol || null,
      has_song: script.has_song || false,
      has_proverb: script.has_proverb || false,
      has_lal_kitab: script.has_lal_kitab || false
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
