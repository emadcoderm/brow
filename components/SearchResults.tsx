'use client'

interface SearchResultsProps {
  results: any
  query: string
  isLoading: boolean
}

export default function SearchResults({ results, query, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-500"></div>
      </div>
    )
  }

  if (!results || !results.results || results.results.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-gray-700 text-lg">
            Your search - <span className="font-medium">&quot;{query}&quot;</span> - did not match any documents.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-8">
      <div className="text-sm text-gray-600 mt-4 mb-6">
        About {results.total_results.toLocaleString()} results ({results.search_time} seconds)
      </div>

      <div className="space-y-1">
        {/* Advertisement placeholder - مثل Google */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 uppercase">Ad</span>
              </div>
              <h3 className="text-xl text-blue-600 hover:underline mb-1 leading-snug">
                <a href="#" target="_blank" rel="noopener noreferrer">Advertisement Placeholder</a>
              </h3>
              <p className="text-sm text-green-700 mb-2">www.example-ad.com</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is your advertisement space. You can customize this later with your own ads.
              </p>
            </div>
            <div className="w-24 h-16 bg-gray-200 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">📢</span>
            </div>
          </div>
        </div>

        {/* Search results - دقیقاً مثل Google */}
        {results.results.map((result: any, index: number) => (
          <div key={index} className="py-1">
            <div className="flex items-start">
              {/* Favicon */}
              <div className="flex items-center mr-3 mt-1">
                <div className="w-5 h-5 rounded border border-gray-300 bg-white flex items-center justify-center">
                  <span className="text-xs font-bold">{result.domain?.[0]?.toUpperCase() || 'L'}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Domain and menu */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <p className="text-sm text-gray-700 leading-none">{result.domain || result.url?.replace('https://', '').replace('http://', '').split('/')[0] || 'Unknown'}</p>
                    <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl leading-tight mb-1">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline visited:text-purple-600"
                  >
                    {result.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-snug">
                  {result.description}
                  <span className="text-gray-400"> ...</span>
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Related searches */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-800 mb-3">Searches related to &quot;{query}&quot;</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              `${query} 2024`,
              `best ${query}`,
              `${query} tutorial`,
              `${query} examples`,
              `${query} meaning`,
              `${query} definition`,
              `about ${query}`,
              `${query} wiki`
            ].slice(0, 4).map((related, idx) => (
              <a key={idx} href="#" className="text-blue-700 hover:underline">
                {related}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination - مثل Google */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <div className="flex items-center gap-1 text-blue-700">
          <span className="text-xl font-light">G</span>
          <span className="text-red-600">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-700">g</span>
          <span className="text-green-600">l</span>
          <span className="text-red-600">e</span>
        </div>
        
        <div className="flex items-center gap-1 ml-4">
          {[
            { num: 1, active: true },
            { num: 2, active: false },
            { num: 3, active: false },
            { num: 4, active: false },
            { num: 5, active: false },
            { num: 6, active: false },
            { num: 7, active: false },
            { num: 8, active: false },
            { num: 9, active: false },
            { num: 10, active: false }
          ].map((item) => (
            <a 
              key={item.num} 
              href="#" 
              className={`px-3 py-2 text-sm rounded leading-none ${item.active ? 'bg-blue-600 text-white' : 'text-blue-700 hover:border hover:border-gray-300'}`}
            >
              {item.num}
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-1 text-blue-700 ml-4">
          <span className="text-xl font-light">g</span>
          <span className="text-red-600">o</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-700">g</span>
          <span className="text-green-600">l</span>
          <span className="text-red-600">e</span>
        </div>
        <span className="text-sm text-gray-600 ml-4">Next</span>
      </div>
    </div>
  )
}
