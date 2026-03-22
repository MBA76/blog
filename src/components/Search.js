import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import queryString from 'query-string'

import { Searchbar } from './Searchbar'
import { Posts } from './Posts'

export const Search = ({ data, section }) => {
  const location = useLocation()
  const { search } = queryString.parse(location.search)
  const [query, setQuery] = useState(search || '')

  // Filter posts based on query
  const results = query
    ? data.filter((post) => {
        const text = `${post.title} ${post.tags?.join(' ') || ''}`.toLowerCase()
        return text.includes(query.toLowerCase())
      })
    : data

  return (
    <>
      <Searchbar
        count={data.length}
        query={query}
        handleSearch={(event) => {
          const updatedValue = event.target.value
            ? `/${section}/?search=${event.target.value}`
            : ''

          navigate(updatedValue)
          setQuery(event.target.value)
        }}
        style={{ marginBottom: '2.5rem' }}
      />
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} showYears query={query} />
          ) : (
            <p style={{ marginTop: '2rem' }}>
              Sorry, nothing matched that search.
            </p>
          )
        ) : (
          <Posts data={data} showYears />
        )}
      </section>
    </>
  )
}
