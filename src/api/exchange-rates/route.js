export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch(
      `https://www.nrb.org.np/api/forex/v1/rates?page=1&per_page=1`,
      { headers: { 'Accept': 'application/json' }, next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error(`NRB API failed with status ${res.status}`)

    const json = await res.json()
    const payload = json?.data?.payload?.[0]
    if (!payload) throw new Error('No payload from NRB')

    const rateMap = {}
    for (const r of payload.rates) {
      rateMap[r.currency.iso3] = {
        buy:  parseFloat(r.buy),
        sell: parseFloat(r.sell),
        unit: r.currency.unit,
        name: r.currency.name,
      }
    }

    return Response.json({
      date:      payload.date,
      published: payload.published_on,
      source:    'Nepal Rastra Bank (NRB)',
      rates:     rateMap,
    })

  } catch (err) {
    console.error('NRB fetch failed:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}