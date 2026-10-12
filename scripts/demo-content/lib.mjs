/** Shared by the demo-content scripts: .env, CP URLs, and a signed-in browser. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const env = Object.fromEntries(
  fs.readFileSync(path.join(root, '.env'), 'utf8').split('\n').filter((l) => /^[A-Z_]+=/.test(l)).map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1)]),
);
export const cp = (r) => `${env.EE_URL}${env.EE_CP_PATH}?/cp/${r}`;
export const fm = (r) => cp('addons/settings/formidable/' + r);
export async function session() {
  const b = await chromium.launch();
  const c = await b.newContext({ignoreHTTPSErrors: true, viewport: {width: 1440, height: 900}});
  const p = await c.newPage();
  await p.goto(cp('login'));
  await p.fill('input[name=username]', env.EE_CAPTURE_USERNAME);
  await p.fill('input[name=password]', env.EE_CAPTURE_PASSWORD);
  await Promise.all([p.waitForLoadState('networkidle'), p.click('input[type=submit],button[type=submit]')]);
  return {b, c, p};
}
