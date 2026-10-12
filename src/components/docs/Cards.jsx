import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

/** A grid of links, for section landing pages. */
export function Cards({children}) {
  return <div className={styles.cards}>{children}</div>;
}

export function CardLink({to, title, children}) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.cardTitle}>{title}</span>
      {children && <span className={styles.cardBody}>{children}</span>}
    </Link>
  );
}
