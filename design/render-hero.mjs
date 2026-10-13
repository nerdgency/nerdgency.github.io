// Renders design/formidable-1-0-hero.html twice: the hero banner at 2x
// (static/img/blog/formidable-1-0-hero.png, 3200x1280) and the social card
// (static/img/blog/formidable-1-0-social.png, 1200x630, for og:image).
// Run from the repo root: node design/render-hero.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const page = pathToFileURL(resolve(here, 'formidable-1-0-hero.html')).href;
const outputs = [
	{ file: 'formidable-1-0-hero.png', hash: '', viewport: { width: 1600, height: 640 }, scale: 2 },
	{ file: 'formidable-1-0-social.png', hash: '#social', viewport: { width: 1600, height: 840 }, scale: 0.75 },
];

const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());

for (const { file, hash, viewport, scale } of outputs) {
	const out = resolve(here, '../static/img/blog', file);
	mkdirSync(dirname(out), { recursive: true });
	const tab = await browser.newPage({ viewport, deviceScaleFactor: scale });
	await tab.goto(page + hash);
	await tab.waitForLoadState('networkidle');
	await tab.screenshot({ path: out });
	await tab.close();
	console.log('Wrote', out);
}

await browser.close();
