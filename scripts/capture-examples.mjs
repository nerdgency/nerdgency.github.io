#!/usr/bin/env node
/**
 * Renders every template in examples/templates through a real
 * ExpressionEngine install running Formidable, and records what came
 * back in src/data/examples.json. The docs' <CapturedExample> reads that
 * file, so the template a page shows and the output beside it come from
 * the same capture.
 *
 *   EE_URL=https://ee.test EE_TEMPLATES=/path/to/system/user/templates/default_site \
 *     npm run capture:examples
 *
 * The templates are copied into a `docs_examples` template group on that
 * site (EE must save templates as files) and fetched over HTTP, signed
 * out. Before anything is written:
 *
 *   - the signed `_formidable_meta` value and the CSRF token are replaced
 *     with "…" (they are per-request secrets and change on every render)
 *   - the site's host is replaced with https://example.com
 *   - runs of blank lines are collapsed and trailing whitespace trimmed
 *
 * Nothing else is changed. Each example records what it was rendered by.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eeUrl = (process.env.EE_URL ?? 'https://ee.test').replace(/\/$/, '');
const eeTemplates = process.env.EE_TEMPLATES ?? path.join(root, '../ee/system/user/templates/default_site');
const eeVersion = process.env.EE_VERSION ?? detectEeVersion();
const group = 'docs_examples';

process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= '0'; // local installs use self-signed certificates

function detectEeVersion() {
  const core = path.join(eeTemplates, '../../../ee/legacy/libraries/Core.php');
  return fs.existsSync(core) ? fs.readFileSync(core, 'utf8').match(/'APP_VER', '([^']+)'/)?.[1] ?? null : null;
}

function installedFormidableVersion() {
  const setup = path.join(eeTemplates, '../../addons/formidable/addon.setup.php');
  return fs.existsSync(setup) ? fs.readFileSync(setup, 'utf8').match(/'FORMIDABLE_VERSION',\s*'([^']+)'/)?.[1] ?? null : null;
}

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'examples/examples.json'), 'utf8'));
delete manifest.$comment;

const groupDir = path.join(eeTemplates, `${group}.group`);
if (!fs.existsSync(eeTemplates)) {
  console.error(`No EE templates folder at ${eeTemplates}. Set EE_TEMPLATES.`);
  process.exit(1);
}
fs.mkdirSync(groupDir, {recursive: true});

const host = new URL(eeUrl).host;
const sanitise = (html) =>
  html
    .replace(/(name="_formidable_meta" value=")[^"]*"/g, '$1…"')
    .replace(/(name="csrf_token" value=")[^"]*"/g, '$1…"')
    .replace(/("(?:meta|csrf_token)":\s*")[^"]*"/g, '$1…"')
    .replaceAll(`https://${host}`, 'https://example.com')
    .replaceAll(`https:\\/\\/${host}`, 'https:\\/\\/example.com')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const out = {};
const formidable = installedFormidableVersion();

// Templates first: the API examples find the API's action URL in the
// rendered output of the api-url example.
const entries = Object.entries(manifest).sort(([, a], [, b]) => Number(Boolean(a.api)) - Number(Boolean(b.api)));

for (const [name, meta] of entries) {
  if (meta.api) {
    const actUrl = out['api-url']?.output.match(/https:\/\/example\.com\/index\.php\?ACT=\d+/)?.[0];
    if (!actUrl) {
      console.error(`${name}: capture the api-url example first.`);
      process.exit(1);
    }
    const url = `${actUrl.replace('https://example.com', eeUrl)}&endpoint=${meta.api}`;
    const res = await fetch(url, {headers: {'Sec-Fetch-Site': 'none'}});
    const body = JSON.stringify(JSON.parse(await res.text()), null, 2);
    out[name] = {
      request: `GET ${actUrl.replace('https://example.com', 'https://example.com')}&endpoint=${meta.api}`,
      status: res.status,
      output: sanitise(body),
      language: 'json',
      renderedBy: {formidable, expressionEngine: eeVersion, capturedAt: new Date().toISOString().slice(0, 10)},
    };
    console.log(`captured ${name} (HTTP ${res.status})`);
    continue;
  }
  const template = fs.readFileSync(path.join(root, 'examples/templates', `${name}.html`), 'utf8').trimEnd();
  fs.writeFileSync(path.join(groupDir, `${name}.html`), `${template}\n`);

  const res = await fetch(`${eeUrl}/${group}/${name}`, {headers: {'Sec-Fetch-Site': 'none'}});
  let body = await res.text();
  if (!res.ok) {
    console.error(`${name}: HTTP ${res.status}`);
    process.exit(1);
  }
  if (meta.json) body = JSON.stringify(JSON.parse(body), null, 2);

  out[name] = {
    file: meta.file,
    template,
    output: sanitise(body),
    language: meta.json ? 'json' : 'html',
    renderedBy: {formidable, expressionEngine: eeVersion, capturedAt: new Date().toISOString().slice(0, 10)},
  };
  console.log(`captured ${name}`);
}

fs.writeFileSync(path.join(root, 'src/data/examples.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log(`Wrote src/data/examples.json (${Object.keys(out).length} examples).`);
