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
  const type = searchParams.get('type') || 'all'

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  try {
    const apiKey = getNextApiKey()
    
    // استفاده از API واقعی
    const apiUrl = `https://s1.ntrod.com/api/search?q=${encodeURIComponent(query)}&api_key=${apiKey}`
    
    console.log('Calling API:', apiUrl)

    const response = await axios.get(apiUrl, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      }
    })

    console.log('API Response:', response.data)

    // بررسی ساختار پاسخ API
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid API response format')
    }

    const transformedResults = {
      query: query,
      results: response.data.map((result: any) => ({
        title: result.title || result.headline || 'No title',
        description: result.description || result.snippet || '',
        url: result.url || result.link || '#',
        domain: result.domain || (result.url ? new URL(result.url).hostname : 'unknown'),
        thumbnail: result.thumbnail || result.image
      })),
      total_results: response.data.length || 0,
      search_time: '0.00'
    }

    return NextResponse.json(transformedResults)
  } catch (error: any) {
    console.error('Search API error:', error.message)
    
    // Return empty results instead of fake data
    return NextResponse.json({
      query: query,
      results: [],
      total_results: 0,
      search_time: '0.00',
      error: 'API is temporarily unavailable. Please try again later.'
    })
  }
}
