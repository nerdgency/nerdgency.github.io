#!/usr/bin/env node
/**
 * Captures the control panel screenshots used in the Formidable docs.
 *
 *   npm run capture:screens                 every screen in SCREENS
 *   npm run capture:screens -- dashboard    just the ones named
 *
 * Signs in to the local ExpressionEngine site as a dedicated test Super
 * Admin (credentials in the gitignored .env: EE_URL, EE_CP_PATH,
 * EE_CAPTURE_USERNAME, EE_CAPTURE_PASSWORD) and saves 2x PNGs to
 * static/img/screenshots/formidable/. The site should hold the demo
 * content the docs describe (see DOCS-NOTES.md, "Screenshots").
 *
 * Each screen is a CP path, optionally a selector to wait for, optionally
 * a setup step (open a tab, a menu), and optionally an element to crop
 * to. src/data/screenshots.json records when each was taken and from
 * which versions, which <Screenshot captured=…> reads.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'static/img/screenshots/formidable');
const manifestPath = path.join(root, 'src/data/screenshots.json');

// .env, without a dependency for it.
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, '.env'), 'utf8')
    .split('\n')
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]),
);

const cp = (route) => `${env.EE_URL}${env.EE_CP_PATH}?/cp/${route}`;
const formidable = (route = '') => cp(`addons/settings/formidable${route ? '/' + route : ''}`);

const site = (route) => `${env.EE_URL}/${route}`;
const tab = (name) => async (page) => page.locator('.tab-bar__tab', {hasText: name}).first().click();
const segment = (name) => async (page) => page.locator('.formidable-segmented__option', {hasText: name}).first().click();

/**
 * Signs the first signature pad with a looping, cursive-looking stroke: a
 * prolate trochoid (each loop a little smaller), then an underline.
 */
async function sign(page) {
  const box = await page.locator('canvas').first().boundingBox();
  const x0 = box.x + 50;
  const y0 = box.y + box.height * 0.55;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let i = 0; i <= 160; i++) {
    const t = (i / 160) * Math.PI * 9;
    const fade = 1 - i / 260;
    await page.mouse.move(x0 + 14 * t - 22 * Math.sin(t) * fade, y0 - 30 * Math.cos(t) * fade + 6 * Math.sin(t / 3));
  }
  await page.mouse.up();
  await page.mouse.move(x0 + 10, y0 + 46);
  await page.mouse.down();
  await page.mouse.move(x0 + 180, y0 + 40, {steps: 12});
  await page.mouse.move(x0 + 360, y0 + 44, {steps: 12});
  await page.mouse.up();
}

/**
 * The screens, in the order the docs meet them. `url` may be a function
 * (it can read ids looked up after signing in); `guest` captures a public
 * page signed out; `crop` captures one element, however tall.
 */
