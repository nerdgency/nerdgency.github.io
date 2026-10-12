import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * A template and what it produces, framed as one figure.
 *
 *   <Example title="The smallest form">
 *
 *   ```ee title="templates/default_site/contact.group/index.html"
 *   {exp:formidable:form form_handle="contact_us"}
 *   ```
 *
 *   <Output kind="captured" from="…">…</Output>
 *
 *   </Example>
 *
 * Put the template in an ordinary fenced block with a title= filename, so
 * it keeps the theme's copy button and highlighting.
 */
export default function Example({title, caption, children}) {
  return (
    <figure className={styles.example}>
      {title && (
        <div className={styles.exampleHeader}>
          <p className={styles.exampleTitle}>{title}</p>
          <span className={clsx(styles.label, styles.labelTemplate)}>Example</span>
        </div>
      )}
      <div className={styles.exampleBody}>{children}</div>
      {caption && <figcaption className={styles.exampleCaption}>{caption}</figcaption>}
    </figure>
  );
}
