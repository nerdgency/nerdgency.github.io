import {chromium} from 'playwright';
import {env} from './lib.mjs';
const b = await chromium.launch();
const pause = (ms) => new Promise(r => setTimeout(r, ms));
async function page() { const c = await b.newContext({ignoreHTTPSErrors:true, viewport:{width:1280,height:900}}); return c.newPage(); }
const url = (t) => `${env.EE_URL}/formidable_demo/${t}`;
async function submitClick(p) { await Promise.all([p.waitForLoadState('networkidle'), p.locator('form button[type=submit]:visible').last().click()]); }

const contacts = [
  ['Maya', 'Chen', 'maya.chen@example.com', 'support', 'Our booking form stopped sending confirmations after the update. Could someone take a look?'],
  ['Daniel', 'Okafor', 'daniel@example.com', 'sales', 'We run twelve sites on ExpressionEngine and would like to talk about an agency licence.'],
  ['Priya', 'Natarajan', 'priya.n@example.com', 'billing', 'Can you resend last month’s invoice to our accounts address?'],
  ['Tom', 'Fischer', 'tom.fischer@example.com', 'support', 'Is there a way to show a different thank-you message for each department?'],
];
for (const [f, l, e, d, m] of contacts) {
  const p = await page(); await p.goto(url('contact'), {waitUntil:'networkidle'});
  await p.fill('[name=first_name]', f); await p.fill('[name=last_name]', l); await p.fill('[name=email]', e);
  await p.selectOption('[name=department]', d); await p.fill('[name=message]', m);
  await submitClick(p); console.log('contact', f, p.url()); await p.context().close(); await pause(13000);
}

async function apply(person, jobs, save = false) {
  const p = await page(); await p.goto(url('apply'), {waitUntil:'networkidle'});
  await p.fill('[name=first_name]', person[0]); await p.fill('[name=last_name]', person[1]); await p.fill('[name=email]', person[2]); await p.fill('[name=phone]', person[3]);
  if (save) { await Promise.all([p.waitForLoadState('networkidle'), p.locator('button:visible', {hasText: /save/i}).first().click()]); console.log('draft', person[0], p.url()); await p.context().close(); return; }
  await p.check('[name=worked_before][value=yes]');
  await p.locator('[data-formidable-page-next]:visible').first().click(); await pause(400);
  for (let i = 0; i < jobs.length; i++) {
    if (i > 0) { await p.locator('[data-formidable-repeat-add]:visible').first().click(); await pause(300); }
    await p.fill(`[name="employer[${i}]"]`, jobs[i][0]); await p.fill(`[name="role[${i}]"]`, jobs[i][1]); await p.fill(`[name="years[${i}]"]`, jobs[i][2]);
  }
  for (const s of person[4]) await p.check(`[name="skills[]"][value="${s}"]`);
  await p.locator('[data-formidable-page-next]:visible').first().click(); await pause(400);
  await p.setInputFiles('[name=resume]', new URL('./resume.pdf', import.meta.url).pathname);
  await p.fill('[name=start_date]', '2026-11-16');
  await submitClick(p); console.log('apply', person[0], p.url()); await p.context().close();
}
await apply(['Amara', 'Diallo', 'amara.diallo@example.com', '555-0142', ['design', 'ee', 'javascript']], [['Northwind Studio', 'Senior designer', '4'], ['Blue Harbour Media', 'Designer', '3']]);
await pause(13000);
await apply(['Lucas', 'Moreau', 'lucas.moreau@example.com', '555-0188', ['php', 'ee']], [['Fernwood Digital', 'Developer', '5']]);
await pause(13000);
await apply(['Hana', 'Suzuki', 'hana@example.com', '555-0107', []], [], true);
await pause(13000);

for (const [name, email] of [['Jordan Ellis', 'jordan.ellis@example.com'], ['Sofia Rossi', 'sofia.rossi@example.com']]) {
  const p = await page(); await p.goto(url('waiver'), {waitUntil:'networkidle'});
  await p.fill('[name=full_name]', name); await p.fill('[name=email]', email); await p.check('[name=agree]');
  const c = await p.locator('canvas').first().boundingBox();
  await p.mouse.move(c.x + 40, c.y + c.height * 0.65); await p.mouse.down();
  for (let i = 0; i <= 40; i++) { const t = i / 40; await p.mouse.move(c.x + 40 + t * Math.min(320, c.width - 80), c.y + c.height * (0.55 + 0.18 * Math.sin(t * 9))); }
  await p.mouse.up();
  await submitClick(p); console.log('waiver', name, p.url()); await p.context().close(); await pause(13000);
}
await b.close();
