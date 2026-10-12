import {session, fm} from './lib.mjs';
const {b, p} = await session();
async function workflow(formId, values) {
  await p.goto(fm(`workflows/create&form_id=${formId}`), {waitUntil: 'networkidle'});
  await p.evaluate((values) => {
    const form = document.querySelector('form input[name="form_id"]').form;
    for (const [n, v] of Object.entries(values)) {
      let el = form.querySelector(`[name="${n}"]`);
      if (!el) { el = document.createElement('input'); el.type = 'hidden'; el.name = n; form.appendChild(el); }
      el.value = v;
    }
  }, values);
  await Promise.all([p.waitForLoadState('networkidle'), p.evaluate(() => document.querySelector('form input[name="form_id"]').form.querySelector('[type=submit][value], button[type=submit]').click())]);
  console.log(formId, values.name, p.url());
}
await workflow(1, {
  name: 'Email the team', event: 'submission_created', action: 'email',
  'data_email_recipients[0][name]': 'manual', 'data_email_recipients[0][type]': 'to', 'data_email_recipients[0][value]': 'hello@example.com',
  data_email_notification_subject: 'New enquiry from {field:first_name} {field:last_name}',
  data_email_notification_reply_to: '{field:email}',
});
await workflow(1, {
  name: 'Post to the CRM webhook', event: 'submission_created', action: 'webhook',
  data_webhook_url: 'https://example.com/hooks/formidable', data_webhook_secret: 'demo-signing-secret',
});
await workflow(2, {
  name: 'Email the hiring team', event: 'submission_created', action: 'email',
  'data_email_recipients[0][name]': 'manual', 'data_email_recipients[0][type]': 'to', 'data_email_recipients[0][value]': 'hiring@example.com',
  'data_email_recipients[1][name]': 'manual', 'data_email_recipients[1][type]': 'cc', 'data_email_recipients[1][value]': 'manager@example.com',
  data_email_notification_subject: 'New application: {field:first_name} {field:last_name}',
  data_email_attach_files: '1',
});
await workflow(2, {
  name: 'Send the resume link', event: 'submission_draft_saved', action: 'email',
  'data_email_recipients[0][name]': 'manual', 'data_email_recipients[0][type]': 'to', 'data_email_recipients[0][value]': 'applicants@example.com',
  data_email_notification_template: 'draft',
});
await b.close();
