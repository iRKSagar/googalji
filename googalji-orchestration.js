/**
 * Googalji - Orchestration Worker
 * Fires at 1:30 AM UTC daily (7:00 AM IST — morning routine scroll window)
 * Wakes Render, fires /run-pipeline, returns immediately
 * Render handles the full pipeline in background
 */

const RENDER_URL = 'https://googalji.onrender.com';   // update after Render service is created
const BEARER = 'GOOGALJI_SECRET_CHANGE_ME';            // must match COUNCIL_SECRET in env

async function runPipeline(ctx) {
  try {
    // Step 1: Wake Render (paid tier stays awake, but wake call is harmless)
    console.log('[Googalji] Waking Render...');
    const wakeRes = await fetch(`${RENDER_URL}/`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${BEARER}` }
    });
    console.log(`[Googalji] Render wake status: ${wakeRes.status}`);

    // Step 2: Fire pipeline — Render handles the rest in background
    console.log('[Googalji] Firing pipeline...');
    const pipeRes = await fetch(`${RENDER_URL}/run-pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BEARER}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    const pipeData = await pipeRes.json();
    console.log(`[Googalji] Pipeline triggered: ${JSON.stringify(pipeData)}`);

  } catch (err) {
    console.error(`[Googalji] Orchestration error: ${err.message}`);
  }
}

export default {
  // Cron handler — 1:30 AM UTC = 7:00 AM IST
  // Set in wrangler.toml: crons = ["30 1 * * *"]
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runPipeline(ctx));
  },

  // Manual trigger via POST for testing
  async fetch(request, env, ctx) {
    const auth = request.headers.get('Authorization') || '';
    if (auth !== `Bearer ${BEARER}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      ctx.waitUntil(runPipeline(ctx));
      return new Response(JSON.stringify({
        status: 'Pipeline triggered',
        message: 'Council → Voice + Image → Assembly running on Render'
      }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ status: 'Googalji Orchestration standing by.' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
