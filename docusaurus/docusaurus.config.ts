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
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
    },
    navbar: {
      logo: {
        alt: 'Nobitex Logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        { href: 'https://github.com/nobitex/docs-api', label: 'GitHub', position: 'right' },
        {
          type: 'custom-searchNavbarItem',
          position: 'right',
        },
        { to: '/', label: 'مستندات', position: 'left', activeBaseRegex: '^(?!/(websocket|changelog|faq|general_notes|download)(/|$)).*' },
        { to: '/websocket', label: 'وبسوکت', position: 'left' },
        { to: '/changelog', label: 'سابقه‌ی تغییرات', position: 'left' },
        { to: '/faq', label: 'سوالات متداول', position: 'left' },
        { to: '/general_notes', label: 'ملاحظات عمومی', position: 'left' },
      ],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    './plugins/docusaurus-plugin-custom-search',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: {
          market_data: {
            specPath: "yaml/market_data.yaml",
            outputDir: "docs/market_data",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          user_data: {
            specPath: "yaml/user_data.yaml",
            outputDir: "docs/user_data",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          spot_trade: {
            specPath: "yaml/spot_trade.yaml",
            outputDir: "docs/spot_trade",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          margin_trade: {
            specPath: "yaml/margin_trade.yaml",
            outputDir: "docs/margin_trade",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          withdraw: {
            specPath: "yaml/withdraw.yaml",
            outputDir: "docs/withdraw",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          address_book: {
            specPath: "yaml/address_book.yaml",
            outputDir: "docs/address_book",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          security: {
            specPath: "yaml/security.yaml",
            outputDir: "docs/security",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          referral: {
            specPath: "yaml/referral.yaml",
            outputDir: "docs/referral",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          auth: {
            specPath: "yaml/auth.yaml",
            outputDir: "docs/auth",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          portfolio: {
            specPath: "yaml/portfolio.yaml",
            outputDir: "docs/portfolio",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          options: {
            specPath: "yaml/options.yaml",
            outputDir: "docs/options",
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
