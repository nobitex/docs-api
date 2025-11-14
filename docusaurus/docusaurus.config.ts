import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const config: Config = {
  title: 'مستندات API نوبیتکس',
  tagline: 'Nobitex API Documentation',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://apidocs.nobitex.ir',
  baseUrl: '/',

  organizationName: 'nobitex',
  projectName: 'docs-api',

  onBrokenLinks: 'warn',

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
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nobitex/docs-api/tree/master/',
          remarkPlugins: [
            require('./plugins/remark-persian-headings.js'),
          ],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './plugins/docusaurus-plugin-custom-search',
  ],
  themeConfig: {
    image: 'img/nobitex-social.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Nobitex Logo',
        src: 'img/nobitex-logo.svg',
      },
      items: [
      ],
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
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
