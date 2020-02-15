module.exports = {
  siteMetadata: {
    siteUrl: `https://homebound.runkaizhang.xyz`,
    url: 'https://homebound.runkaizhang.xyz',
    title: 'HOMEBOUND',
    description: 'An UNDERTALE inspired game.',
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-cosmicjs',
      options: {
        bucketSlug: `homebound`,
        objectTypes: ['posts', 'settings'],
        apiAccess: {
          read_key: `ZHp9PE7bhAXC7NVo3UxyxfcYZyVef11wLInecPxIVf973wTftG`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-135014439-2`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
  ],
}
