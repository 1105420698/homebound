import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout location={location}>
      <div className="changelog-container">
        <div className="changelog-content">
          <h1>{frontmatter.title}</h1>
          <div
            className="changelog-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
