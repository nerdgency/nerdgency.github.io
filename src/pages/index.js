import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Wordmark from '@site/src/components/Wordmark';
import Card from '@site/src/components/Card';
import Hero from '@site/src/components/Hero'

export default function Home() {
  return (
    <Layout 
        title="Home" 
        description="Documentation for ExpressionEngine addons built by Nerdgency.">

        <Hero 
            spacing="large" 
            title={ <>Welcome to the <Wordmark /></>}
            subtitle="Making ExpressionEngine more powerful, one add-on at a time."
            actions={
            <>
                <Link className="button button--primary button--lg" to="/docs/formidable">
                Get started with Formidable
                </Link>
                <Link className="button button--secondary button--lg" to="https://github.com/nerdgency">
                View on GitHub
                </Link>
            </>
            }
            />

        <main className="container" style={{ padding: '4rem 2rem' }}>
            <Heading as="h2">Addons</Heading>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <Card href="/formidable" icon={<img src="/img/icons/formidable.svg" alt="Formidable icon" />}
                title="Formidable">
                <p>Build secure and customizable forms fast with a visual drag‑and‑drop designer, advanced conditional logic, secure
                    submission handling, and first-class integrations for your ExpressionEngine site.</p>
                </Card>

                <Card title="Autograph">
                    <p>Autograph is the ultimate signature fieldtype add-on for ExpressionEngine, perfect for seamlessly capturing signatures directly through Channel Forms.</p>
                </Card>
            </div>
        </main>
    </Layout>
  );
}
