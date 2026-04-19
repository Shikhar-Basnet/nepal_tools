import * as cheerio from 'cheerio'

export const revalidate = 43200 // 12 hours — Kalimati updates once daily

export async function GET() {
  try {
    const res = await fetch('https://kalimatimarket.gov.np/price', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 43200 },
    })

    if (!res.ok) throw new Error(`Kalimati fetch failed: ${res.status}`)

    const html = await res.text()
    const $ = cheerio.load(html)
    const prices = []

    // Kalimati's table has class "table" — rows: Commodity | Unit | Min | Max | Avg
    $('table.table tbody tr, table tbody tr').each((_, row) => {
      const cols = $(row).find('td')
      if (cols.length >= 5) {
        const name = $(cols[0]).text().trim()
        const unit = $(cols[1]).text().trim()
        const min  = parseFloat($(cols[2]).text().replace(/[^0-9.]/g, ''))
        const max  = parseFloat($(cols[3]).text().replace(/[^0-9.]/g, ''))
        const avg  = parseFloat($(cols[4]).text().replace(/[^0-9.]/g, ''))

        if (name && !isNaN(avg) && avg > 0) {
          prices.push({ name, unit, min: min || avg, max: max || avg, avg })
        }
      }
    })

    if (prices.length === 0) throw new Error('Parsed 0 prices — selector may need update')

    return Response.json({
      prices,
      count:  prices.length,
      date:   new Date().toISOString().split('T')[0],
      source: 'kalimatimarket.gov.np',
    })

  } catch (err) {
    // Return error WITH a helpful debug hint
    return Response.json(
      {
        error:  err.message,
        prices: [],
        date:   new Date().toISOString().split('T')[0],
        debug:  'Visit /api/agri-prices/debug to inspect raw HTML',
      },
      { status: 500 }
    )
  }
}