import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs';

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
  projectName: 'nobitex-docs-api',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          routeBasePath: '/',
          editUrl:
            'https://github.com/nobitex/docs-api/',
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/nobitex-social.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: 'J94PZFE7PE', //todo: change
      apiKey: '3b5d958be02dbae4275deb43ee0382ce', //todo: change
      indexName: 'nobitex docs',
      contextualSearch: true,
      placeholder: 'جستجو',
    },
    metadata: [
      {
        name: 'algolia-site-verification',
        content: '2A56AF10726B9883' //todo: change
      }
      // },
    ],
    navbar: {
      logo: {
        alt: 'Nobitex Logo',
        src: 'img/logo-light.svg', // logo for light mode
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        { href: 'https://github.com/nobitex/docs-api', label: 'GitHub', position: 'right' },
        { to: '/', label: 'مستندات', position: 'left' },
        { to: '/changelog', label: 'سابقه‌ی تغییرات', position: 'left' },
      ],
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          orders: {
            specPath: "yaml/openapi1.yaml",
            outputDir: "docs/orders",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          users: {
            specPath: "yaml/openapi33.yaml",
            outputDir: "docs/users",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
