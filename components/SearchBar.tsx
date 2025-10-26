'use client'

import { useState, useRef, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
          <svg
            className="w-6 h-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-14 pr-14 py-4 text-lg rounded-full glass text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
          placeholder="Search the web..."
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-5">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          className="px-6 py-2 glass text-white rounded-lg hover:glass-strong transition-all"
        >
          Aula Search
        </button>
        <button
          type="button"
          className="px-6 py-2 glass text-white rounded-lg hover:glass-strong transition-all"
        >
          I&apos;m Feeling Lucky
        </button>
      </div>
    </form>
  )
}