const SCREENS = [
  {name: 'dashboard', url: formidable(), wait: '.formidable-dashboard', crop: '.secondary-sidebar-container', maxHeight: 1150},
  {name: 'forms-listing', url: formidable('forms'), wait: 'table', crop: '.ee-main__content .container', maxHeight: 1150},
  // The builder remembers Builder | Overview per browser, so each says which.
  {name: 'builder', url: () => formidable(`forms/update/${ids.application}`), wait: '.formidable-builder-workspace', setup: segment('Builder'), crop: '.formidable-builder-workspace', maxHeight: 1250},
  {name: 'builder-overview', url: () => formidable(`forms/update/${ids.application}`), wait: '.formidable-builder-workspace', setup: segment('Overview'), crop: '.formidable-builder-workspace'},
  {
    name: 'field-editor',
    url: () => formidable(`forms/update/${ids.contact}`),
    wait: '.formidable-builder-workspace',
    setup: async (page) => {
      await segment('Builder')(page);
      await page.locator('.formidable-field', {hasText: 'Email Address'}).first().click();
      await page.waitForSelector('.app-modal__content form', {timeout: 15000});
      await page.waitForTimeout(800);
    },
    crop: '.app-modal__content',
  },
  {name: 'submissions-listing', url: () => formidable(`submissions&form_id=${ids.contact}`), wait: 'table', crop: '.ee-main__content .container', maxHeight: 1150},
  {name: 'submission', url: () => formidable(`submissions/update/${ids.applicationSubmission}`), wait: 'form', crop: '.ee-main__content .container', maxHeight: 1150},
  {name: 'submission-rows', url: () => formidable(`submissions/update/${ids.applicationSubmission}`), wait: '.formidable-rows-editor', crop: '.formidable-rows-editor'},
  {name: 'workflows', url: () => formidable(`forms/update/${ids.contact}`), wait: '.tab-bar', setup: tab('Workflows'), crop: '.formidable-workflows'},
  {name: 'workflows-runs', url: () => formidable(`forms/update/${ids.contact}`), wait: '.tab-bar', setup: async (page) => { await tab('Workflows')(page); await segment('Recent runs')(page); }, crop: '.formidable-workflows', maxHeight: 1150},
  {name: 'workflow-log', url: formidable('workflow-runs'), wait: 'table', crop: '.ee-main__content .container', maxHeight: 1150},
  {name: 'workflow-run', url: () => ids.failedRun, wait: 'form, .box, main', crop: '.ee-main__content .container', maxHeight: 1150},
  {name: 'themes', url: formidable('themes'), wait: '.formidable-registry', crop: '.ee-main__content .container', maxHeight: 1150},
  {name: 'registry', url: formidable('registry'), wait: '.formidable-registry', crop: '.ee-main__content .container', maxHeight: 1150},
  {
    name: 'utilities',
    url: formidable('utilities'),
    wait: '.formidable-utilities',
    setup: async (page) => {
      await page.locator('#command-list-forms button[type=submit]').click();
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, 0));
    },
    crop: '.ee-main__content .container',
    maxHeight: 1150,
  },
  {name: 'permissions', url: formidable('permissions'), wait: 'form', crop: '.secondary-sidebar-container', maxHeight: 1150},

  // The visitor's side, signed out.
  {name: 'front-contact', guest: true, url: site('formidable_demo/contact'), wait: 'form', crop: 'main'},
  {
    name: 'front-repeating',
    guest: true,
    url: site('formidable_demo/apply'),
    wait: 'form',
    crop: 'main',
    maxHeight: 1250,
    setup: async (page) => {
      await page.fill('[name=first_name]', 'Amara');
      await page.fill('[name=last_name]', 'Diallo');
      await page.fill('[name=email]', 'amara.diallo@example.com');
      await page.check('[name=worked_before][value=yes]');
      await page.locator('[data-formidable-page-next]:visible').first().click();
      await page.fill('[name="employer[0]"]', 'Northwind Studio');
      await page.fill('[name="role[0]"]', 'Senior designer');
      await page.fill('[name="years[0]"]', '4');
      await page.locator('[data-formidable-repeat-add]:visible').first().click();
      await page.fill('[name="employer[1]"]', 'Blue Harbour Media');
      await page.fill('[name="role[1]"]', 'Designer');
      await page.fill('[name="years[1]"]', '3');
      await page.check('[name="skills[]"][value="design"]');
      await page.check('[name="skills[]"][value="ee"]');
    },
  },
  {
    name: 'front-signature',
    guest: true,
    url: site('formidable_demo/waiver'),
    wait: 'canvas',
    crop: 'main',
    setup: async (page) => {
      await page.fill('[name=full_name]', 'Jordan Ellis');
      await page.fill('[name=email]', 'jordan.ellis@example.com');
      await page.check('[name=agree]');
      await sign(page);
    },
  },
];

/** Ids of the demo content, looked up once signed in. */
const ids = {};

