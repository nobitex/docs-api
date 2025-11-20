import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/sidebar';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'generated-index',
        title: 'API Documentation',
        description: 'API endpoints documentation generated from OpenAPI specification',
        slug: '/',
      },
      items: apiSidebar,
    },
  ],
};

export default sidebars;
