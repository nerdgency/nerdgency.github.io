/**
 * The add-on source map (scripts/sync-formidable-source.mjs), and the
 * lookups the doc components share.
 */
import map from '@site/src/data/formidable-source.json';

export default map;

/**
 * Throws during the build when a doc names a parameter the tag does not
 * read. Accepts concrete names (form_handle, field:email:attribute:class)
 * and placeholder spellings (field:HANDLE:REGION:attribute:NAME).
 */
export function assertParam(tag, name) {
  const t = map.tags[tag];
  if (!t) throw new Error(`[docs] {exp:formidable:${tag}} is not a Formidable tag.`);
  const spelled = name.replace(/=$/, '');
  if (t.params.includes(spelled)) return;

  const normalise = (s) =>
    s
      .replace(/^field:(?:[a-z0-9_]+|HANDLE):/, 'field:HANDLE:')
      .replace(/:attribute:(?:[A-Za-z0-9_-]+|NAME)$/, ':attribute:NAME')
      .replace(/^form:setting:[a-z_]+$/, 'form:setting:NAME');
  const wanted = normalise(spelled);
  const regionsFor = wanted.startsWith('field:') ? map.fieldLevelRegions : map.regions;
  const candidates = wanted.includes('REGION') ? regionsFor.map((r) => wanted.replace('REGION', r)) : [wanted];
  if (candidates.every((c) => t.patterns.includes(c))) return;

  throw new Error(
    `[docs] ${spelled}= is not read by {exp:formidable:${tag}} in Formidable ${map.formidable.version}. ` +
      'Fix the doc, or run `npm run sync:source` if the add-on changed.',
  );
}
