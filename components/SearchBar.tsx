'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  showResultsPage?: boolean
  defaultQuery?: string
}

export default function SearchBar({ onSearch, showResultsPage = false, defaultQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!showResultsPage) {
      inputRef.current?.focus()
    }
  }, [showResultsPage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  if (showResultsPage) {
    // Bar for results page - مثل Google
    return (
      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-2.5 text-sm rounded-full border border-gray-300 hover:shadow-md focus:outline-none focus:shadow-md transition-all"
            placeholder=""
          />
          <div className="absolute left-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute right-3 flex items-center gap-3">
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
      </form>
    )
  }

  // Main search bar - مثل Google home page
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative max-w-lg mx-auto">
        <div className="absolute inset-0 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-14 pr-14 py-3 text-base rounded-full border border-gray-300 hover:shadow-md focus:outline-none focus:shadow-md focus:border-transparent transition-all"
          />
        </div>
        <div className="absolute left-3 flex items-center">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {query && (
          <div className="absolute right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
