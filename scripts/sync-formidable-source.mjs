#!/usr/bin/env node
/**
 * Builds src/data/formidable-source.json, the docs' source-of-truth map,
 * by reading the Formidable add-on's own source.
 *
 * The add-on lives in a separate (private) repository, so the map is a
 * committed snapshot: run this locally after the add-on changes, review
 * the diff, and commit it. `npm run check:docs` then validates the docs
 * against the snapshot in CI, where the add-on source is not available.
 *
 *   FORMIDABLE_SRC=/path/to/system/user/addons/formidable npm run sync:source
 *
 * Everything here is read with regular expressions from PHP source. When
 * a pattern stops matching, the script fails loudly rather than writing
 * a smaller map: a silently shrinking map would make the drift check
 * pass for the wrong reason.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.resolve(
  process.env.FORMIDABLE_SRC ??
    path.join(siteRoot, '../ee/packages/formidable/dist/system/user/addons/formidable'),
);
const out = path.join(siteRoot, 'src/data/formidable-source.json');

if (!fs.existsSync(path.join(src, 'addon.setup.php'))) {
  console.error(`Formidable source not found at ${src}. Set FORMIDABLE_SRC.`);
  process.exit(1);
}

const read = (rel) => fs.readFileSync(path.join(src, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(src, rel));
const uniq = (list) => [...new Set(list)].sort();
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)],
  );

function need(value, what) {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
    console.error(`Could not read ${what} from the add-on source. Has the code moved?`);
    process.exit(1);
  }
  return value;
}

/** Strip PHP comments so a parameter named in a docblock is not read as real. */
function code(php) {
  return php
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/([;{}])\s*\/\/.*$/gm, '$1');
}

const setup = read('addon.setup.php');
const version = need(setup.match(/'FORMIDABLE_VERSION',\s*'([^']+)'/)?.[1], 'the version');
const minPhp = need(read('upd.formidable.php').match(/MIN_PHP\s*=\s*'([^']+)'/)?.[1], 'the minimum PHP');

let commit = null;
try {
  commit = execSync('git rev-parse --short HEAD', { cwd: src, stdio: ['ignore', 'pipe', 'ignore'] })
    .toString()
    .trim();
} catch {
  // Not a git checkout; the version is enough to say where it came from.
}

/* ------------------------------------------------------------------ */
/* Regions                                                             */

const regionsPhp = read('Library/Tags/Regions.php');
const regionConsts = Object.fromEntries(
  [...regionsPhp.matchAll(/public const ([A-Z_]+) = '([a-z_]+)';/g)]
    .filter(([, name]) => !name.startsWith('LEVEL_'))
    .map(([, name, value]) => [name, value]),
);
const regions = need(uniq(Object.values(regionConsts)), 'the regions');

/** Which regions render once per field (and so take field:HANDLE:REGION:attribute:). */
const fieldLevelRegions = need(
  ['FIELD_WRAPPER', 'FIELD', 'LABEL', 'INSTRUCTIONS', 'ERROR', 'OPTIONS_WRAPPER', 'OPTION', 'OPTION_LABEL']
    .map((name) => regionConsts[name])
    .filter(Boolean),
  'the field-level regions',
);

/* ------------------------------------------------------------------ */
/* Tag parameters                                                      */

