import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import {assertParam} from './source';

const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * One tag parameter in a reference page.
 *
 *   <Param tag="form" name="form_handle" required example='form_handle="contact_us"'>
 *     The handle of the form to render.
 *   </Param>
 *
 * The name is checked against the add-on source map as the page builds:
 * documenting a parameter the tag does not read fails the build.
 * Placeholder spellings (field:HANDLE:attribute:NAME) are accepted when
 * the source reads that family of parameters.
 */
export default function Param({tag, name, required, default: fallback, values, example, children}) {
  assertParam(tag, name.replace(/=$/, ''));
  const id = slug(name);
  return (
    <section className={styles.param}>
      <div className={styles.paramHead}>
        <Heading as="h3" id={id} className={styles.paramName}>
          <code>{name.endsWith('=') ? name : `${name}=`}</code>
        </Heading>
        {required && <span className={clsx(styles.chip, styles.chipRequired)}>{required === true ? 'Required' : required}</span>}
      </div>
      {(fallback !== undefined || values || example) && (
        <dl className={styles.paramMeta}>
          {fallback !== undefined && (
            <>
              <dt>Default</dt>
              <dd>{fallback === '' ? 'none' : fallback}</dd>
            </>
          )}
          {values && (
            <>
              <dt>Values</dt>
              <dd>{values}</dd>
            </>
          )}
          {example && (
            <>
              <dt>Example</dt>
              <dd><code>{example}</code></dd>
            </>
          )}
        </dl>
      )}
      {children}
    </section>
  );
}
