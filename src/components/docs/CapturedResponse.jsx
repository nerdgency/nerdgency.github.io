import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Example from './Example';
import Output from './Output';
import examples from '@site/src/data/examples.json';

/**
 * A JSON API request and the response a real install returned
 * (scripts/capture-examples.mjs, entries with "api").
 *
 *   <CapturedResponse name="api-forms" title="Listing forms" />
 */
export default function CapturedResponse({name, title, caption, note}) {
  const ex = examples[name];
  if (!ex?.request) throw new Error(`[docs] No captured API response "${name}".`);
  const r = ex.renderedBy;
  const from =
    `HTTP ${ex.status}. Formidable ${r.formidable} on ExpressionEngine ${r.expressionEngine}, captured ${r.capturedAt}, ` +
    `requested from the browser address bar while signed out. Host replaced with example.com${note ? `. ${note}` : ''}.`;
  return (
    <Example title={title} caption={caption}>
      <CodeBlock language="text" title="Request">
        {ex.request}
      </CodeBlock>
      <Output kind="captured" from={from}>
        <CodeBlock language="json">{ex.output}</CodeBlock>
      </Output>
    </Example>
  );
}
