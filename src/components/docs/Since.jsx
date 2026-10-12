import React from 'react';
import styles from './styles.module.css';

/** A small "since" marker for a feature introduced in a given version. */
export function Since({version}) {
  return <span className={styles.since}>Since {version}</span>;
}
