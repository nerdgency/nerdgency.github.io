/**
 * The site footer: an ink band with the wordmark, a line about what
 * Nerdgency makes, and the links -- replacing theme-classic's Footer so
 * it carries the brand instead of a generic link grid.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Wordmark from '@site/src/components/Wordmark';
import {store} from '@site/src/data/store';
import styles from './styles.module.css';

// One column per add-on, then Nerdgency's own. Store links and prices come
// from src/data/store.js, as on the product pages.
const product = (name, slug, extras = []) => ({
  title: name,
  links: [
    {label: 'Overview', to: `/${slug}`},
    {label: 'Documentation', to: `/docs/${slug}`},
    {label: 'Installation', to: `/docs/${slug}/getting-started/installation`},
    ...extras,
    {label: 'Changelog', to: `/docs/${slug}/prologue/changelog`},
    {
      label: store[slug].price === 'Free' ? 'Download (free)' : `Buy (${store[slug].price})`,
      href: store[slug].url,
    },
  ],
});

const columns = [
  product('Formidable', 'formidable', [{label: 'Template tags', to: '/docs/formidable/reference/tags/form'}]),
  product('Autograph', 'autograph', [{label: 'Template tags', to: '/docs/autograph/reference/template-tags'}]),
  product('Vitesse', 'vitesse', [{label: 'Setting up Vite', to: '/docs/vitesse/getting-started/setting-up-vite'}]),
  {
    title: 'Nerdgency',
    links: [
      {label: 'Blog', to: '/blog'},
      {label: 'RSS', href: '/blog/rss.xml'},
      {label: 'Report an issue', href: 'https://github.com/nerdgency/ee-addon-issues'},
      {label: 'Security', href: 'https://github.com/nerdgency/ee-addon-issues/security/policy'},
      {label: 'GitHub', href: 'https://github.com/nerdgency'},
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.mark} aria-label="Nerdgency home">
            <Wordmark />
          </Link>
          <p>
            Thoughtful add-ons for ExpressionEngine: Formidable for forms, Autograph for signatures, and Vitesse
            for Vite. Built to be read, extended and trusted on the sites you are proud of.
          </p>
        </div>
        <nav className={styles.columns} aria-label="Footer">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className={styles.title}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.base}>
        <span>© {new Date().getFullYear()} Nerdgency.</span>
        <span className={styles.braces} aria-hidden="true">{'{ }'}</span>
      </div>
    </footer>
  );
}
