import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'مستندات API نوبیتکس',
  tagline: 'Nobitex API Documentation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://apidocs.nobitex.ir',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nobitex', // Usually your GitHub org/user name.
  projectName: 'nobitex-docs-api', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa'],
    localeConfigs: {
      fa: {
        direction: 'rtl',
        htmlLang: 'fa-IR',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          docItemComponent: "@theme/ApiItem",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/nobitex/docs-api/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/nobitex-social.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Nobitex',
        src: 'img/nobitex-logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'مستندات',
          items: [
            {
              label: 'مستندات API',
              to: '/',
            },
            {
              label: 'سابقه تغییرات',
              to: '/changelog',
            },
            {
              label: 'شرایط استفاده',
              to: '/terms',
            },
          ],
        },
        {
          title: 'منابع',
          items: [
            {
              label: 'کالکشن Postman',
              href: 'https://documenter.getpostman.com/view/5722122/Szmcayjw?version=latest',
            },
            {
              label: 'مخزن GitHub',
              href: 'https://github.com/nobitex/docs-api',
            },
          ],
        },
        {
          title: 'نوبیتکس',
          items: [
            {
              label: 'سایت نوبیتکس',
              href: 'https://nobitex.ir/',
            },
            {
              label: 'کانال تلگرام نوبیتکس',
              href: 'https://t.me/nobitexmarket',
            },
            {
              label: 'کانال تلگرام API',
              href: 'https://t.me/NobitexAPINews',
            },
          ],
        },
      ],
      copyright: `تمام حقوق برای نوبیتکس محفوظ است © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          apiDocs: {
            specPath: "docs/yaml-src/openapi33.yaml",
            outputDir: "docs/main",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
