import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/sidebar';

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
      items: apiSidebar,
    },
  ],
};

export default sidebars;
