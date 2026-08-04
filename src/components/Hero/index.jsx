import React from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function Hero({
  title,
  icon,
  subtitle,
  description,
  actions,
  footer,
  titleAs = 'h1',
  spacing = 'default',
}) {
  return (
	<header className={`hero ${styles.hero} ${styles[spacing]}`}>
	  <div className={`container hero__container ${styles.hero__container}`}>
		<Heading as={titleAs} className={`hero__title ${styles.hero__title}`}>
		  {icon && (
			<img
			  src={icon}
			  alt=""
			  className={styles.icon}
			/>
		  )}
		  {title}
		</Heading>

		{subtitle && (
		  <p className={`hero__subtitle ${styles.hero__subtitle}`}>
			{subtitle}
		  </p>
		)}

		{description && (
		  <p className={`hero__subtitle ${styles.hero__subtitle}`}>
			{description}
		  </p>
		)}

		{actions && (
		  <div className={styles.actions}>
			{actions}
		  </div>
		)}

		{footer && (
		  <div className={styles.footer}>
			{footer}
		  </div>
		)}
	  </div>
	</header>
  );
}