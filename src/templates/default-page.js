import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import SEO from '../components/SEO'

export default function Template({ data }) {
  const siteTitle = get(data, 'cosmicjsSettings.metadata.site_title')
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout location={frontmatter.path}>
      <Helmet title={`${frontmatter.title} | ${siteTitle}`} />
      <SEO
        title={`${frontmatter.title} | ${siteTitle}`}
        url={frontmatter.path}
      />
      <div className="container">
        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
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
    cosmicjsSettings(slug: { eq: "general" }) {
      metadata {
        site_title
      }
    }
  }
`