async function lookUpIds(page) {
  // The forms listing has a row per form, with its handle and an edit link.
  await page.goto(formidable('forms'));
  const rows = await page.$$eval('tr', (trs) =>
    trs.map((tr) => ({text: tr.textContent, id: (tr.querySelector('a[href*="forms/update/"]')?.href.match(/forms\/update\/(\d+)/) || [])[1]})),
  );
  const find = (handle) => rows.find((r) => r.id && r.text.includes(handle))?.id;
  ids.contact = find('contact_us');
  ids.application = find('job_application');
  ids.waiver = find('event_waiver');

  await page.goto(formidable('workflow-runs'));
  ids.failedRun = await page
    .$$eval('tr', (trs) => trs.filter((tr) => /failed/i.test(tr.textContent)).map((tr) => tr.querySelector('a[href*="workflow-runs/view/"]')?.href).filter(Boolean)[0])
    .catch(() => undefined);

  if (ids.application) {
    await page.goto(formidable(`submissions&form_id=${ids.application}`));
    ids.applicationSubmission = await page
      // The oldest (last listed): the demo application with two rows.
      .$$eval('a[href*="submissions/update/"]', (as) => (as.at(-1)?.href.match(/submissions\/update\/(\d+)/) || [])[1])
      .catch(() => undefined);
  }
}

async function signIn(page) {
  await page.goto(cp('login'));
  await page.fill('input[name="username"]', env.EE_CAPTURE_USERNAME);
  await page.fill('input[name="password"]', env.EE_CAPTURE_PASSWORD);
  await Promise.all([page.waitForLoadState('networkidle'), page.click('input[type="submit"], button[type="submit"]')]);
  if (page.url().includes('/login')) throw new Error('Sign-in failed: check EE_CAPTURE_USERNAME and EE_CAPTURE_PASSWORD in .env.');
}

const only = process.argv.slice(2);
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: {width: 1440, height: 900},
  deviceScaleFactor: 2,
  colorScheme: 'light',
  ignoreHTTPSErrors: true, // a local .test site's certificate
});
const page = await context.newPage();
const guest = await browser.newContext({viewport: {width: 1440, height: 900}, deviceScaleFactor: 2, colorScheme: 'light', ignoreHTTPSErrors: true});

await signIn(page);
await lookUpIds(page);

fs.mkdirSync(outDir, {recursive: true});
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
const eeVersion = await page.evaluate(() => (document.querySelector('.ee-sidebar__version, .app-about__version')?.textContent || '').trim());

for (const screen of SCREENS) {
  if (only.length && !only.includes(screen.name)) continue;
  const url = typeof screen.url === 'function' ? screen.url() : screen.url;
  if (!url || url.includes('undefined')) {
    console.warn(`skip ${screen.name}: its demo content was not found`);
    continue;
  }

  try {
  const shot = screen.guest ? await guest.newPage() : await context.newPage();
  await shot.goto(url, {waitUntil: 'networkidle'});
  if (screen.wait) await shot.waitForSelector(screen.wait, {timeout: 15000}).catch(() => {});
  if (screen.setup) await screen.setup(shot);
  await shot.mouse.move(1, 1); // no hover states in the picture
  await shot.waitForTimeout(700); // let transitions settle

  const file = path.join(outDir, `${screen.name}.png`);
  const target = screen.crop ? shot.locator(screen.crop).first() : null;
  if (target && (await target.count())) {
    // One element; `maxHeight` stops a long page becoming a tall strip.
    await shot.evaluate(() => window.scrollTo(0, 0));
    const box = await target.boundingBox();
    const height = screen.maxHeight ? Math.min(box.height, screen.maxHeight) : box.height;
    await shot.screenshot({path: file, fullPage: true, clip: {x: box.x, y: box.y, width: box.width, height}});
  } else await shot.screenshot({path: file});
  await shot.close();
  manifest[screen.name] = {
    capturedAt: new Date().toISOString().slice(0, 10),
    expressionEngine: eeVersion || null,
  };
  console.log(`saved ${path.relative(root, file)}`);
  } catch (error) {
    console.warn(`FAILED ${screen.name}: ${error.message.split('\n')[0]}`);
    continue;
  }

}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
await browser.close();
