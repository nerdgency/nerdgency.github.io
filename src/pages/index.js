import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Eyebrow, Section, CodeWindow, FormPreview, FeatureGrid, Feature} from '@site/src/components/Marketing';
import {store} from '@site/src/data/store';
import styles from './index.module.css';

/** A product card's last line: its price, and where the card leads. */
function ProductFoot({product, cta}) {
  const {price} = store[product];
  const free = price === 'Free';

  return (
    <div className={styles.productFoot}>
      <span className={styles.price}>
        <strong className={free ? styles.priceFree : undefined}>{price}</strong>
        <small>on the EE add-on store</small>
      </span>
      <span className={styles.productCta}>{cta}</span>
    </div>
  );
}

const hero = `{exp:formidable:form form_handle="contact"}`;

// Newest first. Thumbnails are each post's 1200px social card, a quarter
// the weight of its full hero image.
const posts = [
  {
    to: '/blog/introducing-vitesse-1-0',
    meta: 'Release · Vitesse · 18 October 2026',
    title: 'Introducing Vitesse: Vite for ExpressionEngine',
    body: "Vite's dev server while you work, its hashed and preloaded build when you publish, from the same template. Free.",
    image: '/img/blog/vitesse-1-0-social.png',
  },
  {
    to: '/blog/introducing-autograph-2-0',
    meta: 'Release · Autograph · 18 October 2026',
    title: 'Autograph 2.0: more signature, less money',
    body: 'Signatures as files, a responsive pad, Grid and Fluid, and a JavaScript API, now for $15.',
    image: '/img/blog/autograph-2-0-social.png',
  },
  {
    to: '/blog/introducing-formidable-1-0',
    meta: 'Release · Formidable · 14 October 2026',
    title: 'Introducing Formidable 1.0',
    body: 'Forms that render from one tag, give way to your own markup one layer at a time, and decide everything again on the server.',
    image: '/img/blog/formidable-1-0-social.png',
  },
];

export default function Home() {
  return (
    <Layout
      title="Add-ons for ExpressionEngine"
      description="Nerdgency makes thoughtful add-ons for ExpressionEngine: Formidable for forms, Autograph for signatures, and Vitesse, free, for Vite.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link to="/blog/introducing-vitesse-1-0" className={styles.announce}>
              <span className={styles.announceTag}>New</span>
              Vitesse 1.0 brings Vite to ExpressionEngine, free →
            </Link>
            <Eyebrow>ExpressionEngine add-ons</Eyebrow>
            <h1 className={styles.heroTitle}>
              Tools for the sites <em>you're proud of.</em>
            </h1>
            <p className={styles.heroLede}>
              Nerdgency makes add-ons for ExpressionEngine that stay out of your markup, explain themselves, and hold up
              on the sites that matter. Every one is documented to the last parameter.
            </p>
            <div className={styles.heroActions}>
              {/* A plain link: an in-page anchor needs no routing, and
                  Docusaurus's anchor check only knows the anchors it made. */}
              <a className="button button--primary button--lg" href="#products">
                Browse the add-ons
              </a>
              <Link className="button button--secondary button--lg" to="/formidable">
                Meet Formidable
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
        id="products"
        eyebrow="Products"
        title="Built for ExpressionEngine, and nothing else."
        lede="Forms, signatures and Vite. Each add-on does one job thoroughly, follows ExpressionEngine's conventions, and leaves the front end to you.">
        <div className={styles.products}>
          <Link to="/formidable" className={styles.product}>
            <div className={styles.productHead}>
              <img src="/img/icons/formidable.svg" alt="" width="52" height="52" />
              <div>
                <h3>Formidable</h3>
                <p>Forms for ExpressionEngine</p>
              </div>
              <span className={styles.badge}>1.1</span>
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
            <ProductFoot product="formidable" cta="Explore Formidable →" />
          </Link>

          <div className={styles.productStack}>
          <Link to="/autograph" className={`${styles.product} ${styles.productQuiet}`}>
            <div className={styles.productHead}>
              <img src="/img/icons/autograph.svg" alt="" width="52" height="52" />
              <div>
                <h3>Autograph</h3>
                <p>Signatures for Channel Forms</p>
              </div>
              <span className={styles.badge}>2.0</span>
            </div>
            <p className={styles.productBody}>
              A signature fieldtype for ExpressionEngine, for capturing signatures directly through Channel Forms.
            </p>
            <ProductFoot product="autograph" cta="Explore Autograph →" />
          </Link>

          <Link to="/vitesse" className={`${styles.product} ${styles.productQuiet}`}>
            <div className={styles.productHead}>
              <img src="/img/icons/vitesse.svg" alt="" width="52" height="52" />
              <div>
                <h3>Vitesse</h3>
                <p>Vite for ExpressionEngine</p>
              </div>
              <span className={styles.badge}>1.0</span>
            </div>
            <p className={styles.productBody}>
              Vite's dev server while you work, and its hashed, preloaded build when you publish, from one template tag.
            </p>
            <ProductFoot product="vitesse" cta="Explore Vitesse →" />
          </Link>
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

      <Section eyebrow="From the blog" title="Notes from the workshop.">
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.to} to={post.to} className={styles.post}>
              <img src={post.image} alt="" className={styles.postImage} loading="lazy" />
              <span className={styles.postMeta}>{post.meta}</span>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <span className={styles.productCta}>Read the post →</span>
            </Link>
          ))}
        </div>
        <p className={styles.allPosts}>
          <Link to="/blog">All posts →</Link>
        </p>
      </Section>
    </Layout>
  );
}
