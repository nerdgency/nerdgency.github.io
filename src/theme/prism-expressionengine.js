/**
 * ExpressionEngine template syntax for Prism: HTML, with EE's tags,
 * variables, conditionals and comments highlighted inside it.
 *
 * Use ```ee (or ```expressionengine) for a template. Plain ```html
 * still works but leaves the EE syntax unhighlighted.
 */
export default function expressionEngine(Prism) {
  const tokens = {
    'ee-comment': {
      pattern: /\{!--[\s\S]*?--\}/,
      greedy: true,
      alias: 'comment',
    },
    'ee-module-tag': {
      pattern: /\{\/?exp:[\w:]+(?:[^{}"']|"[^"]*"|'[^']*'|\{[^{}]*\})*\}/,
      greedy: true,
      alias: 'tag',
      inside: {
        punctuation: /^\{\/?|\}$/,
        keyword: /^exp:[\w:]+/,
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*')/,
          inside: {punctuation: /^=/},
        },
        'attr-name': /[\w:.-]+(?=\s*=)/,
      },
    },
    'ee-conditional': {
      pattern: /\{\/?if(?::else(?:if)?)?\b[^}]*\}/,
      greedy: true,
      alias: 'keyword',
      inside: {
        punctuation: /^\{\/?|\}$/,
        keyword: /^if(?::else(?:if)?)?/,
        string: /"[^"]*"|'[^']*'/,
        operator: /==|!=|<=|>=|&&|\|\||[<>]|\b(?:AND|OR|NOT)\b/,
        number: /\b\d+(?:\.\d+)?\b/,
        variable: /[a-zA-Z_][\w:.-]*/,
      },
    },
    'ee-variable': {
      pattern: /\{\/?[a-zA-Z_][\w:.-]*(?:\s+[\w:-]+=(?:"[^"]*"|'[^']*'))*\}/,
      greedy: true,
      alias: 'variable',
      inside: {
        punctuation: /^\{\/?|\}$/,
        'attr-value': {
          pattern: /=(?:"[^"]*"|'[^']*')/,
          inside: {punctuation: /^=/},
        },
        'attr-name': /\s[\w:-]+(?==)/,
      },
    },
  };

  Prism.languages.expressionengine = Prism.languages.extend('markup', {});
  Prism.languages.insertBefore('expressionengine', 'comment', tokens);

  // EE variables inside an HTML tag: <input {field_attributes}>
  Prism.languages.insertBefore(
    'inside',
    'attr-name',
    {'ee-variable': tokens['ee-variable']},
    Prism.languages.expressionengine.tag,
  );

  Prism.languages.ee = Prism.languages.expressionengine;
}
