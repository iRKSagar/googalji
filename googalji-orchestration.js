/**
 * Googalji — Orchestration Worker
 * Fires daily at 1:30 AM UTC (7:00 AM IST)
 * Generates 7 videos in sequence:
 *   - H1, H2, H3, H4 — daily horoscope (all 12 signs, 3 per video)
 *   - N/L/W/P/B/R × 3 — rotating content (2-day full cycle)
 * One cron slot. Render handles each video in sequence.
 */

const RENDER_URL = 'https://googalji.onrender.com';
const BEARER = 'GOOGALJI_SECRET_CHANGE_ME';   // must match COUNCIL_SECRET in env

const DAILY_HOROSCOPE = ['H1', 'H2', 'H3', 'H4'];
const ROTATING_POOL   = ['N', 'L', 'W', 'P', 'B', 'R'];

async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function wakeRender() {
  console.log('[Googalji] Waking Render...');
  for (let i = 0; i < 8; i++) {
    try {
      const r = await fetch(`${RENDER_URL}/`, {
        method: 'GET',
        signal: AbortSignal.timeout(12000)
      });
      if (r.ok) { console.log('[Googalji] Render awake ✓'); return; }
    } catch(e) {}
    console.log(`[Googalji] Render not ready, attempt ${i+2}...`);
    await sleep(8000);
  }
  throw new Error('Render did not wake after 64s');
}

async function runOneVideo(category, env) {
  console.log(`[Googalji] Starting video — category ${category}`);
  const r = await fetch(`${RENDER_URL}/run-pipeline`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BEARER}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ category })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Pipeline HTTP ${r.status}: ${t.slice(0, 120)}`);
  }
  const d = await r.json();
  console.log(`[Googalji] Video ${category} triggered: ${d.script_id || 'ok'}`);

  const sid = d.script_id;
  if (!sid) return;

  for (let i = 0; i < 30; i++) {
    await sleep(12000);
    try {
      const sr = await fetch(`${RENDER_URL}/video-status?script_id=${sid}`, {
        headers: { 'Authorization': `Bearer ${BEARER}` }
      });
      if (sr.ok) {
        const sd = await sr.json();
        if (sd.ready) {
          console.log(`[Googalji] Video ${category} assembled ✓`);
          return;
        }
      }
    } catch(e) {}
    if (i % 5 === 0) console.log(`[Googalji] Still assembling ${category}... (${(i+1)*12}s)`);
  }
  console.log(`[Googalji] ${category} timed out — moving to next`);
}

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
    }
  } catch(e) { console.log('rotating index error', e.message); }

  return [
    ROTATING_POOL[idx % ROTATING_POOL.length],
    ROTATING_POOL[(idx + 1) % ROTATING_POOL.length],
    ROTATING_POOL[(idx + 2) % ROTATING_POOL.length]
  ];
}

async function runDailyPipeline(env) {
  try {
    await wakeRender();
    await sleep(3000);

    const rotating = await getRotatingCategories(env.SUPABASE_URL, env.SUPABASE_KEY);
    const queue = [...DAILY_HOROSCOPE, ...rotating];
    console.log(`[Googalji] Daily queue: ${queue.join(', ')}`);

    for (const category of queue) {
      try {
        await runOneVideo(category, env);
        await sleep(5000);
      } catch(e) {
        console.error(`[Googalji] Video ${category} failed: ${e.message} — continuing`);
        await sleep(5000);
      }
    }

    console.log('[Googalji] Daily pipeline complete — 7 videos done ✓');
  } catch(err) {
    console.error(`[Googalji] Orchestration error: ${err.message}`);
  }
}

export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDailyPipeline(env));
  },

  async fetch(request, env, ctx) {
    const auth = request.headers.get('Authorization') || '';
    if (auth !== `Bearer ${BEARER}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      ctx.waitUntil(runDailyPipeline(env));
      return new Response(JSON.stringify({
        status: 'Daily pipeline triggered',
        queue: [...DAILY_HOROSCOPE, '+ 3 rotating'],
        videos: 7
      }), {
        status: 202, headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ status: 'Googalji Orchestration standing by.' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
