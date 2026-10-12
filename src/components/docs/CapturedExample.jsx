import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Example from './Example';
import Output from './Output';
import examples from '@site/src/data/examples.json';

/**
 * A template from examples/templates and the HTML a real ExpressionEngine
 * install rendered from it (scripts/capture-examples.mjs). The template
 * shown is byte-for-byte the one that was rendered.
 *
 *   <CapturedExample name="minimal" title="The whole form from one tag" />
 *
 * `start` and `end` cut the output down to the part the page is about:
 * the excerpt runs from the first `start` to the end of the first `end`
 * after it, and is labelled as an excerpt. `parts={[[start, end], …]}`
 * takes several such pieces, in order, joined with "…".
 */
export default function CapturedExample({name, title, caption, start, end, parts: partsProp, outputTitle}) {
  const ex = examples[name];
  if (!ex) throw new Error(`[docs] No captured example "${name}". Add it to examples/ and run npm run capture:examples.`);

  // One excerpt (start/end) or several (parts: [[start, end], …]), each
  // cut from the real output and joined with "…".
  const parts = rangesFrom(name, ex.output, start ? [[start, end]] : partsProp);
  const excerpt = parts !== null;
  const output = excerpt ? parts : ex.output;

  const r = ex.renderedBy;
  const from =
    `Captured from ExpressionEngine ${r.expressionEngine} on ${r.capturedAt}. ` +
    'Signed values and the CSRF token shown as “…”, host replaced with example.com, blank lines collapsed.';

  return (
    <Example title={title} caption={caption}>
      <CodeBlock language="ee" title={ex.file}>
        {ex.template}
      </CodeBlock>
      <Output kind={excerpt ? 'excerpt' : 'captured'} from={from}>
        <CodeBlock language={ex.language} title={outputTitle}>
          {output}
        </CodeBlock>
      </Output>
    </Example>
  );
}

/** The requested pieces of the output, or null for the whole of it. */
function rangesFrom(name, full, ranges) {
  if (!ranges || ranges.length === 0) return null;
  const pieces = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    const from = full.indexOf(start, cursor);
    if (from < 0) throw new Error(`[docs] Example "${name}": "${start}" not found in the captured output.`);
    let to = full.length;
    if (end) {
      const at = full.indexOf(end, from + start.length);
      if (at < 0) throw new Error(`[docs] Example "${name}": "${end}" not found in the captured output.`);
      to = at + end.length;
    }
    pieces.push({from, to, text: full.slice(from, to)});
    cursor = to;
  }
  let out = pieces[0].from > 0 ? '…\n' : '';
  out += pieces.map((p) => p.text).join('\n…\n');
  if (pieces[pieces.length - 1].to < full.length) out += '\n…';
  return out;
}
