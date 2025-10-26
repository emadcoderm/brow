import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const API_KEYS = [
  'ba3b0732a47bf26269b3e9160ea7618022b61352',
  '2c9a5a6cbf34b0fbaeeec8756fa596fc57c5e529',
  'e5be0c24eb41e337bc213b243a366ee18612683b'
]

let apiIndex = 0

const getNextApiKey = () => {
  const key = API_KEYS[apiIndex]
  apiIndex = (apiIndex + 1) % API_KEYS.length
  return key
}

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    const apiKey = getNextApiKey()
    const apiUrl = `https://s1.ntrod.com/api/search?q=${encodeURIComponent(query)}&api_key=${apiKey}`
    
    console.log('Calling API:', apiUrl)

    const response = await axios.get(apiUrl, {
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    console.log('API Response type:', typeof response.data)
    console.log('API Response:', JSON.stringify(response.data, null, 2))

    // Handle different API response structures
    let results = []
    
    if (Array.isArray(response.data)) {
      results = response.data
    } else if (response.data?.organic && Array.isArray(response.data.organic)) {
      results = response.data.organic
    } else if (response.data?.results && Array.isArray(response.data.results)) {
      results = response.data.results
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      results = response.data.data
    } else {
      // If we can't find results, try to extract from the whole object
      const data = response.data
      if (data && typeof data === 'object') {
        // Try to find any array in the response
        const keys = Object.keys(data)
        for (const key of keys) {
          if (Array.isArray(data[key])) {
            results = data[key]
            break
          }
        }
      }
    }

    console.log('Extracted results count:', results.length)

    // If API returns no results, provide sample results for testing
    if (results.length === 0) {
      results = [
        {
          title: `Search results for "${query}"`,
          description: `Find information about ${query} on the web. This is a sample result to demonstrate the search functionality.`,
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          domain: 'google.com'
        },
        {
          title: `Wikipedia - ${query}`,
          description: `Learn more about ${query} on Wikipedia, the free encyclopedia.`,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
          domain: 'wikipedia.org'
        },
        {
          title: `${query} - Web Search`,
          description: `Discover more information about ${query}. Browse related articles and resources.`,
          url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
          domain: 'google.com'
        }
      ]
    }

    const transformedResults = {
      query: query,
      results: results.map((result: any) => {
        const snippet = result.snippet || result.text || result.description || ''
        const titlePreview = snippet.substring(0, 50)
        
        return {
          title: result.title || result.headline || titlePreview || 'Untitled',
          description: result.description || result.snippet || result.text || '',
          url: result.url || result.link || `https://google.com/search?q=${encodeURIComponent(query)}`,
          domain: result.domain || (result.url ? new URL(result.url).hostname : result.link ? new URL(result.link).hostname : 'unknown'),
          thumbnail: result.thumbnail || result.image || null
        }
      }),
      total_results: results.length,
      search_time: '0.00'
    }

    return NextResponse.json(transformedResults)
  } catch (error: any) {
    console.error('Search API error:', error.message)
    console.error('Error details:', error)
    
    return NextResponse.json({
      query: query,
      results: [],
      total_results: 0,
      search_time: '0.00',
      error: error.message || 'Unable to fetch results. Please try again later.'
    })
  }
}
