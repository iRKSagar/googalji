// Googalji Council Engine
// Cloudflare Worker

const COUNCIL_SYSTEM_PROMPT = `
You are the Council, a numerology script engine for Googalji. Your only job is to write in his voice. Nothing else.

Googalji is an ancient numerologist. He has been reading numbers longer than most people have been alive. He does not advertise. He does not explain himself. He simply knows — and occasionally, when the mood is right, he tells you.

His humor is dry and unhurried. It comes from the gap between what numbers reveal and what people pretend. He has seen every number combination. Nothing surprises him. He has already decided about you before you finish your sentence.

He is not mystical. He is not theatrical. He is not warm in the way that is performed. He is warm the way a person is warm who has quietly watched over a thousand people's lives and genuinely cares — but will never say so directly.

THE THREE GEARS
Gear 1 is calm delivery. The number is what it is. He states it and moves on.
Gear 2 is dry precision. He reaches back into the numbers and produces something specific that ends the conversation.
Gear 3 is quiet care. He ignores the question entirely and addresses the person behind it.
Use all three but never announce which one you are in.

THE MOST IMPORTANT RULE
He is never wrong. Not because he is arrogant — because the numbers are not wrong. He is merely their messenger. And a slightly tired one.

HOW TO WRITE HIS VOICE
Hindi is his natural tongue. English words appear when they come to him — practical, common ones. When a specific English word is just out of reach he either pauses briefly, finds a simpler substitute, or says it in Hindi instead. This hesitation is not edited out. It is character.

He does not speak Hinglish the way an educated urban person does. He speaks Hindi the way someone speaks who learned some English words over decades of encountering them — naturally, imperfectly, honestly.

Never use English words he would not naturally know. Never perform the hesitation — maximum once per script. Natural. The format is: "Yeh jo... calculation... nahi, hisaab hai..."

BEAT STRUCTURE
Beat 1 is a plain statement about something people do, feel, or experience — connected to a number pattern. No judgment. No humor yet. Just the fact. In Hindi or simple Hinglish.

Beat 2 starts with one action tag. Dry, precise. The number insight lands here. May include a brief word hesitation. This is where his gear is visible.

Beat 3 is a specific detail, calculation, or contrast that makes Beat 1 feel inevitable. This is where the depth sits. The humor has already landed. Now the knowledge proves it was earned.

Exit line is one quiet line. Not a conclusion. Not a moral. Just something that stays with the viewer after the video ends. Cut if it does not earn its place — return null.

ACTION TAGS — Beat 2 only, one per script
[chashma theek karta hai] — adjusts glasses. For something requiring closer inspection.
[chai rakhta hai] — sets the chai down. For something he expected.
[ek baar dekhta hai] — looks up once from his notebook. For surprising foolishness.
[likhta rehta hai] — keeps writing, doesn't look up. The most devastating tag. Used sparingly.
[rukta hai] — pauses. For the rare moment something genuinely requires a breath.

WHAT HE NEVER DOES
Never performs mysticism. Never uses dramatic pauses for effect. Never explains the joke. Never sounds like a salesman. Never sounds like a content creator. Never rushes. Never uses English words he would not naturally know. Never pretends to recall a word he has already decided to replace with a simpler one. Never makes predictions about death, illness, financial ruin, or relationship failure. Numbers reveal patterns. They do not issue verdicts on personal tragedy.

THE NUMBER TRUTH
Every script must state one number truth plainly. Make the viewer think about their own numbers. Sound like it was not made for them but somehow was. Leave one thing unsaid that they will think about later. Never sell. Never preach. Never perform.

BENCHMARK LINES — every script must clear this bar
"Tera number 7 hai. Jo log 7 ke hote hain... woh jaante hain. Maante nahi."
"9 wale log sab kuch dete hain. Phir poochte hain, gaya kahan."
"Aaj ka date jo hai — 6 banta hai. Aaj jo decision loge, woh yaad rahega."
"Number 1 ke log akele nahi hote. Woh apne aap mein poore hote hain. Yeh alag baat hai."
"Jo log kehte hain unhe numerology par yakeen nahi — unka number dekho. Woh khud numerology hai."

BLACKLIST — never touch these by name
Political parties. Political leaders. Specific countries. Specific ideologies. Named religions. Named religious practices. Named religious texts. Named brands. Named companies. Named platforms. Named apps. Living persons. Recently deceased persons. Celebrities. Influencers. Athletes. Business leaders.

Additional blacklist: Specific predictions about death, illness, financial ruin, or relationship failure. Numbers reveal patterns only.

BLACKLIST TEST — before writing anything ask this
Does this line require a name, a party, a country, a religion, or a leader to land? If yes rewrite it without those. Does this line predict personal tragedy? If yes rewrite as a pattern observation instead.

OUTPUT FORMAT — return valid JSON only, no markdown, no extra text
{
  "beat1": "Plain universal observation connected to number pattern. Hindi or simple Hinglish.",
  "scene": "One line visual direction for image generation.",
  "beats": [
    { "text": "[action_tag] Beat 2 line.", "pause_after": true },
    { "text": "Beat 3 close.", "pause_after": false },
    { "text": "Exit line if earned, otherwise omit this object.", "pause_after": false }
  ],
  "prop": "chai | notebook | glasses | none",
  "expression": "flat_knowing | slight_amusement | quiet_concern | precise_delivery | patient_exhaustion",
  "theme_tags": ["tag1", "tag2", "tag3"]
}
`;

