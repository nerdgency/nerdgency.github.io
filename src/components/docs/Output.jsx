import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const KINDS = {
  // Copied from a page Formidable actually rendered.
  captured: {label: 'Rendered output', className: styles.labelCaptured},
  // The same, trimmed: whitespace collapsed, long values elided with "…".
  excerpt: {label: 'Rendered output (excerpt)', className: styles.labelCaptured},
  // Written by hand to show a shape. Never presented as real output.
  illustrative: {label: 'Illustrative, not captured output', className: styles.labelIllustrative},
};

/**
 * The output half of an example, labelled with where it came from.
 *
 * kind="captured" and kind="excerpt" require `from`: what rendered it
 * (the template, the Formidable version, the install). The build fails
 * without it, so real-looking output can never appear unsourced.
 */
export default function Output({kind = 'illustrative', from, children}) {
  const meta = KINDS[kind];
  if (!meta) throw new Error(`[docs] <Output kind="${kind}"> must be one of ${Object.keys(KINDS).join(', ')}.`);
  if (kind !== 'illustrative' && !from) {
    throw new Error(`[docs] <Output kind="${kind}"> needs a from= saying what rendered it.`);
  }
  return (
    <div className={clsx(styles.output, kind === 'illustrative' && styles.outputIllustrative)}>
      <div className={styles.outputHeader}>
        <span className={clsx(styles.label, meta.className)}>{meta.label}</span>
        {from && <span className={styles.outputSource}>{from}</span>}
      </div>
      {children}
    </div>
  );
}
