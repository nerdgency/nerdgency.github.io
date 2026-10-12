/**
 * The site footer: an ink band with the wordmark, a line about what
 * Nerdgency makes, and the links -- replacing theme-classic's Footer so
 * it carries the brand instead of a generic link grid.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import Wordmark from '@site/src/components/Wordmark';
import styles from './styles.module.css';

const columns = [
  {
    title: 'Formidable',
    links: [
      {label: 'Overview', to: '/formidable'},
      {label: 'Installation', to: '/docs/formidable/getting-started/installation'},
      {label: 'Your first form', to: '/docs/formidable/getting-started/your-first-form'},
      {label: 'Template tags', to: '/docs/formidable/reference/tags/form'},
      {label: 'Release notes', to: '/docs/formidable/prologue/release-notes'},
    ],
  },
  {
    title: 'Learn',
    links: [
      {label: 'Documentation', to: '/docs/formidable'},
      {label: 'JSON API', to: '/docs/formidable/headless/json-api'},
      {label: 'Extension hooks', to: '/docs/formidable/extending/hooks'},
      {label: 'Troubleshooting', to: '/docs/formidable/getting-started/troubleshooting'},
    ],
  },
  {
    title: 'Nerdgency',
    links: [
      {label: 'Blog', to: '/blog'},
      {label: 'RSS', href: '/blog/rss.xml'},
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
            Thoughtful add-ons for ExpressionEngine, built to be read, extended and trusted on the sites
            you are proud of.
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
