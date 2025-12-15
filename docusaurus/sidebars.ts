import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import api1Sidebar from './docs/orders/sidebar';
import api2Sidebar from './docs/users/sidebar';

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
      items: [...api1Sidebar.slice(1), ...api2Sidebar.slice(1)],
    },
  ],
};

export default sidebars;
