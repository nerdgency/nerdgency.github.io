#!/usr/bin/env node
/**
 * Checks the Formidable docs against src/data/formidable-source.json, the
 * map scripts/sync-formidable-source.mjs reads out of the add-on.
 *
 * What it catches:
 *
 *   - a tag that does not exist ({exp:formidable:submissions_url})
 *   - a parameter a tag never reads (js_honeypot=, columns=)
 *   - form:setting:NAME= naming a setting the form does not have
 *   - REGION:attribute:NAME= naming a region that does not exist
 *   - on a reference page (front matter `formidable_tag: form`), any
 *     `name=` written in prose that the tag does not read
 *   - an eecli.php command the add-on does not register
 *   - a $config['formidable_*'] key the add-on never reads
 *   - an image with no alt text, or a /img/ path missing from static/
 *
 * It runs before every build (package.json "prebuild"), so CI refuses
 * to deploy docs that have drifted from the snapshot.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const map = JSON.parse(fs.readFileSync(path.join(root, 'src/data/formidable-source.json'), 'utf8'));

const problems = [];
const report = (file, line, message) => problems.push(`${path.relative(root, file)}:${line}  ${message}`);

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)],
      )
    : [];

// Paths on the command line check just those (handy for the add-on's own docs/).
const targets = process.argv.slice(2).map((p) => path.resolve(p));
const files = (targets.length ? targets.flatMap((t) => (fs.statSync(t).isDirectory() ? walk(t) : [t])) : [
  ...walk(path.join(root, 'docs')),
  ...walk(path.join(root, 'blog')),
  ...walk(path.join(root, 'examples/templates')),
]).filter((f) => /\.(mdx?|html)$/.test(f));

/* ------------------------------------------------------------------ */
/* Parameter matching                                                  */

const regionSet = new Set(map.regions);
const VARIABLE_PARAMS = new Set(['format', 'only', 'except', 'wrap', 'width', 'height']);
const settingSet = new Set(map.formSettings);

/** A pattern such as `field:HANDLE:label:attribute:NAME` as a matcher. */
function matcher(pattern) {
  const parts = pattern.split(':').map((part) => {
    if (part === 'HANDLE') return '[a-z0-9_]+';
    if (part === 'NAME') return '[A-Za-z0-9_\\-:.]+';
    return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  });
  return new RegExp(`^${parts.join(':')}$`);
}

const tagRules = Object.fromEntries(
  Object.entries(map.tags).map(([name, t]) => [
    name,
    { params: new Set(t.params), patterns: t.patterns.map((p) => ({ pattern: p, re: matcher(p) })) },
  ]),
);

/** Why a parameter is not valid on a tag, or null when it is. */
function invalid(tag, param) {
  const rules = tagRules[tag];
  if (!rules) return `{exp:formidable:${tag}} is not a Formidable tag`;
  if (rules.params.has(param)) return null;

  const hit = rules.patterns.find((p) => p.re.test(param));
  if (hit) {
    if (hit.pattern === 'form:setting:NAME') {
      const name = param.slice('form:setting:'.length);
      return settingSet.has(name) ? null : `form:setting:${name} is not a form setting`;
    }
    return null;
  }

  const region = param.match(/^(?:field:[a-z0-9_]+:)?([a-z_]+):attribute:/)?.[1];
  if (region && !regionSet.has(region)) return `"${region}" is not a region`;
  if (region) return `${param} is not accepted per field ("${region}" is not a field-level region)`;
  return `${param}= is not read by {exp:formidable:${tag}}`;
}

/** The same, for a placeholder spelling such as `field:HANDLE:REGION:attribute:NAME`. */
function invalidPlaceholder(tag, spelled) {
  const concrete = spelled
    .replace(/HANDLE/g, 'handle')
    .replace(/REGION/g, () => (spelled.startsWith('field:') ? map.fieldLevelRegions[0] : map.regions[0]))
    .replace(/:NAME$/, ':class');
  if (spelled === 'form:setting:NAME') return null;
  return invalid(tag, concrete);
}

