import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Eyebrow, Section, CodeWindow, FeatureGrid, Feature} from '@site/src/components/Marketing';
import {store} from '@site/src/data/store';
import page from './formidable.module.css';
import styles from './vitesse.module.css';

const docs = (path = '') => `/docs/vitesse${path}`;

const template = `<head>
    {exp:vitesse:css files="resources/js/app.js"}
</head>
<body>
    {layout:contents}
    {exp:vitesse:js files="resources/js/app.js"}
</body>`;

const dev = `<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/resources/js/app.js"></script>`;

const build = `<link rel="stylesheet" href="/build/assets/app-K08chnnp.css">
<link rel="modulepreload" href="/build/assets/vendor-3c4d.js">
<script type="module" src="/build/assets/app-DwbmcGWY.js"></script>`;

export default function Vitesse() {
  return (
    <Layout
      title="Vitesse · Vite for ExpressionEngine"
      description="Vitesse, a free ExpressionEngine add-on, adds the files Vite builds to your templates: hot module replacement while you work, hashed and preloaded files when you publish, from the same template.">
      <header className={page.hero}>
        <div className={page.heroInner}>
          <img src="/img/icons/vitesse.svg" alt="" width="72" height="72" className={page.logo} />
          <Eyebrow>Vitesse for ExpressionEngine</Eyebrow>
          <h1 className={page.title}>
            Vite, <em>without</em> the glue.
          </h1>
          <p className={page.lede}>
            Tell a template which entry points it needs. Vitesse prints the right tags for them: from Vite's dev server
            while you work, with live updates, and from your build when you publish.
          </p>
          <div className={page.actions}>
            <Link className="button button--primary button--lg" href={store.vitesse.url}>
              Download Vitesse · {store.vitesse.price}
            </Link>
            <Link className="button button--secondary button--lg" to={docs()}>
              Read the docs
            </Link>
          </div>
          <p className={page.reqs}>
            <span>ExpressionEngine 7+</span>
            <span>PHP 8.1+</span>
            <span>Vite 3+</span>
            <span>Version 1.0</span>
          </p>
          <p className={page.store}>
            Free from the <a href={store.vitesse.url}>ExpressionEngine add-on store</a>.
          </p>
        </div>

        <div className={page.showcase}>
          <CodeWindow title="_partials/layout.html">{template}</CodeWindow>
          <CodeWindow title="printed after vite build" language="html">
            {build}
          </CodeWindow>
        </div>
      </header>

      <Section
        eyebrow="Two modes, one template"
        title="It knows whether Vite is running."
        lede="A small hot file, written by your Vite config while the dev server runs, tells Vitesse where to load from. Start or stop Vite, and pages follow. Nothing to change in your templates.">
        <div className={styles.modes}>
          <div className={styles.mode}>
            <span className={styles.modeTag}>npx vite</span>
            <h3>While you work</h3>
            <p>Your source files, straight from the dev server, with Vite's client. Save a stylesheet and the page updates.</p>
            <CodeWindow title="printed" language="html" className={styles.modeCode}>
              {dev}
            </CodeWindow>
          </div>
          <div className={styles.mode}>
            <span className={styles.modeTag}>npx vite build</span>
            <h3>When you publish</h3>
            <p>The hashed files from the manifest, with the CSS your scripts import and preloads for shared chunks.</p>
            <CodeWindow title="printed" language="html" className={styles.modeCode}>
              {build}
            </CodeWindow>
          </div>
        </div>
        <p className={page.more}>
          <Link to={docs('/getting-started/setting-up-vite')}>Set up Vite for Vitesse →</Link>
        </p>
      </Section>

      <Section
        tone="raised"
        eyebrow="The details"
        title="The parts that usually bite, handled."
        lede="Vite's manifest is simple until it isn't. Vitesse gets the awkward cases right, and tells you when something's missing.">
        <FeatureGrid columns={3}>
          <Feature title="CSS your scripts import" to={docs('/using-vitesse/stylesheets-and-scripts#css-your-scripts-import')}>
            In a build, imported CSS is its own file. Vitesse includes it, and the CSS of every chunk your script imports.
          </Feature>
          <Feature title="Head and footer" to={docs('/using-vitesse/stylesheets-and-scripts')}>
            Stylesheets in the head with :css, scripts at the end with :js. Each file is printed once per page.
          </Feature>
          <Feature title="Any entry type" to={docs('/using-vitesse/stylesheets-and-scripts#entry-types')}>
            TypeScript, JSX, Vue, Sass, Less and the rest each get the right tag.
          </Feature>
          <Feature title="Images and fonts" to={docs('/using-vitesse/images-and-fonts')}>
            The URL of any file Vite processed, for your own markup, with :url.
          </Feature>
          <Feature title="Every Vite since 3" to={docs('/reference/configuration#where-files-are-found')}>
            Vite 5's .vite/manifest.json and the older manifest.json, found from your web root.
          </Feature>
          <Feature title="Problems explained" to={docs('/getting-started/troubleshooting')}>
            A missing manifest or a mistyped entry is explained in the template debugger.
          </Feature>
        </FeatureGrid>
      </Section>

      <Section
        tone="ink"
        eyebrow="Production"
        title="Ready for a CDN, a CSP and integrity."
        lede="Set it once in config.php, or per tag. Development is unaffected.">
        <div className={page.dev}>
          <CodeWindow title="system/user/config/config.php" language="php">{`$config['vitesse_base_url'] = 'https://cdn.example.com';
$config['vitesse_build_directory'] = 'build';`}</CodeWindow>
          <FeatureGrid columns={2}>
            <Feature title="A CDN" to={docs('/using-vitesse/production#a-cdn')}>
              Serve built files from another host with one setting.
            </Feature>
            <Feature title="CSP nonces" to={docs('/using-vitesse/production#a-content-security-policy')}>
              nonce= puts your nonce on every tag Vitesse prints.
            </Feature>
            <Feature title="Subresource integrity" to={docs('/using-vitesse/production#subresource-integrity')}>
              Hashes in the manifest are printed, with crossorigin.
            </Feature>
            <Feature title="Every setting" to={docs('/reference/configuration')}>
              Build directory, hot file, manifest, preloads and more.
            </Feature>
          </FeatureGrid>
        </div>
      </Section>

      <section className={page.cta}>
        <div className={page.ctaInner}>
          <h2>Your next build is a tag away.</h2>
          <p>Download Vitesse, add a few lines to vite.config.js, and put one tag in your layout.</p>
          <div className={page.actions}>
            <Link className="button button--amber button--lg" href={store.vitesse.url}>
              Download Vitesse
            </Link>
            <Link className="button button--secondary button--lg" to={docs('/getting-started/setting-up-vite')}>
              Set up Vite
            </Link>
            <Link className="button button--secondary button--lg" to="/blog/introducing-vitesse-1-0">
              Read the announcement
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
