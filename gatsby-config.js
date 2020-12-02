require('dotenv').config();

const path = require('path');
const { version } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: require.resolve('@arcblock/gatsby-theme-docs'),
      options: {
        version: `v${version}`,
        official: true,
        disableI18n: false,
        showGetStarted: true,
        sourceDirs: [path.resolve(__dirname, 'src', 'pages')],
        siteMetadata: {
          title: 'ArcBlock',
          subtitle: 'Documentation',
          description: 'Forge SDK Documentation',
        },
        algoliaSearch: {
          enabled: false,
          appId: process.env.GATSBY_ALGOLIA_APP_ID,
          adminKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
          searchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
        },
        navItems: [
          {
            title: 'Community',
            link: '/community',
            subPages: {
              'https://github.com/ArcBlock': 'GitHub',
              'https://www.arcblock.io': 'About',
              'https://gitter.im/ArcBlock/community': 'Gitter',
              'https://twitter.com/ArcBlock_io': 'Twitter',
              'https://youtube.com/channel/UC0pEW_GOrMJ23l8QcrGdKSw': 'YouTube',
            },
          },
        ],
        extraPlugins: [],
      },
    },
  ],
};