/* ------------------------------------------------------------------ */
/* Reading the files                                                   */

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/** The text of one `{exp:formidable:x ...}` opening tag, braces balanced. */
function openingTag(text, start) {
  let depth = 0;
  let quote = null;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'") quote = c;
    else if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return text.slice(start);
}

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  return Object.fromEntries(
    m[1]
      .split('\n')
      .map((line) => line.match(/^([a-z_]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, k, v]) => [k, v.replace(/^['"]|['"]$/g, '')]),
  );
}

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  // EE comments hide parameters on purpose; so does an HTML comment.
  const text = raw.replace(/\{!--[\s\S]*?--\}/g, (m) => m.replace(/[^\n]/g, ' '));
  const meta = frontMatter(raw);

  // 1. Every tag written anywhere: code blocks, inline code, prose.
  for (const m of text.matchAll(/\{(\/?)exp:formidable:([a-z_]+)/g)) {
    if (m[1] === '/') continue;
    const tag = m[2];
    const line = lineOf(text, m.index);
    if (!tagRules[tag]) {
      report(file, line, `{exp:formidable:${tag}} is not a Formidable tag`);
      continue;
    }
    const opening = openingTag(text, m.index);
    for (const p of opening.matchAll(/(?:^|\s)([A-Za-z][A-Za-z0-9_:\-.]*)\s*=\s*(["'])/g)) {
      const why = invalid(tag, p[1]);
      if (why) report(file, line, why);
    }
  }

  // 2. Reference pages: `name=` in prose belongs to the page's tag.
  if (meta.formidable_tag) {
    const tag = meta.formidable_tag;
    if (!tagRules[tag]) report(file, 1, `formidable_tag: ${tag} is not a Formidable tag`);
    else {
      for (const m of text.matchAll(/`([A-Za-z][A-Za-z0-9_:\-]*)=`/g)) {
        const spelled = m[1];
        // Parameters of a variable or modifier, not of the tag:
        // {created_at format=""}, {field_attributes:bag only=""}.
        if (VARIABLE_PARAMS.has(spelled)) continue;
        const why = /[A-Z]/.test(spelled) ? invalidPlaceholder(tag, spelled) : invalid(tag, spelled);
        if (why) report(file, lineOf(text, m.index), why);
      }
    }
  }

  // 3. CLI commands.
  for (const m of text.matchAll(/eecli\.php\s+(formidable:[a-z:-]+)/g)) {
    if (!map.commands.includes(m[1])) report(file, lineOf(text, m.index), `${m[1]} is not a Formidable command`);
  }

  // 4. config.php keys.
  for (const m of text.matchAll(/\$config\['(formidable_[a-z_]+)'\]/g)) {
    if (!map.configKeys.some((c) => c.key === m[1])) {
      report(file, lineOf(text, m.index), `$config['${m[1]}'] is not read by Formidable`);
    }
  }

  // 5. Images: alt text, and static paths that exist.
  for (const m of text.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!m[1].trim()) report(file, lineOf(text, m.index), `image ${m[2]} has no alt text`);
  }
  // An <img> inside a code block or `code span` is shown, not rendered, so
  // it needs no alt. Blank it out, keeping offsets so line numbers hold.
  const blank = (s) => s.replace(/[^\n]/g, ' ');
  const rendered = text.replace(/^```[\s\S]*?^```/gm, blank).replace(/`[^`\n]+`/g, blank);
  for (const m of rendered.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(m[0])) report(file, lineOf(text, m.index), 'an <img> has no alt attribute');
  }
  for (const m of text.matchAll(/["(](\/img\/[^")\s]+)/g)) {
    if (!fs.existsSync(path.join(root, 'static', m[1]))) {
      report(file, lineOf(text, m.index), `${m[1]} does not exist in static/`);
    }
  }
}

// 6. Every <CapturedExample name="…"> has a capture.
const captured = JSON.parse(fs.readFileSync(path.join(root, 'src/data/examples.json'), 'utf8'));
for (const file of files.filter((f) => /\.mdx$/.test(f))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/<Captured(?:Example|Response)\s[^>]*?\bname="([^"]+)"/g)) {
    if (!captured[m[1]]) report(file, lineOf(text, m.index), `no captured example "${m[1]}" (run npm run capture:examples)`);
  }
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'examples/examples.json'), 'utf8'));
for (const name of Object.keys(manifest).filter((k) => k !== '$comment')) {
  if (!captured[name]) problems.push(`examples/examples.json lists "${name}", which has not been captured (run npm run capture:examples)`);
}
for (const name of fs.readdirSync(path.join(root, 'examples/templates')).map((f) => f.replace(/\.html$/, ''))) {
  if (!captured[name]) problems.push(`examples/templates/${name}.html has not been captured (run npm run capture:examples)`);
}

const label = `Formidable ${map.formidable.version}${map.formidable.commit ? ` (${map.formidable.commit})` : ''}`;

if (problems.length) {
  console.error(`Docs have drifted from ${label}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\n${problems.length} problem(s). If the add-on changed, run \`npm run sync:source\` first.`);
  process.exit(1);
}

console.log(`Docs match ${label}: ${files.length} files checked.`);
