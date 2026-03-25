import React, { useEffect, useMemo, useState } from 'react'

import { extractMarkdownLinks } from '../utils/helpers'
import { Heading } from './Heading'

const PAGE_SIZE = 10

function getHostname(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export const BlogLanding = ({ markdown = '', description }) => {
  const links = useMemo(() => extractMarkdownLinks(markdown), [markdown])
  const [page, setPage] = useState(1)
  const [selectedUrl, setSelectedUrl] = useState(links[0]?.url ?? '')

  const totalPages = Math.max(1, Math.ceil(links.length / PAGE_SIZE))
  const pagedLinks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return links.slice(start, start + PAGE_SIZE)
  }, [links, page])

  const selectedArticle =
    links.find((item) => item.url === selectedUrl) ?? pagedLinks[0] ?? null
  const selectedIndex = links.findIndex((item) => item.url === selectedArticle?.url)

  useEffect(() => {
    if (!selectedArticle && links[0]) {
      setSelectedUrl(links[0].url)
    }
  }, [links, selectedArticle])

  useEffect(() => {
    if (
      pagedLinks.length > 0 &&
      !pagedLinks.some((item) => item.url === selectedUrl)
    ) {
      setSelectedUrl(pagedLinks[0].url)
    }
  }, [page, pagedLinks, selectedUrl])

  return (
    <div className="blog-landing">
      <section className="section-index blog-list-section">
        <Heading
          title="Articles"
          description={description || 'Medium uzerindeki yazilarim.'}
        />

        <div className="blog-list-meta">
          <div className="chip">{links.length} articles</div>
          {selectedArticle && (
            <div className="chip">
              Selected {selectedIndex + 1} / {links.length}
            </div>
          )}
        </div>

        <div className="posts">
          {pagedLinks.map((item) => {
            const isActive = item.url === selectedArticle?.url
            const itemIndex = links.findIndex((link) => link.url === item.url)

            return (
              <button
                key={item.url}
                type="button"
                className={`post post-button ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedUrl(item.url)}
              >
                <span className="post-button-index">
                  {(itemIndex + 1).toString().padStart(2, '0')}
                </span>
                <div>{item.label}</div>
              </button>
            )
          })}
        </div>

        {links.length > PAGE_SIZE && (
          <div className="pagination">
            <button
              type="button"
              className="button secondary small"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div className="chip">
              Page {page} / {totalPages}
            </div>
            <button
              type="button"
              className="button secondary small"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {selectedArticle && (
        <section className="blog-view">
          <Heading
            title="View"
            description="preview area for the selected article. since medium pages cannot always be reliably opened inside an iframe, I prepared this area as a quick access point."
          />

          <article className="card blog-view-card">
            <div className="blog-view-meta">
              <div className="chip">{getHostname(selectedArticle.url)}</div>
              <div className="chip">Article</div>
            </div>
            <h3>{selectedArticle.label}</h3>
            <p>
              This is a preview area for the selected article. Since Medium pages cannot always be reliably opened inside an iframe, I prepared this area as a quick access point. You can click the button below to read the article on Medium.
            </p>
            <div className="blog-view-url">{selectedArticle.url}</div>
            <div className="card-links">
              <a
                className="button"
                href={selectedArticle.url}
                target="_blank"
                rel="noreferrer"
              >
                Medium&apos;da Oku
              </a>
            </div>
          </article>
        </section>
      )}
    </div>
  )
}
