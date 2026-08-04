import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Hero from '@site/src/components/Hero';
import Wordmark from '@site/src/components/Wordmark';



// Iconoir (MIT) -- https://iconoir.com. Inlined rather than pulled in as
// a dependency: nine icons on one page does not warrant a package, and
// `currentColor` lets them inherit whatever .features__icon is set to.
const icons = {
  // drag-hand-gesture
  formBuilder: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10.5L4.99591 13.1721C4.41845 13.9421 4.47127 15.0141 5.1216 15.7236L8.9055 19.8515C9.28432 20.2647 9.81826 20.5 10.3789 20.5C11.4651 20.5 13.2415 20.5 15 20.5C17.4 20.5 19 19 19 16.5C19 16.5 19 16.5 19 16.5C19 16.5 19 9.64287 19 7.92859" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8.49995C16 8.49995 16 8.37483 16 7.92852C16 5.6428 19 5.6428 19 7.92852" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8.50008C13 8.50008 13 7.91978 13 7.02715M13 6.50008C13 6.50008 13 6.804 13 7.02715M16 8.50008C16 8.50008 16 8.37496 16 7.92865C16 7.70549 16 7.25031 16 7.02715C16 4.74144 13 4.74144 13 7.02715" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8.50008C13 8.50008 13 7.91978 13 7.02715C13 4.74144 16 4.74144 16 7.02715C16 7.25031 16 7.70549 16 7.92865C16 8.37496 16 8.50008 16 8.50008" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 8.50005C10 8.50005 10 7.85719 10 6.50005C10 4.21434 13 4.21434 13 6.50005C13 6.50005 13 6.50005 13 6.50005C13 6.50005 13 6.80397 13 7.02713C13 7.91975 13 8.50005 13 8.50005" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 13.5001V6.50006C7 5.67164 7.67157 5.00006 8.5 5.00006V5.00006C9.32843 5.00006 10 5.55527 10 6.38369C10 6.42151 10 6.4603 10 6.50006C10 7.85721 10 8.50006 10 8.50006" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // frame-select
  formCapture: (
    <svg width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.9984 2H2V4.9984H4.9984V2Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.99854 3.50098H18.9987" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.5 4.99854V19.0005" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20.4978 5V19.002" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.99854 20.501H18.9987" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.9984 19H2V21.9984H4.9984V19Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.9974 2.00195H18.999V5.00035H21.9974V2.00195Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.9974 19.002H18.999V22.0004H21.9974V19.002Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9966 15.002L7.99658 8.00195L14.9966 11.002L11.9986 12.0009L10.9966 15.002Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.999 12.002L14.997 15.002L11.999 12.002Z" stroke="currentColor" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // package
  blueprints: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5.99999L20 18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1045 4 19.9999 4.89543 20 5.99999Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9V4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // network
  connections: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="2" width="7" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8.5" y="17" width="7" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="2" width="7" height="5" rx="0.6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 7V10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H15.5C16.6046 12.5 17.5 11.6046 17.5 10.5V7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 12.5V17" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // path-arrow
  workflows: (
    <svg width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 16.5V3M18 3L21.5 6.5M18 3L14.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 16.5C18 18.433 16.433 20 14.5 20C12.567 20 11 18.433 11 16.5V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 7.5C11 5.567 9.433 4 7.5 4C5.567 4 4 5.567 4 7.5V19.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // reports
  reports: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H15M9 21V16M9 21H3.6C3.26863 21 3 20.7314 3 20.4V16.6C3 16.2686 3.26863 16 3.6 16H9M15 21V9M15 21H20.4C20.7314 21 21 20.7314 21 20.4V3.6C21 3.26863 20.7314 3 20.4 3H15.6C15.2686 3 15 3.26863 15 3.6V9M15 9H9.6C9.26863 9 9 9.26863 9 9.6V16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  // multiple-pages-empty
  multiPage: (
    <svg width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2L16.5 2L21 6.5V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20.5V6.5C3 5.67157 3.67157 5 4.5 5H14.2515C14.4106 5 14.5632 5.06321 14.6757 5.17574L17.8243 8.32426C17.9368 8.43679 18 8.5894 18 8.74853V20.5C18 21.3284 17.3284 22 16.5 22H4.5C3.67157 22 3 21.3284 3 20.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 5V8.4C14 8.73137 14.2686 9 14.6 9H18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // code-brackets-square
  templates: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17L9.33334 17C8.22877 17 7.33334 16.1047 7.33334 15.0002C7.33334 14.3284 7.33334 13.6211 7.33333 13.1111C7.33333 12.5556 6 12 6 12C6 12 7.33333 11.4444 7.33334 10.8889C7.33334 10.4359 7.33334 9.70586 7.33334 8.99998C7.33334 7.89541 8.22877 7 9.33334 7L10 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 17L14.6667 17C15.7712 17 16.6667 16.1047 16.6667 15.0002C16.6667 14.3284 16.6667 13.6211 16.6667 13.1111C16.6667 12.5556 18 12 18 12C18 12 16.6667 11.4444 16.6667 10.8889C16.6667 10.4359 16.6667 9.70586 16.6667 8.99998C16.6667 7.89541 15.7712 7 14.6667 7L14 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // shield-check
  security: (
    <svg width="24" height="24" aria-hidden="true" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 11.5L11.5 14.5L16.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 18L3.13036 4.91253C3.05646 4.39524 3.39389 3.91247 3.90398 3.79912L11.5661 2.09641C11.8519 2.03291 12.1481 2.03291 12.4339 2.09641L20.096 3.79912C20.6061 3.91247 20.9435 4.39524 20.8696 4.91252L19 18C18.9293 18.495 18.5 21.5 12 21.5C5.5 21.5 5.07071 18.495 5 18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function HomepageFeatures()
{
  return (
    <section className="container features__container" style={{ padding: '4rem 2rem 2rem' }}>
      <Heading as="h2">Features</Heading>
      <div className="features grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="features__card">
          <div className="features__icon">{icons.formBuilder}</div>
          <Heading as="h3">Form Builder</Heading>
          <p>Drag fields onto a four-column grid, gather them into groups, and set the conditions that decide when each one appears.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.formCapture}</div>
          <Heading as="h3">Form Capture</Heading>
          <p>Already have a form in your templates? Capture it where it stands and start collecting submissions without rebuilding it.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.blueprints}</div>
          <Heading as="h3">Blueprints</Heading>
          <p>Pre-configured common forms to get you building faster.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.connections}</div>
          <Heading as="h3">Connections</Heading>
          <p>Send submissions on to Mailchimp, HubSpot, Salesforce, Campaign Monitor and more, without writing the integration yourself.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.workflows}</div>
          <Heading as="h3">Workflows</Heading>
          <p>Decide what happens after a submit — send an email, call a webhook, push to a connection — each with its own conditions.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.reports}</div>
          <Heading as="h3">Reports</Heading>
          <p>Review and search every submission in the control panel, track progress with custom statuses, and export to CSV.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.multiPage}</div>
          <Heading as="h3">Multi-page Forms</Heading>
          <p>Split a long form across pages. Visitors step through one at a time, and each page is checked before the next.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.templates}</div>
          <Heading as="h3">Templates</Heading>
          <p>Every wrapper, label and input is yours to shape. Start from Bootstrap, Tailwind, Material, plain HTML — or take full control.</p>
        </div>
        <div className="features__card">
          <div className="features__icon">{icons.security}</div>
          <Heading as="h3">Security</Heading>
          <p>Signed payloads, CSRF protection, honeypots and Cloudflare Turnstile — on by default, not bolted on later.</p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Documentation for ExpressionEngine addons built by Nerdgency."
    >
      <Hero
        icon="/img/icons/formidable.svg"
        title="Formidable"
        subtitle={
          <em>
            [adj.] of great strength; forceful; powerful.
          </em>
        }
        description={
          <>
            Build secure and customizable forms fast with a visual drag-and-drop
            designer, advanced conditional logic, secure submission handling,
            and first-class integrations for your ExpressionEngine site.
          </>
        }
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
      <HomepageFeatures />
      <main className="container" style={{ paddingBottom: '3rem' }}>
        
      </main>
    </Layout>
  );
}
