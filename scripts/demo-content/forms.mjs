import {session, fm} from './lib.mjs';
const {b, p} = await session();
for (const [name, handle] of [['Contact Us','contact_us'],['Job Application','job_application'],['Event Waiver','event_waiver']]) {
  await p.goto(fm('forms/create'), {waitUntil:'networkidle'});
  await p.fill('input[name=name]', name);
  await p.fill('input[name=handle]', handle);
  await Promise.all([p.waitForLoadState('networkidle'), p.locator('form button[type=submit][value], form button[type=submit]').first().click()]);
  console.log(name, '->', p.url());
}
await b.close();
