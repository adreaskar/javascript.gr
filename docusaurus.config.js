// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'javascript.gr',
    tagline: 'Οδηγός για την JavaScript στα Ελληνικά',
    favicon: 'img/javascript-gr.png',

    // Set the production url of your site here
    url: 'https://javascript.gr',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'adreaskar', // Usually your GitHub org/user name.
    projectName: 'javascript.gr', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'el-GR',
        locales: ['el-GR'],
    },

    // Plugins for TailwindCSS and PostCSS.
    plugins: [
        async function myPlugin(context, options) {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer.
                    postcssOptions.plugins.push(require('tailwindcss'));
                    postcssOptions.plugins.push(require('autoprefixer'));
                    return postcssOptions;
                },
            };
        },
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'language',
                path: 'docs-language',
                routeBasePath: 'docs-language',
                sidebarPath: 'sidebars.js',
            },
        ],
        [
            '@docusaurus/plugin-content-docs',
            {
                id: 'browser',
                path: 'docs-browser',
                routeBasePath: 'docs-browser',
                sidebarPath: 'sidebars.js',
            },
        ],
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                language: ['en', 'el'],
                docsRouteBasePath: ['/docs-language', '/docs-browser'],
                hashed: true,
            },
        ],
    ],

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: false,
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     'https://github.com/adreaskar/javascript-handbook/',
                },
                blog: {
                    showReadingTime: true,
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    lastmod: 'date',
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**'],
                    filename: 'sitemap.xml',
                    createSitemapItems: async (params) => {
                        const { defaultCreateSitemapItems, ...rest } = params;
                        const items = await defaultCreateSitemapItems(rest);
                        return items.filter(
                            (item) => !item.url.includes('/page/')
                        );
                    },
                },
                gtag: {
                    trackingID: 'G-CQ5N1WZWYC',
                    anonymizeIP: true,
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'img/social-banner.png',
            metadata: [
                {
                    name: 'keywords',
                    content:
                        'javascript,programming,developer,guide,turorial,documentation,programming language,web,web development,nodejs,greek,greece,greecejs',
                },
            ],
            colorMode: {
                defaultMode: 'dark',
            },
            navbar: {
                logo: {
                    alt: 'javascript.gr logo',
                    src: 'img/javascript-gr.png',
                },
                items: [
                    {
                        label: '1. Γλώσσα',
                        to: 'docs-language/intro',
                        position: 'left',
                        docspluginid: 'language',
                    },
                    {
                        label: '2. Browser',
                        to: 'docs-browser/intro',
                        position: 'left',
                        docspluginid: 'browser',
                    },
                    {
                        to: '/useful-links',
                        label: 'Χρήσιμοι Σύνδεσμοι',
                        position: 'right',
                    },
                    {
                        to: '/info',
                        label: 'Πληροφορίες',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: '1. Γλώσσα',
                                to: '/docs-language/intro',
                            },
                            {
                                label: '2. Browser',
                                to: '/docs-browser/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'GreeceJS',
                                to: 'https://greecejs.org/',
                            },
                            {
                                label: 'Meetup',
                                to: 'https://www.meetup.com/greecejs/',
                            },
                        ],
                    },
                    {
                        title: 'Περισσότερα',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/adreaskar/javascript.gr',
                            },
                        ],
                    },
                ],
                copyright: `javascript.gr ${new Date().getFullYear()} | <a target="_blank" href="https://karabetian.dev">karabetian.dev</a>`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