/** Parameter names a PHP file reads, and the parameter families it scans for. */
function paramsIn(php) {
  const body = code(php);
  const names = [];
  const patterns = [];

  for (const m of body.matchAll(/fetch_param\(\s*'([a-z_]+)'/g)) names.push(m[1]);
  // SettingFallback: the param name and the setting name are the same string.
  for (const m of body.matchAll(/->(?:resolve|layers)\(\s*'([a-z_]+)'/g)) names.push(m[1]);
  for (const m of body.matchAll(/->pipeList\(\s*'([a-z_]+)'\)/g)) names.push(m[1]);
  for (const m of body.matchAll(/->flat\(\s*'([a-z_:]+)'\)/g)) patterns.push(`${m[1]}:NAME`);
  for (const m of body.matchAll(/->nested\(\s*'([a-z_]+)'\s*,\s*'([a-z_:]+)'\)/g)) {
    patterns.push(`${m[1]}:HANDLE:${m[2]}:NAME`);
  }
  for (const m of body.matchAll(/->suffixed\(\s*'([a-z_]+)'\s*,\s*'([a-z_]+)'\)/g)) {
    patterns.push(`${m[1]}:HANDLE:${m[2]}`);
  }
  // EE's own pagination reads paginate= (and paginate_base=) itself.
  if (/ee\(\)->load->library\('pagination'\)|ee\('CP\/Pagination'|->pagination->/.test(body)) {
    names.push('paginate', 'paginate_base');
  }
  return { names, patterns };
}

/** The Library\Tags classes a tag file imports, one level deep. */
function libraryImports(php) {
  return [...php.matchAll(/^use Nerdgency\\Formidable\\Library\\Tags\\([A-Za-z]+);/gm)].map((m) => m[1]);
}

const tagFiles = fs.readdirSync(path.join(src, 'Tags')).filter((f) => f.endsWith('.php'));
const tags = {};

for (const file of tagFiles) {
  const cls = file.replace(/\.php$/, '');
  const tag = cls.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  const php = read(`Tags/${file}`);
  const own = paramsIn(php);
  const names = [...own.names];
  const patterns = [...own.patterns];

  // The form a listing tag reads is resolved by the Form repository.
  if (/idFromTag\(\)/.test(php)) {
    const repo = read('Service/Form/FormRepository.php');
    const method = repo.match(/function idFromTag\(\)[\s\S]*?\n\t}/)?.[0] ?? '';
    names.push(...paramsIn(method).names);
  }

  for (const lib of libraryImports(php)) {
    const rel = `Library/Tags/${lib}.php`;
    if (!exists(rel)) continue;
    const found = paramsIn(read(rel));
    names.push(...found.names);
    patterns.push(...found.patterns);
  }

  // RegionLayers reads REGION:attribute:NAME for every region, and
  // field:HANDLE:REGION:attribute:NAME for the field-level ones, through
  // Regions::attributeParam() -- a computed prefix the patterns above
  // cannot see.
  const usesRegions = /RegionLayers|StructuralRegions/.test(php);
  if (usesRegions) {
    for (const region of regions) patterns.push(`${region}:attribute:NAME`);
    for (const region of fieldLevelRegions) patterns.push(`field:HANDLE:${region}:attribute:NAME`);
  }

  tags[tag] = {
    tag: `exp:formidable:${tag}`,
    source: `Tags/${file}`,
    params: uniq(names),
    patterns: uniq(patterns),
  };
}

need(tags.form?.params?.includes('form_handle') ? tags.form : null, 'the form tag parameters');

/* `form:setting:NAME`: any property of ConfigurationFormObject. */
const configObject = read('Model/Data/Registry/Configuration/ConfigurationFormObject.php');
const formSettings = need(
  uniq([...code(configObject).matchAll(/public (?:readonly )?[?\w\\]+ \$([a-z_]+)/g)].map((m) => m[1]))
    .filter((name) => name !== 'layout'),
  'the form settings',
);

/* ------------------------------------------------------------------ */
/* Fieldtypes                                                          */

const seeder = code(read('database/seeds/FormidableFieldtypeSeeder.php'));
const groupsBody = seeder.match(/function groups\(\)[\s\S]*?function /)?.[0] ?? '';
const fieldtypesBody = seeder.match(/function fieldtypes\(\)[\s\S]*$/)?.[0] ?? '';
const fieldtypeGroups = need(
  [...groupsBody.matchAll(/'([a-z_]+)' => \[\s*'name' => '([^']+)'/g)].map((m) => ({ handle: m[1], name: m[2] })),
  'the fieldtype groups',
);
const entryRe = /'([a-z_]+)' => \[\s*'name' => '([^']+)',\s*'group' => '([a-z_]+)'/g;
const entries = [...fieldtypesBody.matchAll(entryRe)];
const fieldtypes = need(
  entries.map((m, i) => {
    const block = fieldtypesBody.slice(m.index, entries[i + 1]?.index ?? fieldtypesBody.length);
    const flag = (key) => {
      const v = block.match(new RegExp(`'${key}'\\s*=>\\s*'?([^',\\]\\s]+)'?`))?.[1];
      return v === undefined ? null : v;
    };
    const list = (key) =>
      [...(block.match(new RegExp(`'${key}'\\s*=>\\s*\\[([^\\]]*)\\]`))?.[1] ?? '').matchAll(/'([^']+)'/g)].map((x) => x[1]);
    return {
      handle: m[1],
      name: m[2],
      group: m[3],
      engine: flag('storage_engine') ?? 'inputs', // fieldtypeData()'s default
      inputs: list('storage_inputs'),
      encryptable: ['1', 'true'].includes(flag('storage_allow_encryption') ?? ''),
      castTo: flag('storage_cast_to') ?? 'string', // fieldtypeData()'s default
      defaultRules: list('settings_default_rules'),
    };
  }),
  'the fieldtypes',
);

/* ------------------------------------------------------------------ */
/* Everything else                                                     */

const commands = need(
  uniq([...setup.matchAll(/'(formidable:[a-z:-]+)' =>/g)].map((m) => m[1])),
  'the CLI commands',
);

const configPhp = read('Library/Config.php');
const defaultsBlock = configPhp.match(/protected const DEFAULTS = \[([\s\S]*?)\n\t\];/)?.[1] ?? '';
const configKeys = need(
  [...code(defaultsBlock).matchAll(/'([a-z_]+)' => ([^,\n]+),/g)].map((m) => ({
    key: `formidable_${m[1]}`,
    default: m[2].trim(),
  })),
  'the config.php keys',
);

// Keys read straight from the site's config.php rather than through Library\Config.
for (const file of walk(src).filter((f) => f.endsWith('.php'))) {
  for (const m of code(fs.readFileSync(file, 'utf8')).matchAll(/config->item\('(formidable_[a-z_]+)'\)/g)) {
    if (!configKeys.some((c) => c.key === m[1])) configKeys.push({ key: m[1], default: null });
  }
}
configKeys.sort((a, b) => a.key.localeCompare(b.key));

const hooks = need(
  uniq(
    [...fs.readdirSync(path.join(src, 'Actions'))].flatMap((f) =>
      [...read(`Actions/${f}`).matchAll(/extensions->call\(\s*'([a-z_]+)'/g)].map((m) => m[1]),
    ),
  ),
  'the extension hooks',
);

const apiRoutes = need(
  [...read('Service/Api/ApiRoutes.php').matchAll(/\['(GET|POST|PUT|PATCH|DELETE)', '([^']+)', '(\w+)', '([a-z:]+)'\]/g)].map(
    (m) => ({ method: m[1], endpoint: m[2], scope: m[4] }),
  ),
  'the API routes',
);

const providers = need(
  [...read('config/config.php').matchAll(/Connections\\Providers\\(\w+)::class/g)].map((m) => m[1]),
  'the connection providers',
);

const ruleSeeder = read('database/seeds/FormidableRuleSeeder.php');
const rules = need(
  [...(ruleSeeder.match(/const RULES = \[([\s\S]*?)\];/)?.[1] ?? '').matchAll(/'(\w+)' => '(\w+)'/g)].map((m) => ({
    handle: m[1],
    accepts: m[2],
  })),
  'the validation rules',
);

const themes = {};
for (const theme of fs.readdirSync(path.join(src, 'themes'))) {
  const dir = path.join(src, 'themes', theme);
  if (!fs.statSync(dir).isDirectory()) continue;
  themes[theme] = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.html'))
    .map((f) => f.replace(/\.html$/, ''))
    .sort();
}
need(themes.default, 'the shipped themes');

const map = {
  $comment:
    'Generated by scripts/sync-formidable-source.mjs from the Formidable add-on source. Do not edit by hand.',
  formidable: { version, commit, minPhp },
  tags,
  formSettings,
  regions,
  fieldLevelRegions,
  fieldtypeGroups,
  fieldtypes,
  commands,
  configKeys,
  hooks,
  apiRoutes,
  connectionProviders: providers,
  rules,
  themes,
};

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, `${JSON.stringify(map, null, 2)}\n`);
console.log(
  `Wrote ${path.relative(siteRoot, out)} from Formidable ${version}${commit ? ` (${commit})` : ''}: ` +
    `${Object.keys(tags).length} tags, ${fieldtypes.length} fieldtypes, ${commands.length} commands.`,
);
