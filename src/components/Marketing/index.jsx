/**
 * Building blocks for the marketing pages (src/pages): an eyebrow label in
 * the wordmark's braces, a section with a heading, a code window, the
 * rendered-form preview, and the feature grid. Everything reads the site
 * tokens, so both colour modes follow.
 */
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

/** `{ Label }` -- a small uppercase label in amber braces. */
export function Eyebrow({children, className}) {
  return (
    <p className={clsx(styles.eyebrow, className)}>
      <span aria-hidden="true">{'{'}</span>
      {children}
      <span aria-hidden="true">{'}'}</span>
    </p>
  );
}

export function Section({eyebrow, title, lede, children, tone = 'paper', id, narrow = false}) {
  return (
    <section id={id} className={clsx(styles.section, styles[tone])}>
      <div className={clsx(styles.inner, narrow && styles.narrow)}>
        {(eyebrow || title || lede) && (
          <header className={styles.sectionHead}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            {lede && <p className={styles.sectionLede}>{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** A code sample in a window frame, highlighted with the site's theme. */
export function CodeWindow({title, language = 'ee', children, className}) {
  return (
    <div className={clsx(styles.window, className)}>
      <div className={styles.windowBar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.windowTitle}>{title}</span>
      </div>
      <CodeBlock language={language} className={styles.windowCode}>
        {children}
      </CodeBlock>
    </div>
  );
}

/** What one form tag renders: an illustration of the Default theme. */
export function FormPreview({className}) {
  return (
    <div className={clsx(styles.preview, className)} aria-hidden="true">
      <div className={styles.previewSteps}>
        <span className={styles.stepDone}>1 · You</span>
        <span className={styles.stepNow}>2 · Your message</span>
        <span>3 · Review</span>
      </div>
      <div className={styles.previewRow}>
        <label>
          First name
          <span className={styles.input}>Ada</span>
        </label>
        <label>
          Last name
          <span className={styles.input}>Lovelace</span>
        </label>
      </div>
      <label>
        Email address
        <span className={clsx(styles.input, styles.inputError)}>ada@</span>
        <small className={styles.error}>Please enter a valid email address.</small>
      </label>
      <label>
        Message
        <span className={clsx(styles.input, styles.textarea)}>I'd like to talk about the Analytical Engine…</span>
      </label>
      <div className={styles.previewNav}>
        <span className={styles.ghost}>Back</span>
        <span className={styles.submit}>Next</span>
      </div>
    </div>
  );
}

export function FeatureGrid({children, columns = 3}) {
  return <div className={clsx(styles.features, styles[`cols${columns}`])}>{children}</div>;
}

export function Feature({icon, title, to, children}) {
  const body = (
    <>
      {icon && <span className={styles.featureIcon}>{icon}</span>}
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureBody}>{children}</p>
    </>
  );

  return to ? (
    <Link to={to} className={clsx(styles.feature, styles.featureLink)}>
      {body}
    </Link>
  ) : (
    <div className={styles.feature}>{body}</div>
  );
}
