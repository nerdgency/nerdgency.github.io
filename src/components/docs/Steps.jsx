import React from 'react';
import styles from './styles.module.css';

/**
 * A numbered procedure.
 *
 *   <Steps>
 *     <Step title="Create the form">…</Step>
 *     <Step title="Render it">…</Step>
 *   </Steps>
 */
export function Steps({children}) {
  return <ol className={styles.steps}>{children}</ol>;
}

export function Step({title, children}) {
  return (
    <li className={styles.step}>
      {title && <p className={styles.stepTitle}>{title}</p>}
      <div className={styles.stepBody}>{children}</div>
    </li>
  );
}
