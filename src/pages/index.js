import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'

import { GatsbyImage } from 'gatsby-plugin-image'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
// import { projectsList } from '../data/projectsList'
import { extractMarkdownLinks, getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'

export default function Index({ data }) {
  const latestNotes = data.latestNotes.edges
  const highlights = data.highlights.edges
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])
  const blogLinks = useMemo(
    () => extractMarkdownLinks(data.blogPage.rawMarkdownBody),
    [data.blogPage.rawMarkdownBody]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights, { thumbnails: true }),
    [highlights]
  )

  return (
    <>
      {/* Meta etiketleri ve SEO ayarları */}
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        {/* Hero bölümü - Ana başlık ve tanıtım */}
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>Hey, I'm Berkcan!</h1>
              <p className="hero-description">
                I'm a DevOps engineer, system builder, and product-minded developer. I design and operate scalable infrastructures, build CI/CD pipelines, and turn complex systems into reliable platforms. and{' '}
                <Link to="/blog">I try writing on this blog</Link> for over five years! But, right now the blog is onboard!
              </p>
              <p className="hero-description">
                Everything on this site is written by me, not AI(Yes only me).
              </p>

              <p
                className="flex-wrap flex-align-center gap"
                style={{ marginBottom: 0 }}
              >
                <Link className="button" to="/me">
                  <img src={floppy} alt="Floppy Logo" /> About Me
                </Link>
               {/* Ana eylem butonları 
                <a
                  href="https://taniarascia.substack.com"
                  className="button"
                  type="button"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img src={newMoon} alt="New Moon Logo" /> Email Newsletter
                </a>         
                 */}
              </p>
            </div>
            <div className="hero-image-container">
              <img src="/beko.png" className="hero-image" alt="RAM Ram" />
            </div>
          </div>
        </Hero>

        {/* Blog yazıları bölümü */}
        <section className="section-index">
          <Heading
            title="Blog"
            description={data.blogPage.frontmatter.description}
            icon={projects}
          />
          <div className="posts">
            {blogLinks.map((item) => (
              <a
                key={item.url}
                className="post"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <div>{item.label}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Notlar bölümü */}
        <section className="section-index">
          <Heading
            title="Notes"
            description="Life, music, projects, and everything else."
            icon={blog}
          />
          <Posts data={notes} />
        </section>

        {/* Deep Dives / Derinlemesine Öğretim bölümü 
        <section className="section-index">
          <Heading
            title="Deep Dives"
            slug="/topics"
            buttonText="All Topics"
            description="Long-form tutorials on a variety of development topics."
          />
          <div className="cards">
            {simplifiedHighlights.map((post) => {
              return (
                <Link
                  to={post.slug}
                  className="card card-highlight"
                  key={`popular-${post.slug}`}
                >
                  {post.thumbnail && (
                    <GatsbyImage image={post.thumbnail} alt="Thumbnail" />
                  )}
                  <div>{post.title}</div>
                </Link>
              )
            })}
          </div>
        </section>
        */}
        {/* Projeler bölümü 
        <section>
          <Heading
            title="Projects"
            slug="/projects"
            buttonText="All Projects"
            description="Open-source projects I've worked on over the years."
            icon={github}
          />

          <div className="cards">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    <time>{project.date}</time>
                    <a
                      href={`https://github.com/taniarascia/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                   
                    <div className="card-links">
                      {project.writeup && (
                        <Link
                          className="button secondary small"
                          to={project.writeup}
                        >
                          Article
                        </Link>
                      )}
                      <a
                        className="button secondary small"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Demo
                      </a>
                      <a
                        className="button secondary small"
                        href={`https://github.com/taniarascia/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Source
                      </a>
                    </div>
                  </div>
                )
              })}
            
          </div>
        </section>
        */}
      </PageLayout>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latestNotes: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            categories
          }
        }
      }
    }
    blogPage: markdownRemark(frontmatter: { slug: { eq: "blog" } }) {
      rawMarkdownBody
      frontmatter {
        description
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 40, height: 40, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`
