import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { BlogLanding } from '../components/BlogLanding'
import { Layout } from '../components/Layout'
import { Hero } from '../components/Hero'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'

export default function PageTemplate({ data }) {
  const post = data.markdownRemark
  const { title, description, thumbnail } = post.frontmatter
  const isBlogPage = post.frontmatter.slug === 'blog'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} thumbnail={thumbnail} />
        {isBlogPage ? (
          <BlogLanding
            markdown={post.rawMarkdownBody}
            description={description}
          />
        ) : (
          <div
            className="page-article"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        )}
      </PageLayout>
    </>
  )
}

PageTemplate.Layout = Layout

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
        slug
        description
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 40, height: 40, layout: FIXED)
          }
        }
      }
    }
  }
`
