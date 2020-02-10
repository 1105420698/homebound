import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'

import { rhythm, scale } from '../utils/typography'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

export default ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        cosmicjsSettings(slug: { eq: "general" }) {
          metadata {
            homepage_hero {
              imgix_url
            }
          }
        }
      }
    `}
    render={data => {
      const homgePageHero =
        data.cosmicjsSettings.metadata.homepage_hero.imgix_url
      let header

      let rootPath = `/`
      let postsPath = `/posts`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
        rootPath = __PATH_PREFIX__ + `/`
        postsPath = __PATH_PREFIX__ + `/posts`
      }

      if (location.pathname === rootPath || location.pathname === postsPath) {
        header = (
          <div
            style={{
              backgroundColor: '#007ACC',
              backgroundImage: `url("${homgePageHero}?w=2000")`,
              backgroundSize: 'cover',
              backgroundPosition: 'right',
              width: '100%',
              height: rhythm(14),
              position: 'relative',
              marginBottom: `${rhythm(1.5)}`,
            }}
          />
        )
      } else {
        header = (
          <div
            style={{
              backgroundColor: '#007ACC',
              backgroundImage: `url("${homgePageHero}?w=2000")`,
              backgroundSize: 'cover',
              backgroundPosition: 'right',
              width: '100%',
              height: rhythm(14),
              position: 'relative',
              marginBottom: `${rhythm(1.5)}`,
            }}
          />
        )
      }
      return (
        <div>
          {header}
          <div
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
              minHeight: 'calc(100vh - 42px)',
            }}
          >
            {children}
          </div>
          <footer
            style={{
              textAlign: 'center',
              padding: `0 20px 80px 0`,
            }}
          >
            2020 Runkai Zhang
          </footer>
        </div>
      )
    }}
  />
)
