import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Eyebrow, Section, CodeWindow, FormPreview, FeatureGrid, Feature} from '@site/src/components/Marketing';
import {icons} from '@site/src/components/Marketing/icons';
import {store} from '@site/src/data/store';
import styles from './formidable.module.css';

const layers = [
  {
    step: '01',
    title: 'One tag',
    body: 'The whole form, from your theme: fields, pages, errors, success, buttons.',
    code: `{exp:formidable:form form_handle="contact"}`,
  },
  {
    step: '02',
    title: 'Your form element',
    body: 'Write the <form> and its layout. Formidable fills in the fields.',
    code: `<form {form_attributes}>
    {form_meta}
    {fields}{field_template}{/fields}
</form>`,
  },
  {
    step: '03',
    title: 'Your field markup',
    body: 'Every label, input and error by hand. Values, ids and ARIA are still handled.',
    code: `{fields}
    <label for="{field_handle}">{field_name}</label>
    <input {field_attributes}>
{/fields}`,
  },
  {
    step: '04',
    title: 'Your whole form',
    body: 'Already wrote it? Capture it. Your markup stays exactly as it is.',
    code: `{exp:formidable:capture form_handle="contact"}
    <form method="post">…</form>
{/exp:formidable:capture}`,
  },
];

const providers = ['Mailchimp', 'HubSpot', 'Salesforce', 'Campaign Monitor', 'Constant Contact', 'Dotdigital', 'Mailjet', 'Webhooks'];

