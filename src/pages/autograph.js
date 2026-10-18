import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Eyebrow, Section, CodeWindow, FeatureGrid, Feature} from '@site/src/components/Marketing';
import {store} from '@site/src/data/store';
import page from './formidable.module.css';
import styles from './autograph.module.css';

// Autograph's current docs (2.x). See DOCS-NOTES.md, Versions.
const docs = (path = '') => `/docs/autograph${path}`;

/** A signature, drawn as the pad would show it. */
function Signature({className}) {
  return (
    <svg className={className} viewBox="0 0 230 90" aria-hidden="true">
      <path
        d="M14,62 C24,30 36,18 42,26 C48,34 32,70 44,70 C56,70 60,40 70,44 C80,48 72,64 84,62 C96,60 100,40 112,42 C124,44 118,62 132,60 C150,58 160,38 176,40 C188,42 196,52 214,46"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An illustration of the pad in a form. */
function PadPreview() {
  return (
    <div className={styles.preview} aria-hidden="true">
      <span className={styles.previewLabel}>
        Sign to accept the waiver <b>*</b>
      </span>
      <div className={styles.pad}>
        <Signature className={styles.signature} />
        <span className={styles.signLine} />
      </div>
      <div className={styles.tools}>
        <span>Undo</span>
        <span>Clear</span>
        <span className={styles.signed}>Signed just now</span>
      </div>
    </div>
  );
}

const places = ['Channel Forms', 'Member registration', 'Member profiles', 'Grid rows', 'Fluid fields', 'The control panel'];

export default function Autograph() {
  return (
    <Layout
      title="Autograph · signatures for ExpressionEngine"
      description="Autograph is a signature fieldtype for ExpressionEngine 7: a responsive signing pad for Channel Forms, member forms, Grid and Fluid, with signatures saved in the entry or as files.">
      <header className={page.hero}>
        <div className={page.heroInner}>
          <img src="/img/icons/autograph.svg" alt="" width="72" height="72" className={page.logo} />
          <Eyebrow>Autograph for ExpressionEngine</Eyebrow>
          <h1 className={page.title}>
            Get it in <em>writing</em>.
          </h1>
          <p className={page.lede}>
            A signature field for ExpressionEngine. Visitors sign with a mouse, a finger or a stylus, in your Channel
            Forms, member forms, Grid and Fluid, and the signature is checked, kept and ready for your templates.
          </p>
          <div className={page.actions}>
            <Link className="button button--primary button--lg" href={store.autograph.url}>
              Buy Autograph · {store.autograph.price}
            </Link>
            <Link className="button button--secondary button--lg" to={docs()}>
              Read the docs
            </Link>
          </div>
          <p className={page.reqs}>
            <span>ExpressionEngine 7+</span>
            <span>PHP 8.1+</span>
            <span>Version 2.0</span>
          </p>
          <p className={page.store}>
            Sold and downloaded through the <a href={store.autograph.url}>ExpressionEngine add-on store</a>.
          </p>
        </div>

        <div className={page.showcase}>
          <CodeWindow title="waivers.group/sign.html">{`{exp:channel:form
    channel="waivers"
    return="waivers/thanks"
}
    <input name="title" value="{title}">
    {field:customer_signature}
    <button type="submit">Sign</button>
{/exp:channel:form}`}</CodeWindow>
          <PadPreview />
        </div>
      </header>

      <Section
        eyebrow="New in 2.0"
        title="The biggest release yet."
        lede="Autograph 2.0 is rebuilt for ExpressionEngine 7, and a 1.x site updates without changing a template, a stylesheet or an entry.">
        <ul className={styles.newList}>
          <li>Signatures saved as files, S3 included</li>
          <li>A responsive, high-resolution pad</li>
          <li>Grid, Fluid and member fields</li>
          <li>The date and time it was signed</li>
          <li>A JavaScript API and events</li>
          <li>Every signature checked on the server</li>
        </ul>
        <p className={page.more}>
          <Link to="/blog/introducing-autograph-2-0">Read the announcement →</Link>
        </p>
      </Section>

      <Section
        tone="raised"
        eyebrow="The pad"
        title="A signing pad that fits the page."
        lede="It fills the space it's given, keeps its shape, and draws at the screen's full resolution. The image you keep is always exactly the size you set.">
        <FeatureGrid columns={3}>
          <Feature title="Your pen" to={docs('/using-autograph/field-settings#the-pad')}>
            Color, and the thinnest and thickest stroke. Lines thin out as the pen speeds up, like real ink.
          </Feature>
          <Feature title="Your page" to={docs('/using-autograph/field-settings#the-pad')}>
            A border, a background color baked into the image, and placeholder text like "Sign here".
          </Feature>
          <Feature title="Your rules" to={docs('/using-autograph/field-settings#required-fields')}>
            Undo on or off, required with a message before the form is sent, and a maximum size.
          </Feature>
          <Feature title="Your styles" to={docs('/using-autograph/channel-forms#styling-the-pad')}>
            A small stylesheet with no specificity, so your CSS always wins. Every class is documented.
          </Feature>
          <Feature title="Accessible" to={docs('/reference/markup')}>
            A focusable, labelled pad with a visible focus ring, and a message for visitors without JavaScript.
          </Feature>
          <Feature title="Checked on the server" to={docs('/using-autograph/field-settings#what-gets-saved')}>
            Every signature is decoded and checked before it's kept. What's saved is re-encoded from that check.
          </Feature>
        </FeatureGrid>
      </Section>

      <Section
        eyebrow="Storage"
        title="In the entry, or as files."
        lede="Choose per field. Change your mind later: signatures already saved keep displaying wherever they are.">
        <div className={styles.storage}>
          <div className={styles.storageCard}>
            <h3>In the entry</h3>
            <p>The default. Nothing to set up, and the signature travels with the entry, its copies and its exports.</p>
            <code>{'{customer_signature:url}'} → data:image/png;base64,…</code>
          </div>
          <div className={styles.storageCard}>
            <h3>As a file</h3>
            <p>
              A PNG in any upload directory or subfolder, S3 included, in the file manager like any upload. Ordinary
              links, so it shows up in emails and PDFs.
            </p>
            <code>{'{customer_signature:url}'} → …/signature_waiver_3f9a.png</code>
          </div>
        </div>
        <p className={page.more}>
          <Link to={docs('/using-autograph/storage')}>How storage works →</Link>
        </p>
      </Section>

      <Section
        tone="ink"
        eyebrow="Everywhere"
        title="Wherever somebody needs to sign."
        lede="One fieldtype, in every place ExpressionEngine collects content. No template changes: output the field, and the pad and its scripts are there.">
        <ul className={styles.places}>
          {places.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <div className={styles.tags}>
          <CodeWindow title="waivers.group/entry.html">{`{if customer_signature}
    {customer_signature alt="Signature of {title}"}
    <p>Signed {customer_signature:signed_at format="%F %j, %Y"}</p>
{/if}`}</CodeWindow>
        </div>
      </Section>

      <Section
        eyebrow="For developers"
        title="A pad you can script."
        lede="Every pad has an API on its element and fires events as it's used. Storage is pluggable from your own add-on.">
        <div className={page.dev}>
          <CodeWindow title="assets/js/waiver.js" language="js">{`document.addEventListener('autograph:changed', (event) => {
    send.disabled = event.detail.autograph.isEmpty();
});

// A form loaded later:
Autograph.initAll(container);`}</CodeWindow>
          <FeatureGrid columns={2}>
            <Feature title="JavaScript API" to={docs('/reference/javascript')}>
              Clear, undo, disable, or read the signature from your own scripts.
            </Feature>
            <Feature title="Events" to={docs('/reference/javascript#events')}>
              Ready, changed, cleared and error, bubbling from each pad.
            </Feature>
            <Feature title="Template tags" to={docs('/reference/template-tags')}>
              The image, its URL, its file, and when it was signed.
            </Feature>
            <Feature title="Storage hook" to={docs('/reference/hooks')}>
              Add your own storage method in one PHP class.
            </Feature>
          </FeatureGrid>
        </div>
      </Section>

      <section className={page.cta}>
        <div className={page.ctaInner}>
          <h2>Somebody needs to sign something.</h2>
          <p>Get Autograph from the ExpressionEngine add-on store, add the field to a form, and you're done.</p>
          <div className={page.actions}>
            <Link className="button button--amber button--lg" href={store.autograph.url}>
              Get Autograph
            </Link>
            <Link className="button button--secondary button--lg" to={docs('/getting-started/installation')}>
              Installation
            </Link>
            <Link className="button button--secondary button--lg" to={docs('/prologue/upgrade-guide')}>
              Upgrading from 1.x
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
