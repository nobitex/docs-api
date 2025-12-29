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
// @ts-ignore
import ws from './docs/websocket/sidebar';

const sortedItems = () => {
    const apiSidebars = [
        market_data,
        user_data,
        spot_trade,
        margin_trade,
        withdraw,
        address_book,
        security,
        referral,
        auth,
        portfolio,
        options,
        ws
    ];

    return apiSidebars.flatMap(
        (sidebar) => sidebar.slice(1)
    ) as SidebarsConfig['mainSidebar'];
}

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: 'category',
      label: 'مستندات API نوبیتکس',
      link: {
        type: 'generated-index',
        title: 'مستندات API نوبیتکس',
        description: 'مستندات API نوبیتکس',
        slug: '/',
      },
      items: sortedItems(),
    },
  ],
};

export default sidebars;
