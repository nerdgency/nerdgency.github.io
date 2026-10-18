import React from 'react';
import Link from '@docusaurus/Link';
import {useActivePlugin, useActiveVersion} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

/** A grid of links, for section landing pages. */
export function Cards({children}) {
  return <div className={styles.cards}>{children}</div>;
}

/**
 * `to` is a route. One starting `./` is relative to the root of the docs
 * version being read, so a versioned page's cards stay in that version
 * (`./using-autograph/channel-forms` is /docs/autograph/… on 2.x and
 * /docs/autograph/v1/… on 1.x).
 */
export function CardLink({to, title, children}) {
  const plugin = useActivePlugin();
  const version = useActiveVersion(plugin?.pluginId);
  const href = to.startsWith('./') && version ? `${version.path.replace(/\/$/, '')}/${to.slice(2)}` : to;

  return (
    <Link to={href} className={styles.card}>
      <span className={styles.cardTitle}>{title}</span>
      {children && <span className={styles.cardBody}>{children}</span>}
    </Link>
  );
}
