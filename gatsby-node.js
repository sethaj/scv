/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ actions, graphql, reports }) => {
  const { createPage } = actions
  const results = await graphql(`
    {
      allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
   if (results.errors) {
     reporter.panicOnBuild(`Error while running GraphQL query.`)
     return
   }

   results.data.allMarkdownRemark.edges.forEach(({node}) => {
     createPage({
       path: node.frontmatter.slug,
       component: path.resolve("./src/templates/projects-template.js"),
       context: {
         slug: node.frontmatter.slug
       }
     })
   })
}

const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node);
};
