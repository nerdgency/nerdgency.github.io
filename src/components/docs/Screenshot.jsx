import React from 'react';
import Image from '@theme/IdealImage';
import styles from './styles.module.css';

/**
 * A real screenshot of the control panel.
 *
 *   <Screenshot
 *     img={require('./img/forms-listing.png')}
 *     alt="The Forms listing, showing two forms and their submission counts"
 *     caption="Formidable › Forms"
 *     captured="Formidable 0.9.5 on ExpressionEngine 7.5.26, demo data"
 *   />
 *
 * `captured` is required: every screenshot says what it was taken from.
 * Mockups do not go through this component.
 */
export default function Screenshot({img, alt, caption, captured}) {
  if (!alt) throw new Error('[docs] <Screenshot> needs alt text.');
  if (!captured) throw new Error('[docs] <Screenshot> needs captured= saying what it was taken from.');
  return (
    <figure className={styles.screenshot}>
      <div className={styles.screenshotFrame}>
        <Image img={img} alt={alt} />
      </div>
      <figcaption>
        {caption}
        {caption ? ' · ' : ''}Screenshot: {captured}
      </figcaption>
    </figure>
  );
}
