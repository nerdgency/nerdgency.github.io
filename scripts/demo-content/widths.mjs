import fs from 'node:fs';
import {session, fm} from './lib.mjs';
const W = {first_name:2,last_name:2,email:2,department:2,phone:2,employer:2,role:1,years:1,total_years:2,resume:2,start_date:2,full_name:2};
const rows = fs.readFileSync('fieldrows.tsv','utf8').trim().split('\n').map(l=>l.split('\t'));
const {b, p} = await session();
for (const formId of ['1','2','3']) {
  const layout = rows.filter(r=>r[0]===formId).map((r,i)=>({field_id:+r[1], columns: W[r[2]] ?? 4, section:r[3], sort_order:i+1}));
  await p.goto(fm(`forms/update/${formId}`), {waitUntil:'networkidle'});
  const res = await p.evaluate(async ({layout,url}) => (await fetch(url,{method:'POST',body:new URLSearchParams({csrf_token:EE.CSRF_TOKEN, layout:JSON.stringify(layout)}),headers:{'X-Requested-With':'XMLHttpRequest'}})).text(), {layout, url: fm(`forms/update-layout/${formId}`)});
  console.log(formId, res);
}
await b.close();
