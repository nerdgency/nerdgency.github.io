import React from 'react';
import map from './source';
import styles from './styles.module.css';

/*
 * Reference tables rendered straight from the add-on source map, so they
 * cannot drift from the code. Prose that explains them lives in the doc.
 */

const groupName = (handle) => map.fieldtypeGroups.find((g) => g.handle === handle)?.name ?? handle;

/**
 * Every shipped fieldtype, as the installer seeds it. Fieldtypes can be
 * edited under Registry, so a site's own may differ.
 */
export function FieldtypeTable({group, storage = false}) {
  const rows = group ? map.fieldtypes.filter((f) => f.group === group) : map.fieldtypes;
  const castLabel = {string: 'text', float: 'decimal number', integer: 'whole number', array: 'list', boolean: 'true/false'};
  return (
    <table>
      <thead>
        <tr>
          <th>Fieldtype</th>
          <th>Handle</th>
          {!group && <th>Group</th>}
          {storage && <th>Stored as</th>}
          {storage && <th>Can be encrypted</th>}
          {storage && <th>Rules added to new fields</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((f) => (
          <tr key={f.handle}>
            <td>{f.name}</td>
            <td><code>{f.handle}</code></td>
            {!group && <td>{groupName(f.group)}</td>}
            {storage && <td>{f.engine === 'none' ? 'nothing' : f.engine === 'files' ? 'file reference' : f.handle === 'signature' ? 'image or file' : castLabel[f.castTo] ?? f.castTo}</td>}
            {storage && <td>{f.engine === 'none' ? '–' : f.encryptable ? 'Yes' : 'No'}</td>}
            {storage && <td>{f.defaultRules.length ? f.defaultRules.map((r) => <code key={r}>{r}</code>) : '–'}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function FieldtypeCount() {
  return <>{map.fieldtypes.length}</>;
}

/** The CLI commands, with descriptions supplied by the doc. */
export function CommandTable({descriptions = {}, only = false}) {
  const missing = Object.keys(descriptions).filter((c) => !map.commands.includes(c));
  if (missing.length) throw new Error(`[docs] Not Formidable commands: ${missing.join(', ')}`);
  return (
    <table>
      <thead>
        <tr><th>Command</th><th>What it does</th></tr>
      </thead>
      <tbody>
        {(only ? map.commands.filter((c) => c in descriptions) : map.commands).map((c) => (
          <tr key={c}>
            <td><code>{c}</code></td>
            <td>{descriptions[c] ?? ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The config.php keys Formidable reads, and their shipped defaults. */
export function ConfigTable({descriptions = {}}) {
  const missing = Object.keys(descriptions).filter((k) => !map.configKeys.some((c) => c.key === k));
  if (missing.length) throw new Error(`[docs] Not Formidable config keys: ${missing.join(', ')}`);
  return (
    <table>
      <thead>
        <tr><th>Key</th><th>Default</th><th>What it does</th></tr>
      </thead>
      <tbody>
        {map.configKeys.map((c) => (
          <tr key={c.key}>
            <td><code>{`$config['${c.key}']`}</code></td>
            <td>{c.default === null ? 'unset' : <code>{c.default}</code>}</td>
            <td>{descriptions[c.key] ?? ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The JSON API's endpoints and the scope each needs. */
export function ApiRoutesTable({descriptions = {}}) {
  return (
    <table>
      <thead>
        <tr><th>Method</th><th>Endpoint</th><th>Scope</th><th>Returns</th></tr>
      </thead>
      <tbody>
        {map.apiRoutes.map((r) => {
          const key = `${r.method} ${r.endpoint}`;
          return (
            <tr key={key}>
              <td><code>{r.method}</code></td>
              <td><code>{r.endpoint}</code></td>
              <td><code>{r.scope}</code></td>
              <td>{descriptions[key] ?? ''}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Region names, optionally only the field-level ones. */
export function RegionList({level}) {
  const list = level === 'field' ? map.fieldLevelRegions : map.regions;
  return (
    <span className={styles.mono}>
      {list.map((r, i) => (
        <React.Fragment key={r}>
          {i > 0 && ', '}
          <code>{r}</code>
        </React.Fragment>
      ))}
    </span>
  );
}

/** The settings form:setting:NAME= accepts. */
export function FormSettingsList() {
  return (
    <span>
      {map.formSettings.map((s, i) => (
        <React.Fragment key={s}>
          {i > 0 && ', '}
          <code>{s}</code>
        </React.Fragment>
      ))}
    </span>
  );
}

/** The parts each shipped theme provides. */
export function ThemePartsTable() {
  const themes = Object.keys(map.themes).filter((t) => t !== 'email');
  const parts = [...new Set(themes.flatMap((t) => map.themes[t]))].sort();
  return (
    <table>
      <thead>
        <tr>
          <th>Part</th>
          {themes.map((t) => <th key={t}>{t}</th>)}
        </tr>
      </thead>
      <tbody>
        {parts.map((p) => (
          <tr key={p}>
            <td><code>_{p}</code></td>
            {themes.map((t) => (
              <td key={t}>{map.themes[t].includes(p) ? 'Yes' : <span aria-label="Falls back to Default">–</span>}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Names of the connection providers that ship with Formidable. */
export function ProviderList() {
  return <>{map.connectionProviders.join(', ')}</>;
}

/** The validation rules that ship in the Registry, and what each takes. */
export function RuleTable({descriptions = {}}) {
  const missing = Object.keys(descriptions).filter((r) => !map.rules.some((x) => x.handle === r));
  if (missing.length) throw new Error(`[docs] Not Formidable rules: ${missing.join(', ')}`);
  const takes = {none: 'nothing', number: 'a number', text: 'text'};
  return (
    <table>
      <thead>
        <tr><th>Rule</th><th>Takes</th><th>Checks that the answer…</th></tr>
      </thead>
      <tbody>
        {map.rules.map((r) => (
          <tr key={r.handle}>
            <td><code>{r.accepts === 'none' ? r.handle : `${r.handle}[…]`}</code></td>
            <td>{takes[r.accepts] ?? r.accepts}</td>
            <td>{descriptions[r.handle] ?? ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The extension hooks the add-on calls. */
export function HookList() {
  return (
    <>
      {map.hooks.map((h, i) => (
        <React.Fragment key={h}>
          {i > 0 && ', '}
          <code>{h}</code>
        </React.Fragment>
      ))}
    </>
  );
}

/*
 * A directory of every fieldtype, like Statamic's "All fieldtypes": a card
 * each, by group, linking to its section on the Fieldtypes page. The list
 * comes from the source map; the words are here, and the build fails if a
 * shipped fieldtype has none -- so a new fieldtype cannot go unlisted.
 */
const FIELDTYPE_BLURBS = {
  text: ['Aa', 'A single line of text.'],
  textarea: ['¶', 'Several lines of text.'],
  email: ['@', 'An email address, checked on the server.'],
  tel: ['☏', 'A phone number, with the phone keypad on mobile.'],
  url: ['↗', 'A web address.'],
  password: ['••', 'Masked as it is typed.'],
  number: ['12', 'A number, stored as one.'],
  range: ['⟷', 'A slider between two numbers.'],
  color: ['◐', 'A colour picker, stored as hex.'],
  checkbox: ['✓', 'One tick box: "I agree".'],
  toggle: ['◐●', 'A yes/no switch.'],
  consent: ['✓§', 'Agreement, with a record of it.'],
  name: ['Aa Bb', 'First and last name, in parts.'],
  address: ['⌂', 'A postal address, in parts.'],
  datalist: ['⌕', 'Free text with suggestions.'],
  hidden: ['◌', 'A value the visitor never sees.'],
  file: ['⇪', 'Uploads into the file manager.'],
  date: ['31', 'A calendar date.'],
  datetime: ['31:', 'A date and a time.'],
  time: ['⏲', 'A time of day.'],
  month: ['Mo', 'A month of a year.'],
  week: ['Wk', 'A week of a year.'],
  select: ['▾', 'One choice from a dropdown.'],
  multiselect: ['▾▾', 'Several choices from a list.'],
  checkboxes: ['☑', 'Tick as many as apply.'],
  radio: ['◉', 'Exactly one, all visible.'],
  rating: ['★', 'Stars, one to five.'],
  scale: ['0–10', 'Numbered buttons, such as NPS.'],
  image_choice: ['▣', 'One choice from pictures.'],
  image_choices: ['▣▣', 'Several choices from pictures.'],
  matrix: ['▦', 'Statements on one scale (Likert).'],
  html: ['</>', 'Content between the fields.'],
  captcha: ['?!', "ExpressionEngine's CAPTCHA."],
  turnstile: ['☁', 'Cloudflare Turnstile.'],
  hcaptcha: ['h', 'hCaptcha.'],
  signature: ['✍', 'Signed with a finger or mouse.'],
  attribution: ['⇢', 'Where the visitor came from.'],
  computed: ['ƒx', 'Worked out from other answers.'],
};

export function FieldtypeDirectory() {
  const missing = map.fieldtypes.filter((f) => !FIELDTYPE_BLURBS[f.handle]).map((f) => f.handle);
  if (missing.length) {
    throw new Error(`[docs] <FieldtypeDirectory> has no description for: ${missing.join(', ')}`);
  }

  return (
    <div className={styles.ftDirectory}>
      {map.fieldtypeGroups.map((group) => {
        // In the order the Fieldtypes page describes them.
        const order = Object.keys(FIELDTYPE_BLURBS);
        const types = map.fieldtypes
          .filter((f) => f.group === group.handle)
          .sort((a, b) => order.indexOf(a.handle) - order.indexOf(b.handle));
        if (!types.length) return null;
        return (
          <section key={group.handle} className={styles.ftGroup}>
            <h3 className={styles.ftGroupTitle}>{group.name}</h3>
            <div className={styles.ftGrid}>
              {types.map((f) => {
                const [glyph, blurb] = FIELDTYPE_BLURBS[f.handle];
                return (
                  <a key={f.handle} href={`#${f.handle}`} className={styles.ftCard}>
                    <span className={styles.ftGlyph} aria-hidden="true">{glyph}</span>
                    <span>
                      <span className={styles.ftName}>{f.name}</span>
                      <span className={styles.ftBlurb}>{blurb}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
