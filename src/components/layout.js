import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import { rhythm } from '../utils/typography'

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
      header = (
        <div
          style={{
            backgroundColor: 'black',
            backgroundImage: `url("${homgePageHero}?w=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            width: '100%',
            height: rhythm(14),
            position: 'relative'
          }}
        />
      )
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
            
            className="hero"
          >
            <div className="menu">
              <Link to="/">Home</Link>
              <Link to="/download">Download</Link>
            </div>
            {children}
          </div>
          <footer
            style={{
              textAlign: 'center',
              padding: `0 20px 15px 0`,
            }}
          >
            2020 Runkai Zhang, Undertale by Toby Fox
          </footer>
        </div>
      )
    }}
  />
)
