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
          <div className="mt-6 text-left max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
            <p className="font-medium mb-2">Suggestions:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
              <li>Make sure all words are spelled correctly.</li>
              <li>Try different keywords.</li>
              <li>Try more general keywords.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-sm text-gray-600 mt-4 mb-6 px-4">
        About {results.total_results.toLocaleString()} results ({results.search_time} seconds)
      </div>

      <div className="space-y-8 px-4">
        {/* Advertisement placeholder - مثل Google */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 uppercase">Ad</span>
              </div>
              <h3 className="text-xl text-blue-700 hover:underline mb-1 leading-tight">
                <a href="#">Advertisement Placeholder</a>
              </h3>
              <p className="text-sm text-green-700 mb-2">www.example-ad.com</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                This is your advertisement space. You can customize this later with your own ads.
              </p>
            </div>
            <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-4xl">📢</span>
            </div>
          </div>
        </div>

        {/* Search results - مثل Google */}
        {results.results.map((result: any, index: number) => (
          <div key={index} className="py-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-1">
                  <p className="text-sm text-gray-600 mb-1">
                    {result.domain || 'Unknown'}
                  </p>
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl text-blue-700 hover:underline leading-tight"
                  >
                    {result.title}
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {result.description}
                </p>
              </div>
              {result.thumbnail && (
                <div className="w-32 h-24 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={result.thumbnail} 
                    alt={result.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
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
              `${query} examples`
            ].map((related, idx) => (
              <a key={idx} href="#" className="text-blue-700 hover:underline">
                {related}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination - مثل Google */}
      <div className="flex justify-center items-center gap-2 mt-8 pb-12">
        <div className="flex items-center gap-1 text-blue-700 hover:border cursor-pointer">
          <span className="text-sm">G</span>
        </div>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <a 
              key={num} 
              href="#" 
              className="px-3 py-2 text-sm text-blue-700 hover:border hover:border-gray-300 rounded leading-none"
            >
              {num}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1 text-blue-700 hover:border cursor-pointer">
          <span className="text-sm">g</span>
        </div>
        <span className="text-sm text-gray-600 ml-4">Next</span>
      </div>
    </div>
  )
}
