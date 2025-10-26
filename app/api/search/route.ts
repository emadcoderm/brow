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

// Set runtime to Node.js for Netlify
export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const type = searchParams.get('type') || 'all'

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    const apiKey = getNextApiKey()
    const baseUrl = 'https://s1.ntrod.com/api'
    
    const endpoints: Record<string, string> = {
      all: '/search',
      web: '/search',
      video: '/videos',
      audio: '/music',
      image: '/images'
    }

    const endpoint = endpoints[type] || '/search'
    const url = `${baseUrl}${endpoint}?q=${encodeURIComponent(query)}&api_key=${apiKey}`

    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    })

    const transformedResults = {
      query: query,
      results: (response.data.results || []).map((result: any) => ({
        title: result.title || 'Untitled',
        description: result.description || '',
        url: result.url || result.link || '#',
        domain: new URL(result.url || result.link || 'https://example.com').hostname,
        thumbnail: result.thumbnail || result.image
      })),
      total_results: response.data.total_results || 0,
      search_time: (response.data.search_time || 0.0).toFixed(2)
    }

    return NextResponse.json(transformedResults)
  } catch (error: any) {
    console.error('Search API error:', error.message)
    
    // Return mock data on error
    return NextResponse.json({
      query: query,
      results: [
        {
          title: 'Example Result 1',
          description: 'This is an example search result. The API integration will work once the endpoint is properly configured.',
          url: 'https://example.com',
          domain: 'example.com',
          thumbnail: null
        },
        {
          title: 'Example Result 2',
          description: 'Another example result to demonstrate the search functionality.',
          url: 'https://example2.com',
          domain: 'example2.com',
          thumbnail: null
        }
      ],
      total_results: 2,
      search_time: '0.02'
    })
  }
}
