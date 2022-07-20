// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Jest Preview',
  tagline: 'Debug your Jest tests. Effortlessly. 🛠🖼',
  url: 'https://www.jest-preview.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'nvh95', // Usually your GitHub org/user name.
  projectName: 'jest-preview', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/nvh95/jest-preview/edit/main/website/',
          sidebarCollapsed: false,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/nvh95/jest-preview/edit/main/website/',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        // api: {
        //   showReadingTime: true,
        //   editUrl: 'https://github.com/nvh95/jest-preview/edit/main/docs/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-PLWSH8YMX7',
        },
        googleAnalytics: {
          trackingID: 'UA-116900824-3',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Jest Preview',
        logo: {
          alt: 'Jest Preview Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'getting-started/intro',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/docs/api/debug', label: 'API', position: 'left' },
          {
            href: 'https://stackblitz.com/edit/jest-preview?file=README.md',
            label: 'Demo',
            position: 'left',
          },
          // TODO: To add as a blog
          // { to: '/contributors', label: 'Contributors', position: 'left' },
          {
            href: 'https://forms.gle/PJFH5oEzi7gsb7Ac6',
            label: 'Feedback',
            position: 'right',
          },
          {
            href: 'https://github.com/nvh95/jest-preview',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.npmjs.com/package/jest-preview',
            label: 'npm',
            position: 'right',
          },
          {
            href: 'https://discord.gg/z4DRBmk7vx',
            label: 'Discord',
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
                label: 'Tutorial',
                to: '/docs/getting-started/intro',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              // },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              {
                label: 'Twitter',
                href: 'https://twitter.com/JestPreview',
              },
              {
                label: `Hung's Twitter`,
                href: 'https://twitter.com/hung_dev',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/z4DRBmk7vx',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/nvh95/jest-preview',
              },

              {
                html: `<a href="https://www.netlify.com"> <img src="https://www.netlify.com/v3/img/components/netlify-color-bg.svg" alt="Deploys by Netlify" /> </a>`,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hung Viet Nguyen. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      image: 'img/social_image.png',
      algolia: {
        appId: 'GUSGTGYGR2',
        apiKey: 'cf3e55e458b395eb8d21c2be25cef7f0',
        indexName: 'jest-preview',
      },
    }),
};

module.exports = config;
