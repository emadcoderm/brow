'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import Sidebar from '@/components/Sidebar'
import SearchResults from '@/components/SearchResults'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any>(null)
  const [searchType, setSearchType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    
    setSearchQuery(query)
    setIsLoading(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${searchType}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchTypeChange = (type: string) => {
    setSearchType(type)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Sidebar searchType={searchType} onSearchTypeChange={handleSearchTypeChange} />
      
      <main className="flex flex-col items-center pt-20 px-4 pb-8">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-2">Aula</h1>
            <p className="text-white/80 text-lg">Search the web smarter</p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {searchResults && (
            <SearchResults 
              results={searchResults} 
              query={searchQuery}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </div>
  )
}

