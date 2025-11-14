import type {SidebarsConfig} from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'general-notes',
    'intro',
    {
      type: 'category',
      label: 'اطلاعات بازار و کاربری',
      items: [
        'market-data',
        'user-data',
      ],
    },
    {
      type: 'category',
      label: 'معاملات و موقعیت‌ها',
      items: [
        'market-trade',
        'position',
      ],
    },
    {
      type: 'category',
      label: 'برداشت و آدرس',
      items: [
        'withdraw',
        'address-book',
      ],
    },
    {
      type: 'category',
      label: 'ارتباطات و احراز هویت',
      items: [
        'websocket',
        'auth',
      ],
    },
    {
      type: 'category',
      label: 'سایر امکانات',
      items: [
        'portfolio',
        'security',
        'referral',
        'other',
      ],
    },
    'faq',
    'changelog',
    'terms',
  ],
}

export default sidebars
