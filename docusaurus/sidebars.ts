import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import apiSidebar from './docs/main/sidebar';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'API Documentation',
      link: {
        type: 'generated-index',
        title: 'API Documentation',
        description: 'API endpoints documentation generated from OpenAPI specification',
        slug: '/api',
      },
      items: apiSidebar,
    },
  ],
};

export default sidebars;
