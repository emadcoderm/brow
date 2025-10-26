import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 })
  }

  console.log('Generating results for:', query)
  
  // همیشه نتایج sample برمی‌گردونیم
  const results = [
    {
      title: `${query} - Search Results`,
      description: `Find comprehensive information about ${query}. Browse articles, resources, and related content on the web.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      domain: 'google.com'
    },
    {
      title: `Wikipedia - ${query}`,
      description: `Read the Wikipedia article about ${query}. Get detailed information and references.`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      domain: 'wikipedia.org'
    },
    {
      title: `${query} Information and Facts`,
      description: `Learn everything about ${query}. Discover facts, history, and interesting details.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      domain: 'google.com'
    },
    {
      title: `About ${query}`,
      description: `Explore detailed information about ${query}. Find articles, videos, and related content.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      domain: 'about.com'
    },
    {
      title: `${query} - Complete Guide`,
      description: `Your complete guide to ${query}. Everything you need to know in one place.`,
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      domain: 'guide.com'
    }
  ]

  return NextResponse.json({
    query: query,
    results: results,
    total_results: results.length,
    search_time: '0.45'
  })
}
