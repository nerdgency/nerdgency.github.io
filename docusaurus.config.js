// @ts-check
import prismNerdgency from './src/theme/prism-nerdgency.js';

const siteUrl = 'https://nerdgency.github.io';
const siteRepo = 'https://github.com/nerdgency/nerdgency.github.io';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Nerdgency Docs',
    tagline: 'Documentation for Formidable and other ExpressionEngine add-ons by Nerdgency',
    favicon: 'img/favicon.png',

    url: siteUrl,
    baseUrl: '/',

    organizationName: 'nerdgency',
    projectName: 'nerdgency.github.io',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',

    plugins: [
        './src/plugins/tailwind-plugin.js',
        [
            // Autograph's docs are their own instance so they can be
            // versioned (a version picker, 1.x and 2.x) without
            // snapshotting Formidable's. URLs stay under /docs/autograph.
            '@docusaurus/plugin-content-docs',
            {
                id: 'autograph',
                path: 'docs-autograph',
                routeBasePath: 'docs/autograph',
                sidebarPath: './sidebars-autograph.js',
                editUrl: `${siteRepo}/edit/main/`,
                showLastUpdateTime: false,
                // docs-autograph/ is 2.x, the released version, at
                // /docs/autograph. 1.x is a snapshot at /docs/autograph/v1.
                // When work on 3.0 starts: `npx docusaurus
                // docs:version:autograph 2.x`, set lastVersion to '2.x', and
                // give current the label 3.x, path 'next' and the
                // 'unreleased' banner.
                lastVersion: 'current',
                versions: {
                    current: {label: '2.x'},
                    // A path without a dot: "/1.x" reads as a file with a .x extension,
                    // so static hosts don't serve 1.x.html for it.
                    '1.x': {label: '1.x', path: 'v1', banner: 'unmaintained'},
                },
            },
        ],
        [
            '@docusaurus/plugin-ideal-image',
            {
                quality: 80,
                max: 1600, // screenshots are captured at 2x; this keeps them sharp
                min: 640,
                steps: 3,
                disableInDev: false,
            },
        ],
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                hashed: true,
                language: ['en'],
                // Must match the docs plugins' routeBasePath and path, or
                // every search result links to a page that does not exist.
                docsRouteBasePath: ['docs', 'docs/autograph'],
                docsDir: ['docs', 'docs-autograph'],
                blogRouteBasePath: 'blog',
                indexDocs: true,
                indexBlog: true,
                indexPages: true,
                highlightSearchTermsOnTargetPage: true,
            },
        ],
    ],

    markdown: {
        hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'},
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    headTags: [
        {tagName: 'link', attributes: {rel: 'apple-touch-icon', href: '/img/apple-touch-icon.png'}},
        {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'}},
        {tagName: 'link', attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}},
        {
            tagName: 'script',
            attributes: {type: 'application/ld+json'},
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Nerdgency',
                url: siteUrl,
                logo: `${siteUrl}/img/logos/grey-n-logo.png`,
                sameAs: ['https://github.com/nerdgency'],
            }),
        },
    ],

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    editUrl: `${siteRepo}/edit/main/`,
                    showLastUpdateTime: false,
                },
                blog: {
                    path: 'blog',
                    routeBasePath: 'blog',
                    blogTitle: 'Nerdgency blog',
                    blogDescription: 'Release announcements and notes on the Nerdgency ExpressionEngine add-ons.',
                    blogSidebarTitle: 'Recent posts',
                    blogSidebarCount: 10,
                    postsPerPage: 10,
                    showReadingTime: true,
                    authorsMapPath: 'authors.yml',
                    onInlineAuthors: 'throw',
                    onUntruncatedBlogPosts: 'throw',
                    feedOptions: {
                        type: ['rss', 'atom'],
                        title: 'Nerdgency blog',
                        description: 'Release announcements for the Nerdgency ExpressionEngine add-ons.',
                        copyright: `Copyright © ${new Date().getFullYear()} Nerdgency.`,
                    },
                    editUrl: `${siteRepo}/edit/main/`,
                },
                theme: {customCss: './src/css/custom.css'},
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/search'],
                },
            }),
        ],
    ],

    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    themeConfig: {
        image: 'img/social/nerdgency-docs.png',
        metadata: [
            {name: 'keywords', content: 'ExpressionEngine, add-on, forms, Formidable, signatures, Autograph, Nerdgency'},
            {name: 'twitter:card', content: 'summary_large_image'},
        ],
        docs: {
            sidebar: {
                // No collapse control: the sidebar is part of the page's
                // shape, as in Laravel's docs.
                hideable: false,
                autoCollapseCategories: false,
            },
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 3,
        },
        navbar: {
            title: 'nerdgency',
            hideOnScroll: false,
            items: [
                {
                    type: 'dropdown',
                    label: 'Products',
                    position: 'left',
                    items: [
                        {to: '/formidable', label: 'Formidable · forms for ExpressionEngine'},
                        {to: '/autograph', label: 'Autograph · signatures for ExpressionEngine'},
                    ],
                },
                {
                    type: 'dropdown',
                    label: 'Docs',
                    position: 'left',
                    items: [
                        {type: 'docSidebar', sidebarId: 'formidableSidebar', label: 'Formidable'},
                        {type: 'docSidebar', sidebarId: 'autographSidebar', docsPluginId: 'autograph', label: 'Autograph'},
                    ],
                },
                {to: '/blog', label: 'Blog', position: 'left'},
                // Shown only on Autograph's pages; see
                // src/theme/NavbarItem/DocsVersionDropdownNavbarItem.js.
                {type: 'docsVersionDropdown', docsPluginId: 'autograph', position: 'right'},
                {
                    href: 'https://github.com/nerdgency',
                    position: 'right',
                    className: 'navbar-github-link',
                    'aria-label': 'Nerdgency on GitHub',
                },
            ],
        },
        // The footer is src/theme/Footer; this only keeps the copyright for feeds.
        footer: {
            copyright: `Copyright © ${new Date().getFullYear()} Nerdgency.`,
        },
        prism: {
            // One ink theme for both modes: code blocks are always dark
            // panels (src/css/theme/base.css).
            theme: prismNerdgency,
            darkTheme: prismNerdgency,
            additionalLanguages: ['php', 'bash', 'json'],
        },
    },
};

export default config;
