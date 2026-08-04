// @ts-check
//import { themes as prismThemes } from 'prism-react-renderer';

//const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Nerdgency Docs',
    tagline: 'Documentation for Formidable and other ExpressionEngine addons',
    favicon: 'img/favicon.ico',

    url: 'https://nerdgency.github.io',
    baseUrl: '/',

    organizationName: 'nerdgency',
    projectName: 'nerdgency.github.io',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    
    plugins: [
        "./src/plugins/tailwind-plugin.js",
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
              hashed: true,
              language: ["en"],
              docsRouteBasePath: "/",
              indexDocs: true,
              indexBlog: false,
              indexPages: true,
            },
        ],
    ],
    
    markdown: {
        hooks: { onBrokenMarkdownLinks: 'warn' }
    },
    
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    
    headTags: [
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com',
            },
        },
        {
            tagName: 'link',
            attributes: {
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossorigin: 'anonymous',
            },
        },
    ],
    
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: { sidebarPath: './sidebars.js' },
                theme: { customCss: require.resolve('./src/css/custom.css') },
                blog: false
            }
        ]
    ],
    
    themeConfig: {
        docs: {
            sidebar: {
                hideable: false,
                autoCollapseCategories: false,
            },
        },
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false,
            respectPrefersColorScheme: true,
        },
        navbar: {
            title: 'nerdgency',
            logo: {
                alt: 'Nerdgency logo',
                src: 'img/logos/grey-n-logo.png',
                srcDark: 'img/logos/white-n-logo.png',
            },
            hideOnScroll: false,
            items: [
                {
                    type: 'dropdown',
                    label: 'Addons',
                    position: 'left',
                    items: [
                        {
                            href: '/formidable',
                            label: 'Formidable'
                        }
                    ]
                },
                {
                    type: 'dropdown',
                    label: 'Docs',
                    position: 'left',
                    items: [
                        {
                            type: 'docSidebar',
                            sidebarId: 'formidableSidebar',
                            label: 'Formidable'
                        }
                    ]
                }
            ]
        }
    }

    //themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    /*({
      image: 'img/logo.png',
      metadata: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
      ],
      navbar: {
        title: 'nerdgency',
        logo: {
          alt: 'Nerdgency logo',
          src: 'img/logo.png',
          srcDark: 'img/logo-dark.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'formidableSidebar',
            position: 'left',
            label: 'Formidable',
          },
          {
            href: 'https://github.com/nerdgency',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Formidable',
                to: '/docs/formidable/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nerdgency',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nerdgency.`,
      },
      /*prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),*/
};

export default config;