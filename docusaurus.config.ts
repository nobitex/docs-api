import {themes as prismThemes} from 'prism-react-renderer'
import type {Config} from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'
import type * as Plugin from '@docusaurus/types/src/plugin'
import type * as OpenApiPlugin from 'docusaurus-plugin-openapi-docs'

const API_SPECS = [
    {id: 'market_data', hideSendButton: false},
    {id: 'user_data', hideSendButton: false},
    {id: 'spot_trade', hideSendButton: false},
    {id: 'margin_trade', hideSendButton: false},
    {id: 'withdraw', hideSendButton: false},
    {id: 'address_book', hideSendButton: false},
    {id: 'security', hideSendButton: false},
    {id: 'referral', hideSendButton: false},
    {id: 'auth', hideSendButton: false},
    {id: 'portfolio', hideSendButton: false},
    {id: 'options', hideSendButton: false},
    {id: 'websocket', hideSendButton: true},
] as const

const docsPluginConfigs = () => {
    const DEFAULT_SIDEBAR_OPTIONS: OpenApiPlugin.Options['sidebarOptions'] = {
        groupPathsBy: 'tag',
        categoryLinkSource: 'tag',
    }

    const createApiConfig = (item: { id: string, hideSendButton: boolean }): OpenApiPlugin.Options => ({
        specPath: `openapi/${item.id}.yaml`,
        outputDir: `docs/${item.id}`,
        sidebarOptions: DEFAULT_SIDEBAR_OPTIONS,
        hideSendButton: true,
    })

    return Object.fromEntries(
        API_SPECS.map((item) => [item.id, createApiConfig(item)])
    )
}

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
        { to: '/', label: 'مستندات', position: 'left', activeBaseRegex: '^(?!/(ws|websocket|changelog|faq|general_notes|download)(/|$)).*' },
        { to: '/websocket/websocket-connection', label: 'وبسوکت', position: 'left', activeBaseRegex: 'websocket/*' },
        { to: '/changelog', label: 'سابقه‌ی تغییرات', position: 'left' },
        { to: '/faq', label: 'سوالات متداول', position: 'left' },
        { to: '/general_notes', label: 'ملاحظات عمومی', position: 'left' },
      ],
    },
    api: {
      theme: {
        codeSamplesLanguages: ['curl', 'python', 'go', 'javascript'],
      },
    },
    languageTabs: [
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "javascript",
        language: "nodejs",
        logoClass: "nodejs",
      },
      {
        highlight: "go",
        language: "go",
        logoClass: "go",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
      },
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
    ]
  } satisfies Preset.ThemeConfig,

  plugins: [
    './plugins/docusaurus-plugin-custom-search',
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api",
        docsPluginId: "classic",
        config: docsPluginConfigs()
      },
    ]
  ],
  themes: ["docusaurus-theme-openapi-docs"],
}

export default config
