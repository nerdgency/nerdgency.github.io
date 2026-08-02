import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHero() {
  return (
    <header className="hero" style={{ padding: '4rem 0 2rem' }}>
      <div className="container tw-flex tw-flex-col tw-max-w-xl tw-space-y-32 tw-bg-white">
        <Heading as="h1" className="hero__title">
          Nerdgency Docs
        </Heading>
        <p className="hero__subtitle">
          Build secure and customizable forms fast with a visual drag‑and‑drop designer, advanced conditional logic, secure
          submission handling, and first-class integrations for your ExpressionEngine site.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link className="button button--primary button--lg" to="/docs/formidable">
            Get started with Formidable
          </Link>
          <Link className="button button--secondary button--lg" to="https://github.com/nerdgency">
            View on GitHub
          </Link>
        </div>
        
        <div>
          Made by Nerdgency for ExpressionEngine
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Documentation for ExpressionEngine addons built by Nerdgency."
    >
      <HomepageHero />
      <main className="container" style={{ paddingBottom: '3rem' }}>
        <hr />
        <Heading as="h2">Addons</Heading>
        <div className="nerdgency-grid">
          <Link className="nerdgency-card" to="/docs/formidable">
            <div className="nerdgency-badge">Available</div>
            <h3>Formidable</h3>
            <p>
              Build ExpressionEngine forms from template markup or the
              control panel: fields, conditional logic, workflows, and
              third-party connections.
            </p>
          </Link>
          <div className="nerdgency-card nerdgency-card--placeholder">
            <div className="nerdgency-badge">Coming soon</div>
            <h3>Next addon</h3>
            <p>
              Documentation for future Nerdgency addons will show up here
              as they&apos;re released.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