export default function Formidable() {
  return (
    <Layout
      title="Formidable · forms for ExpressionEngine"
      description="Formidable is a forms add-on for ExpressionEngine 7.5+: a visual builder, themes you change one part at a time, submissions, workflows and a JSON API.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <img src="/img/icons/formidable.svg" alt="" width="72" height="72" className={styles.logo} />
          <Eyebrow>Formidable for ExpressionEngine</Eyebrow>
          <h1 className={styles.title}>
            Forms that <em>respect</em> your markup.
          </h1>
          <p className={styles.lede}>
            Build a form in the control panel and render it with one tag. Then take over as much of the markup as you
            like, one layer at a time. Validation, spam protection, storage and workflows keep working underneath.
          </p>
          <div className={styles.actions}>
            <Link className="button button--primary button--lg" href={store.formidable.url}>
              Buy Formidable · {store.formidable.price}
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/formidable">
              Read the docs
            </Link>
          </div>
          <p className={styles.reqs}>
            <span>ExpressionEngine 7.5+</span>
            <span>PHP 8.2+</span>
            <span>Version 1.1</span>
          </p>
          <p className={styles.store}>
            Sold and downloaded through the <a href={store.formidable.url}>ExpressionEngine add-on store</a>.
          </p>
        </div>

        <div className={styles.showcase}>
          <CodeWindow title="contact.group/index.html">{`{exp:formidable:form
    form_handle="contact"
    return="contact/thanks"
}`}</CodeWindow>
          <FormPreview className={styles.showcasePreview} />
        </div>
      </header>

      <Section
        eyebrow="Everything a form needs"
        title="The plumbing, done properly."
        lede="Formidable handles everything between the Submit button and your inbox, so your templates can be about design.">
        <FeatureGrid columns={3}>
          <Feature icon={icons.formBuilder} title="A visual builder" to="/docs/formidable/building-forms/forms">
            Pages, sections and a grid. Drag fields in, resize them, and read every condition as a sentence.
          </Feature>
          <Feature icon={icons.multiPage} title="Conditions and pages" to="/docs/formidable/building-forms/conditions">
            Show, hide or require fields and skip whole pages, in the browser and again on the server.
          </Feature>
          <Feature icon={icons.repeat} title="Repeating sections" to="/docs/formidable/building-forms/repeating-sections">
            "Add another" rows for dependants or line items, with sums and counts across them.
          </Feature>
          <Feature icon={icons.reports} title="Submissions to work with" to="/docs/formidable/submissions/managing-submissions">
            Filters, saved views, statuses, encryption at rest, and exports to CSV, JSON, XML or text.
          </Feature>
          <Feature icon={icons.save} title="Save and resume" to="/docs/formidable/submissions/save-and-resume">
            Long forms saved part-way, finished on any device, with a reminder for anyone who wanders off.
          </Feature>
          <Feature icon={icons.security} title="Secure by default" to="/docs/formidable/submissions/spam-and-security">
            Signed form data, CSRF, honeypots and rate limits on day one. Turnstile and hCaptcha when you want them.
          </Feature>
        </FeatureGrid>
      </Section>

      <Section
        tone="raised"
        eyebrow="Your markup, your way"
        title="Take over one layer at a time."
        lede="Every step keeps everything from the step before it that you didn't replace. Stop wherever the theme stops suiting you.">
        <ol className={styles.layers}>
          {layers.map((layer) => (
            <li key={layer.step} className={styles.layer}>
              <div className={styles.layerCopy}>
                <span className={styles.layerStep}>{layer.step}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </div>
              <CodeWindow title="template" className={styles.layerCode}>
                {layer.code}
              </CodeWindow>
            </li>
          ))}
        </ol>
        <p className={styles.more}>
          <Link to="/docs/formidable/displaying-forms/rendering">See every layer in the docs →</Link>
        </p>
      </Section>

      <Section
        tone="ink"
        eyebrow="After the submit"
        title="Workflows that tell you what happened."
        lede="Send email, call a signed webhook or push to your CRM, each with its own conditions. Every run is logged with what it sent and what came back, and one click runs it again.">
        <div className={styles.workflows}>
          <ul className={styles.providers}>
            {providers.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <div className={styles.runlog} aria-hidden="true">
            <div className={styles.run}>
              <span className={styles.ok}>Succeeded</span>
              <b>Email the team</b>
              <small>142 ms · just now</small>
            </div>
            <div className={styles.run}>
              <span className={styles.ok}>Succeeded</span>
              <b>Add to Mailchimp</b>
              <small>388 ms · just now</small>
            </div>
            <div className={styles.run}>
              <span className={styles.queued}>Queued</span>
              <b>Post to CRM webhook</b>
              <small>retrying in 1 min</small>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="For developers"
        title="Headless when you need it. Extensible always."
        lede="A JSON API with the same validation as a posted form, eighteen extension hooks, your own fieldtypes and providers, and every command runnable from cron or the control panel.">
        <div className={styles.dev}>
          <CodeWindow title="ext.my_addon.php" language="php">{`public function formidable_workflow_email(array $message, $workflow): array
{
    $message['bcc'][] = 'archive@example.com';

    return $message;
}`}</CodeWindow>
          <FeatureGrid columns={2}>
            <Feature icon={icons.api} title="JSON API" to="/docs/formidable/headless/json-api">
              Read forms and submissions, and submit, from any front end.
            </Feature>
            <Feature icon={icons.workflows} title="Extension hooks" to="/docs/formidable/extending/hooks">
              Change values, validation, emails and payloads from your add-on.
            </Feature>
            <Feature icon={icons.connections} title="Your own providers" to="/docs/formidable/extending/custom-connections">
              Teach workflows a new service in one PHP class.
            </Feature>
            <Feature icon={icons.queue} title="Commands and queues" to="/docs/formidable/reference/command-line">
              Background workflows with retries, and a dozen commands.
            </Feature>
          </FeatureGrid>
        </div>
      </Section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>Your first form is five minutes away.</h2>
          <p>
            Get Formidable from the ExpressionEngine add-on store, build a contact form, and put it on a page with one
            tag.
          </p>
          <div className={styles.actions}>
            <Link className="button button--amber button--lg" href={store.formidable.url}>
              Get Formidable · {store.formidable.price}
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/formidable/getting-started/your-first-form">
              Build your first form
            </Link>
            <Link className="button button--secondary button--lg" to="/blog/introducing-formidable-1-0">
              Read the announcement
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
