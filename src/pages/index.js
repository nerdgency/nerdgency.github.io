import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Eyebrow, Section, CodeWindow, FormPreview, FeatureGrid, Feature} from '@site/src/components/Marketing';
import styles from './index.module.css';

const hero = `{exp:formidable:form form_handle="contact"}`;

export default function Home() {
  return (
    <Layout
      title="Add-ons for ExpressionEngine"
      description="Nerdgency makes thoughtful add-ons for ExpressionEngine, starting with Formidable: forms that respect your markup.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Eyebrow>ExpressionEngine add-ons</Eyebrow>
            <h1 className={styles.heroTitle}>
              Tools for the sites <em>you're proud of.</em>
            </h1>
            <p className={styles.heroLede}>
              Nerdgency makes add-ons for ExpressionEngine that stay out of your markup, explain themselves, and hold up
              on the sites that matter. Every one is documented to the last parameter.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/formidable">
                Meet Formidable
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/formidable">
                Read the docs
              </Link>
            </div>
          </div>
          <div className={styles.heroArt}>
            <CodeWindow title="templates/default_site/contact.group/index.html">{hero}</CodeWindow>
            <div className={styles.arrow} aria-hidden="true">
              renders
            </div>
            <FormPreview />
          </div>
        </div>
      </header>

      <Section
        eyebrow="Products"
        title="Built for ExpressionEngine, and nothing else."
        lede="Each add-on does one job thoroughly, follows ExpressionEngine's conventions, and leaves the front end to you.">
        <div className={styles.products}>
          <Link to="/formidable" className={styles.product}>
            <div className={styles.productHead}>
              <img src="/img/icons/formidable.svg" alt="" width="52" height="52" />
              <div>
                <h3>Formidable</h3>
                <p>Forms for ExpressionEngine</p>
              </div>
              <span className={styles.badge}>1.0</span>
            </div>
            <p className={styles.productBody}>
              Build forms in the control panel or keep the ones you wrote. Conditions, multi-page and repeating
              sections, submissions you can work with, workflows, and a JSON API.
            </p>
            <ul className={styles.productList}>
              <li>Visual builder, or capture your own markup</li>
              <li>Themes you change one part at a time</li>
              <li>Email, webhooks and CRM connections</li>
            </ul>
            <span className={styles.productCta}>Explore Formidable →</span>
          </Link>

          <div className={`${styles.product} ${styles.productQuiet}`}>
            <div className={styles.productHead}>
              <span className={styles.productGlyph} aria-hidden="true">✍︎</span>
              <div>
                <h3>Autograph</h3>
                <p>Signatures for Channel Forms</p>
              </div>
            </div>
            <p className={styles.productBody}>
              A signature fieldtype for ExpressionEngine, for capturing signatures directly through Channel Forms.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="ink" eyebrow="How we build" title="Three promises, in every add-on.">
        <FeatureGrid columns={3}>
          <Feature title="Your markup stays yours">
            Sensible output from a single tag, and every layer of it replaceable. Nothing is locked in a template you
            can't reach.
          </Feature>
          <Feature title="The server has the last word">
            What the browser shows is a convenience. What gets stored is decided again on the server, every time.
          </Feature>
          <Feature title="Documented to the parameter">
            The docs are checked against the source on every build, so a parameter you read about is a parameter that
            exists.
          </Feature>
        </FeatureGrid>
      </Section>

      <Section eyebrow="From the blog" title="Notes from the workshop." narrow>
        <Link to="/blog/introducing-formidable-1-0" className={styles.post}>
          <span className={styles.postMeta}>Release · Formidable</span>
          <h3>Introducing Formidable 1.0</h3>
          <p>
            Forms for ExpressionEngine that render from one tag, give way to your own markup one layer at a time, and
            decide everything again on the server.
          </p>
          <span className={styles.productCta}>Read the announcement →</span>
        </Link>
      </Section>
    </Layout>
  );
}
