'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    console.log('🔍 Search triggered for:', query)
    
    if (!query.trim()) {
      console.log('❌ Empty query, returning')
      return
    }
    
    setSearchQuery(query)
    setIsLoading(true)
    setSearchResults(null)

    try {
      console.log('📡 Fetching from API...')
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      console.log('✅ API Response:', data)
      setSearchResults(data)
    } catch (error) {
      console.error('❌ Search error:', error)
      setSearchResults({
        query: query,
        results: [],
        total_results: 0,
        search_time: '0.00',
        error: 'Failed to fetch results'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const showResults = searchResults !== null

  return (
    <div className="min-h-screen bg-white">
      {!showResults && !isLoading ? (
        // صفحه اصلی - مثل Google
        <div className="flex flex-col h-screen">
          <header className="flex justify-end items-center p-4 gap-4">
            <a href="#" className="text-sm text-gray-700 hover:underline">Gmail</a>
            <a href="#" className="text-sm text-gray-700 hover:underline">Images</a>
            <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 12h12M12 6v12"/>
              </svg>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center">
            <div className="text-6xl font-light mb-8 text-center">
              Aula
            </div>
            
            <div className="w-full max-w-2xl px-4 mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                type="button"
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded"
              >
                Aula Search
              </button>
              <button type="button" className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded">
                I&apos;m Feeling Lucky
              </button>
            </div>
          </main>

          <footer className="border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
            <div className="px-6 py-3 border-b border-gray-200">
              <span className="text-gray-900">Iran</span>
            </div>
            <div className="flex justify-between px-6 py-3">
              <div className="flex gap-6">
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">Advertising</a>
                <a href="#" className="hover:underline">Business</a>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Settings</a>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        // صفحه نتایج
        <div>
          <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <a href="/" className="text-2xl font-light text-blue-700">Aula</a>
              <SearchBar onSearch={handleSearch} showResultsPage={true} defaultQuery={searchQuery} />
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-gray-700 hover:underline">Images</a>
              <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </header>

          <main>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center mt-12">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading results...</p>
              </div>
            ) : (
              <SearchResults 
                results={searchResults} 
                query={searchQuery}
                isLoading={isLoading}
              />
            )}
          </main>
        </div>
      )}
    </div>
  )
}
