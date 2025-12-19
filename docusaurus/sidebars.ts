import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
// @ts-ignore
import market_data from './docs/market_data/sidebar.ts';
// @ts-ignore
import user_data from './docs/user_data/sidebar.ts';
// @ts-ignore
import spot_trade from './docs/spot_trade/sidebar.ts';
// @ts-ignore
import margin_trade from './docs/margin_trade/sidebar.ts';
// @ts-ignore
import withdraw from './docs/withdraw/sidebar.ts';
// @ts-ignore
import address_book from './docs/address_book/sidebar.ts';
// @ts-ignore
import security from './docs/security/sidebar.ts';
// @ts-ignore
import referral from './docs/referral/sidebar.ts';
// @ts-ignore
import auth from './docs/auth/sidebar.ts';
// @ts-ignore
import portfolio from './docs/portfolio/sidebar.ts';
// @ts-ignore
import options from './docs/options/sidebar.ts';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'مستندات API نوبیتکس',
      link: {
        type: 'generated-index',
        title: 'API نوبیتکس',
        description: 'مستندات API نوبیتکس',
        slug: '/',
      },
      items: [...market_data.slice(1), ...user_data.slice(1), ...spot_trade.slice(1), ...margin_trade.slice(1), ...withdraw.slice(1), ...address_book.slice(1), ...security.slice(1), ...referral.slice(1), ...auth.slice(1), ...portfolio.slice(1), ...options.slice(1)],
    },
  ],
};

export default sidebars;