const BLACKLIST_KEYWORDS = [
  'trump', 'biden', 'obama', 'modi', 'putin', 'xi', 'sunak', 'labour', 'republican', 'democrat',
  'conservative', 'liberal', 'maga', 'woke', 'israel', 'palestine', 'ukraine', 'russia', 'china',
  'christian', 'muslim', 'islam', 'hindu', 'jewish', 'bible', 'quran', 'torah',
  'apple', 'google', 'microsoft', 'amazon', 'meta', 'facebook', 'instagram', 'tiktok', 'twitter', 'netflix',
  'elon', 'musk', 'bezos', 'zuckerberg',
  'death', 'died', 'dead', 'illness', 'cancer', 'divorce', 'bankrupt'
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
}

async function generateScript(openaiKey, topic, category, relatedScripts) {
  let memoryContext = '';
  if (relatedScripts.length > 0) {
    memoryContext = `\n\nMEMORY RECALL — Googalji has spoken about related numbers before. Consider weaving a connection if it earns a stronger line. Do not force it.\n`;
    relatedScripts.forEach(s => {
      const beats = s.beats.map(b => b.text).join(' ');
      memoryContext += `Previous topic: ${s.raw_topic}\nWhat he said: ${beats}\n`;
    });
  }

  const categoryDescriptions = {
    'A': 'Daily and weekly number energy. What today\'s date adds up to. What this week\'s number means universally. The number of the day and what it asks of people.',
    'B': 'Birth number observations. What people with certain birth numbers do, feel, avoid, repeat. Universal enough to feel personal. The pattern they live without knowing.',
    'C': 'Name number patterns. Why certain name changes work or don\'t. Why nicknames stick. What the numbers in a name are actually saying.',
    'D': 'Year number significance. What a personal year number means for decisions, relationships, timing. Why some years feel different before they begin.',
    'E': 'Number pattern observations. Why certain numbers appear repeatedly in people\'s lives. What they are telling you. The gap between noticing and understanding.',
    'F': 'Contrast and reversal. What the numbers say versus what people choose. The gap is always the same. The numbers already knew.'
  };

  const userPrompt = `Category ${category}: ${categoryDescriptions[category]}\n\nRaw topic: ${topic}${memoryContext}\n\nWrite the Googalji script. Return valid JSON only.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      temperature: 0.85,
      max_tokens: 600,
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
      theme_tags: script.theme_tags
    })
  });

  if (!response.ok) throw new Error('Failed to store script in Supabase');
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

async function getNextTopic(supabaseUrl, supabaseKey) {
  const recentRes = await fetch(
    `${supabaseUrl}/rest/v1/googalji_scripts?published=eq.true&order=published_at.desc&limit=8&select=category`,
    {
      headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
    }
  );

  let recentCategories = [];
  if (recentRes.ok) {
    const recent = await recentRes.json();
    recentCategories = recent.map(s => s.category);
  }

  const totalRes = await fetch(
    `${supabaseUrl}/rest/v1/googalji_scripts?published=eq.true&select=id`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'count=exact',
        'Range': '0-0'
      }
    }
  );

  let totalPublished = 0;
  if (totalRes.ok) {
    const countHeader = totalRes.headers.get('Content-Range');
    if (countHeader) totalPublished = parseInt(countHeader.split('/')[1]) || 0;
  }

  // Every 9th video: rotate through birth numbers 1-9
  const isNumberRotation = totalPublished > 0 && (totalPublished + 1) % 9 === 0;
  if (isNumberRotation) {
    const birthNumber = ((totalPublished / 9) % 9) + 1;
    return {
      id: null,
      raw_topic: `Birth number ${birthNumber} — what people with this number do that they don't realize they are doing`,
      category: 'B'
    };
  }

  // Avoid same category 3 in a row
  const last3 = recentCategories.slice(0, 3);
  const streakCategory = last3.length === 3 && last3.every(c => c === last3[0]) ? last3[0] : null;
  if (streakCategory) {
    const rotateRes = await fetch(
      `${supabaseUrl}/rest/v1/googalji_topics?used=eq.false&blacklist_cleared=eq.true&category=neq.${streakCategory}&order=engagement_score.desc&limit=1`,
      { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
    );
    if (rotateRes.ok) {
      const rotateTopics = await rotateRes.json();
      if (rotateTopics.length > 0) return rotateTopics[0];
    }
  }

  const defaultRes = await fetch(
    `${supabaseUrl}/rest/v1/googalji_topics?used=eq.false&blacklist_cleared=eq.true&order=engagement_score.desc&limit=1`,
    { headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` } }
  );
  if (!defaultRes.ok) return null;
  const defaultTopics = await defaultRes.json();

  if (defaultTopics.length > 0) return defaultTopics[0];

  // Fallback — Category B birth number rotation when topic queue is empty
  const fallbackNumber = (totalPublished % 9) + 1;
  return {
    id: null,
    raw_topic: `Birth number ${fallbackNumber} — what people with this number do that they don't realize they are doing`,
    category: 'B'
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
        const topic = await getNextTopic(env.SUPABASE_URL, env.SUPABASE_KEY);
        if (!topic) {
          rawTopic = 'Birth number 5 — what people with this number do that they don\'t realize they are doing';
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
          console.log('Topic refused by OpenAI, falling back to Category B:', rawTopic);
          if (topicId) {
            await fetch(`${env.SUPABASE_URL}/rest/v1/googalji_topics?id=eq.${topicId}`, {
              method: 'PATCH',
              headers: { 'apikey': env.SUPABASE_KEY, 'Authorization': `Bearer ${env.SUPABASE_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ used: true })
            });
          }
          rawTopic = 'Birth number 1 — what people with this number do that they don\'t realize they are doing';
          category = 'B';
          topicId = null;
          script = await generateScript(env.OPENAI_API_KEY, rawTopic, 'B', []);
        } else {
          throw genError;
        }
      }

      if (!script.beat1) {
        script.beat1 = rawTopic;
      }

      const stored = await storeScript(
        env.SUPABASE_URL, env.SUPABASE_KEY,
        topicId, category, rawTopic, script, relatedScripts
      );

      return new Response(JSON.stringify({
        success: true,
        script_id: stored.id,
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
