// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

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
                // Must match the docs plugin's routeBasePath, or every search
                // result links to a page that does not exist.
                docsRouteBasePath: 'docs',
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
            {name: 'keywords', content: 'ExpressionEngine, add-on, forms, Formidable, Nerdgency'},
            {name: 'twitter:card', content: 'summary_large_image'},
        ],
        docs: {
            sidebar: {
                hideable: true,
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
            logo: {
                alt: 'Nerdgency',
                src: 'img/logos/n-logo-grey.png',
                srcDark: 'img/logos/n-logo-white.png',
                width: 30,
                height: 30,
            },
            hideOnScroll: false,
            items: [
                {
                    type: 'dropdown',
                    label: 'Formidable',
                    position: 'left',
                    items: [
                        {to: '/formidable', label: 'Overview'},
                        {type: 'docSidebar', sidebarId: 'formidableSidebar', label: 'Documentation'},
                        {to: '/docs/formidable/release/changelog', label: 'Changelog'},
                    ],
                },
                {type: 'docSidebar', sidebarId: 'formidableSidebar', label: 'Docs', position: 'left'},
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/nerdgency',
                    position: 'right',
                    className: 'navbar-github-link',
                    'aria-label': 'Nerdgency on GitHub',
                },
            ],
        },
        footer: {
            style: 'light',
            links: [
                {
                    title: 'Formidable',
                    items: [
                        {label: 'Overview', to: '/formidable'},
                        {label: 'Quick start', to: '/docs/formidable/getting-started/quick-start'},
                        {label: 'Tag reference', to: '/docs/formidable/developer/tags/form'},
                        {label: 'Changelog', to: '/docs/formidable/release/changelog'},
                    ],
                },
                {
                    title: 'Nerdgency',
                    items: [
                        {label: 'Blog', to: '/blog'},
                        {label: 'GitHub', href: 'https://github.com/nerdgency'},
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Nerdgency.`,
        },
        prism: {
            theme: prismThemes.oneLight,
            darkTheme: prismThemes.oneDark,
            additionalLanguages: ['php', 'bash', 'json'],
        },
    },
};

export default config;
