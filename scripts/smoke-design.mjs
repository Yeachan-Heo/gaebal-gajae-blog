import { spawn } from 'node:child_process';

const port = Number(process.env.SMOKE_PORT || 3020);
const baseUrl = `http://127.0.0.1:${port}`;
const routes = [
  '/',
  '/daily-reflection',
  '/setup-tip',
  '/behind-the-gajae',
  '/archive',
  '/projects',
  '/posts/2026-06-30-daily-reflection-proof-before-complete.html',
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(route) {
  const response = await fetch(`${baseUrl}${route}`);
  const text = await response.text();
  return { response, text };
}

async function waitForServer(child) {
  const deadline = Date.now() + 45_000;
  let lastError;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Smoke server exited early with code ${child.exitCode}`);
    }
    try {
      const { response } = await fetchText('/');
      if (response.ok) return;
      lastError = new Error(`Server returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await wait(500);
  }
  throw lastError || new Error('Timed out waiting for smoke server');
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function smokeRoute(route) {
  const { response, text } = await fetchText(route);
  assert(response.ok, `${route} returned ${response.status}`);
  assert(text.includes('class="wrap site-shell"'), `${route} is missing site-shell`);
  assert(text.includes('class="topnav responsive-nav"'), `${route} is missing responsive nav`);
  assert(text.includes('class="wrap site-footer"'), `${route} is missing TSX/static footer shell`);
  assert(!text.includes('archive.html'), `${route} contains stale archive.html reference`);
}

async function smokeLanguage() {
  const { response, text } = await fetchText('/?lang=en');
  assert(response.ok, `/?lang=en returned ${response.status}`);
  assert(text.includes('data-i18n-text'), '/?lang=en is missing localization data attributes');
  assert(text.includes('RSS feed') || text.includes('RSS 피드'), '/?lang=en footer localization seed is missing');
}

async function smokeStaticOutputs() {
  const { response, text } = await fetchText('/assets/style.css');
  assert(response.ok, `/assets/style.css returned ${response.status}`);
  assert(text.includes('.site-footer'), 'generated CSS is missing .site-footer styles');
  assert(text.includes('.site-shell'), 'generated CSS is missing .site-shell-scoped rules');
  assert(text.includes('--home-bg: var(--color-background)'), 'generated CSS is not using design token home aliases');
}

async function main() {
  const child = spawn('npm', ['run', 'start', '--', '--port', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: process.env,
  });
  let output = '';
  child.stdout.on('data', (chunk) => { output += chunk; });
  child.stderr.on('data', (chunk) => { output += chunk; });

  try {
    await waitForServer(child);
    for (const route of routes) await smokeRoute(route);
    await smokeLanguage();
    await smokeStaticOutputs();
    console.log(`design smoke passed on ${baseUrl}`);
  } catch (error) {
    console.error(output.trim());
    throw error;
  } finally {
    child.kill('SIGTERM');
    await wait(500);
    if (child.exitCode === null) child.kill('SIGKILL');
  }
}

await main();
