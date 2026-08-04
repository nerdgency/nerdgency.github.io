import React from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Card({
  href,
  icon,
  title,
  titleAs = 'h3',
  children,
  actions,
  className = '',
}) {
  const content = (
	<>
	  {icon && (
		<div className={styles.icon}>
		  {icon}
		</div>
	  )}

	  {title && (
		<Heading as={titleAs} className={styles.title}>
		  {title}
		</Heading>
	  )}

	  <div className={styles.content}>
		{children}
	  </div>

	  {actions && (
		<div className={styles.actions}>
		  {actions}
		</div>
	  )}
	</>
  );

  if (href) {
	return (
	  <Link
		to={href}
		className={`${styles.card} ${styles.linkCard} ${className}`}
	  >
		{content}
	  </Link>
	);
  }

  return (
	<div className={`${styles.card} ${className}`}>
	  {content}
	</div>
  );
}