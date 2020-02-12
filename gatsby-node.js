const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const indexPage = path.resolve('./src/pages/index.js')
  createPage({
    path: `posts`,
    component: indexPage,
  })

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const changelog = path.resolve('./src/templates/CHANGELOG.js')
    resolve(
      graphql(
        `
          {
            allCosmicjsPosts(
              sort: { fields: [created], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  slug
                  title
                }
              }
            }

            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allCosmicjsPosts.edges

        each(posts, (post, index) => {
          const next = index === posts.length - 1 ? null : posts[index + 1].node
          const previous = index === 0 ? null : posts[index - 1].node

          createPage({
            path: `posts/${post.node.slug}`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              previous,
              next,
            },
          })
        })

        const pages = result.data.allMarkdownRemark.edges

        each(pages, page => {
          createPage({
            path: page.node.frontmatter.path,
            component: changelog,
            context: {}, // additional data can be passed via context
          })
        })
      })
    )
  })
}
