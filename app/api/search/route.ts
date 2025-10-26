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
        'User-Agent': 'Mozilla/5.0'
      }
    })

    console.log('API Response:', JSON.stringify(response.data, null, 2))

    // Handle different API response structures
    let results = []
    
    if (Array.isArray(response.data)) {
      // If response is array
      results = response.data
    } else if (response.data.organic && Array.isArray(response.data.organic)) {
      // If response has organic results
      results = response.data.organic
    } else if (response.data.results && Array.isArray(response.data.results)) {
      // If response has results array
      results = response.data.results
    } else {
      throw new Error('Unknown API response structure')
    }

    const transformedResults = {
      query: query,
      results: results.map((result: any) => {
        const snippet = result.snippet || result.text || ''
        const titlePreview = snippet.substring(0, 50)
        
        return {
          title: result.title || result.headline || titlePreview || 'Untitled',
          description: result.description || snippet || result.text || '',
          url: result.url || result.link || '#',
          domain: result.domain || (result.url ? new URL(result.url).hostname : 'unknown'),
          thumbnail: result.thumbnail || result.image || null
        }
      }),
      total_results: results.length,
      search_time: '0.00'
    }

    return NextResponse.json(transformedResults)
  } catch (error: any) {
    console.error('Search API error:', error.message)
    
    return NextResponse.json({
      query: query,
      results: [],
      total_results: 0,
      search_time: '0.00',
      error: 'Unable to fetch results. Please verify API key and endpoint.'
    })
  }
}
