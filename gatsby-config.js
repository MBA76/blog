module.exports = {
  siteMetadata: {
    title: "MBA's Website",
    author: { name: 'MBA's Website' },
    pathPrefix: '/',
    siteUrl: 'https://berkcan.tech',
    description:
      'Software engineer and open-source creator. This is my digital garden.',
    feedUrl: 'https://berkcan.tech/rss.xml',
    logo: 'https://berkcan.tech/logo.png',
  },
  plugins: [
    // ===================================================================================
    // Schema Customization
    // ===================================================================================
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/content`,
      },
    },
    // ===================================================================================
    // Meta
    // ===================================================================================
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: "MBA's Website",
        short_name: 'berkcan.tech',
        description:
          'Software engineer and open source creator. This is my digital garden.',
        start_url: '/',
        background_color: 'white',
        // theme_color: '#959af8',
        display: 'minimal-ui',
        icon: `static/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'content:encoded': edge.node.html },
                    { author: 'hello@berkcan.tech' },
                  ],
                })
              })
            },
            query: `
              {
              allMarkdownRemark(
                limit: 30
                sort: {frontmatter: {date: DESC}}
                filter: {frontmatter: {template: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                      template
                    }
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'MBA's Website | RSS Feed',
          },
        ],
      },
    },

    // ===================================================================================
    // Images, styles, and static
    // ===================================================================================

    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          // placeholder: `dominantColor`,
          backgroundColor: `transparent`,
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`,
      },
    },
    'gatsby-plugin-image',

    // ===================================================================================
    // Markdown
    // ===================================================================================

    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              maxWidth: 590,
            },
          },
          'gatsby-remark-autolink-headers',
          // 'gatsby-remark-prismjs-copy-button',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '>',
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: 'root',
                host: 'localhost',
                global: true,
              },
            },
          },
        ],
      },
    },

    // ===================================================================================
    // Search (disabled due to Gatsby v5 compatibility issues)
    // ===================================================================================
    // Uncomment the following plugin if you upgrade gatsby-plugin-local-search
    // {
    //   resolve: 'gatsby-plugin-local-search',
    //   options: {
    //     name: 'pages',
    //     engine: 'flexsearch',
    //     engineOptions: {
    //       encode: 'icase',
    //       tokenize: 'forward',
    //       async: false,
    //     },
    //     query: `
    //       {
    //         allMarkdownRemark {
    //           nodes {
    //             id
    //             excerpt
    //             html
    //             frontmatter {
    //               title
    //               tags
    //               slug
    //               date(formatString: "MMMM DD, YYYY")
    //             }
    //           }
    //         }
    //       }
    //     `,
    //     ref: 'id',
    //     index: ['title', 'tags'],
    //     store: ['id', 'slug', 'title', 'tags', 'date'],
    //     normalizer: ({ data }) =>
    //       data.allMarkdownRemark.nodes.map((node) => ({
    //         id: node.id,
    //         slug: `/${node.frontmatter.slug}`,
    //         title: node.frontmatter.title,
    //         body: node.html,
    //         tags: node.frontmatter.tags,
    //         date: node.frontmatter.date,
    //       })),
    //   },
    // },
  ],
}
