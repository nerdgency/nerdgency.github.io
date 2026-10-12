import React from 'react';
import styles from './styles.module.css';
import map from './source';

/**
 * Which Formidable source a page was checked against. Read from the
 * source map, so it cannot claim a version the docs were not verified
 * with.
 */
export function VersionNotice({children}) {
  const {version, commit, minPhp} = map.formidable;
  return (
    <aside className={styles.version} aria-label="Version">
      <span>
        Verified against Formidable <strong>{version}</strong>
        {commit ? <> (source <code>{commit}</code>)</> : null}
      </span>
      <span>ExpressionEngine 7.5+ · PHP {minPhp.replace(/\.0$/, '')}+</span>
      {children}
    </aside>
  );
}

/** A small "since" marker for a feature introduced in a given version. */
export function Since({version}) {
  return <span className={styles.since}>Since {version}</span>;
}
