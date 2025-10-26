'use client'

import Image from 'next/image'

interface SearchResultsProps {
  results: any
  query: string
  isLoading: boolean
}

export default function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        <p className="mt-4 text-white">Searching...</p>
      </div>
    )
  }

  if (!results || !results.results || results.results.length === 0) {
    return (
      <div className="mt-8 text-center text-white">
        <p>No results found for &quot;{query}&quot;</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="mb-6 text-sm text-white/70">
        About {results.total_results} results ({results.search_time} seconds)
      </div>

      <div className="space-y-6">
        {/* Advertisement placeholder */}
        <div className="glass rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-white/50">Sponsored</span>
                <span className="px-2 py-1 text-xs glass-strong rounded text-white">AD</span>
              </div>
              <div className="w-12 h-12 glass-strong rounded-lg mb-3"></div>
              <h3 className="text-lg font-medium text-white mb-2">
                Ad Placeholder Title
              </h3>
              <p className="text-sm text-white/80 mb-2">
                This is your advertisement space. You can customize this later.
              </p>
              <a href="#" className="text-sm text-blue-300 hover:underline">
                example-ad.com
              </a>
            </div>
            <div className="w-24 h-24 glass-strong rounded-lg flex items-center justify-center">
              <span className="text-4xl">📢</span>
            </div>
          </div>
        </div>

        {/* Search results */}
        {results.results.map((result: any, index: number) => (
          <div key={index} className="glass rounded-lg p-5 hover:glass-strong transition-all">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <a href={result.url} target="_blank" rel="noopener noreferrer">
                  <p className="text-sm text-green-300 mb-1 flex items-center gap-2">
                    <span>{result.domain || new URL(result.url).hostname}</span>
                    <span className="text-white/30">▼</span>
                  </p>
                </a>
                <h3 className="text-xl text-blue-300 hover:underline mb-2">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.title}
                  </a>
                </h3>
                <p className="text-white/80 leading-relaxed">{result.description}</p>
              </div>
              {result.thumbnail && (
                <div className="w-32 h-24 rounded overflow-hidden relative">
                  <Image 
                    src={result.thumbnail} 
                    alt={result.title} 
                    width={128}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

