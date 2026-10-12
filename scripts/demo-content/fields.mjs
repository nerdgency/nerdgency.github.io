import {session, fm} from './lib.mjs';
const R = {text:123, checkbox:125, email:126, number:127, tel:128, date:131, textarea:139, file:140, select:141, checkboxes:143, radio:144, html:145, signature:149, computed:150};
const {b, p} = await session();

async function structure(formId, pages) {
  await p.goto(fm(`forms/update/${formId}`), {waitUntil: 'networkidle'});
  const res = await p.evaluate(async ({formId, pages, url}) => {
    const body = new URLSearchParams({csrf_token: EE.CSRF_TOKEN, layout: JSON.stringify({pages})});
    const r = await fetch(url, {method: 'POST', body, headers: {'X-Requested-With': 'XMLHttpRequest'}});
    return r.text();
  }, {formId, pages, url: fm(`forms/update-structure/${formId}`)});
  console.log('structure', formId, res.slice(0, 160));
}

async function field(formId, type, name, handle, opts = {}) {
  const sec = opts.section ? `&section=${opts.section}` : '';
  await p.goto(fm(`fields/create&form_id=${formId}&registry_id=${R[type]}${sec}`), {waitUntil: 'networkidle'});
  await p.evaluate(({name, handle, opts}) => {
    const form = document.querySelector('form input[name="registry_id"]').form;
    const set = (n, v) => {
      let el = form.querySelector(`[name="${n}"]`);
      if (!el) { el = document.createElement('input'); el.type = 'hidden'; el.name = n; form.appendChild(el); }
      el.value = v;
    };
    set('name', name); set('handle', handle);
    if (opts.instructions) set('data_instructions', opts.instructions);
    if (opts.required) set('data_required', '1');
    for (const [k, v] of Object.entries(opts.set || {})) set(k, v);
    if (opts.choices) {
      set('data_options[source]', 'manual');
      set('data_options[use_custom_label]', 'y');
      opts.choices.forEach(([v, l], i) => { set(`data_options[choices][rows][${i}][value]`, v); set(`data_options[choices][rows][${i}][label]`, l); });
    }
  }, {name, handle, opts});
  await Promise.all([p.waitForLoadState('networkidle'), p.evaluate(() => document.querySelector('form input[name="registry_id"]').form.querySelector('[type=submit][value], button[type=submit]').click())]);
  const err = await p.$$eval('.ee-form-error-message, .invalid em, .fieldset-invalid em', els => els.map(e => e.textContent.trim())).catch(() => []);
  console.log('field', formId, handle, err.length ? 'ERRORS ' + err.join(' | ') : 'ok');
}

// Contact Us -----------------------------------------------------------
await field(1, 'text', 'First Name', 'first_name', {required: true});
await field(1, 'text', 'Last Name', 'last_name', {required: true});
await field(1, 'email', 'Email Address', 'email', {required: true, instructions: "We'll only use this to reply to you."});
await field(1, 'select', 'Department', 'department', {choices: [['sales', 'Sales'], ['support', 'Support'], ['billing', 'Billing']]});
await field(1, 'textarea', 'Message', 'message', {required: true});

// Job Application: three pages, a repeating section ---------------------
await structure(2, [
  {id: 'p_1', number: 1, name: 'About you', sections: [{id: 's_1_1', name: 'Your details'}]},
  {id: 'p_2', number: 2, name: 'Experience', sections: [
    {id: 's_2_1', name: 'Previous employers', description: 'Your most recent first.', repeats: true, repeat_min: 1, repeat_max: 5, repeat_add_label: 'Add another employer'},  // condition added below, once its field exists
    {id: 's_2_2', name: 'Skills'},
  ]},
  {id: 'p_3', number: 3, name: 'Finish', sections: [{id: 's_3_1', name: 'Documents'}]},
]);
await field(2, 'text', 'First Name', 'first_name', {required: true, section: 's_1_1'});
await field(2, 'text', 'Last Name', 'last_name', {required: true, section: 's_1_1'});
await field(2, 'email', 'Email Address', 'email', {required: true, section: 's_1_1'});
await field(2, 'tel', 'Phone', 'phone', {section: 's_1_1'});
await field(2, 'radio', 'Have you worked before?', 'worked_before', {required: true, section: 's_1_1', choices: [['yes', 'Yes'], ['no', 'Not yet']]});
await field(2, 'text', 'Employer', 'employer', {required: true, section: 's_2_1'});
await field(2, 'text', 'Role', 'role', {section: 's_2_1'});
await field(2, 'number', 'Years', 'years', {section: 's_2_1'});
await field(2, 'checkboxes', 'Skills', 'skills', {section: 's_2_2', choices: [['design', 'Design'], ['php', 'PHP'], ['javascript', 'JavaScript'], ['ee', 'ExpressionEngine']]});
await field(2, 'computed', 'Total Years', 'total_years', {section: 's_2_2', set: {'computed[type]': 'arithmetic', 'computed[expression]': 'sum({years})', 'computed[show]': 'y', 'computed[format][decimals]': '0'}});
await field(2, 'file', 'Résumé', 'resume', {section: 's_3_1', set: {'data_file[destination]': '4'}, instructions: 'PDF or Word, up to 5 MB.'});
await field(2, 'date', 'Earliest Start Date', 'start_date', {section: 's_3_1'});

// Show Previous employers only to those who have worked before.
await structure(2, [
  {id: 'p_1', number: 1, name: 'About you', sections: [{id: 's_1_1', name: 'Your details'}]},
  {id: 'p_2', number: 2, name: 'Experience', sections: [
    {id: 's_2_1', name: 'Previous employers', description: 'Your most recent first.', repeats: true, repeat_min: 1, repeat_max: 5, repeat_add_label: 'Add another employer',
      conditions_mode: 'show', conditions_show: JSON.stringify([{boolean: 'and', handle: 'worked_before', operator: 'is_any_of', value: ['yes']}])},
    {id: 's_2_2', name: 'Skills'},
  ]},
  {id: 'p_3', number: 3, name: 'Finish', sections: [{id: 's_3_1', name: 'Documents'}]},
]);

// Event Waiver ----------------------------------------------------------
await field(3, 'text', 'Full Name', 'full_name', {required: true});
await field(3, 'email', 'Email Address', 'email', {required: true});
await field(3, 'html', 'Terms', 'terms', {set: {'data_html[content]': '<p class="text-sm text-stone-600">By signing, I confirm I am fit to take part, understand the risks of the event, and release the organisers from liability for injury or loss.</p>'}});
await field(3, 'checkbox', 'I agree to the terms', 'agree', {required: true});
await field(3, 'signature', 'Signature', 'signature', {required: true});

await b.close();
