import AgriPricesClient from './AgriPricesClient'

export const revalidate = 86400 // refresh once per day

export const metadata = {
  title: 'Kalimati Vegetable & Fruit Prices Today Nepal',
  description: 'Real-time daily wholesale vegetable and fruit prices from Kalimati market, Kathmandu Nepal.',
}

export default async function AgriPricesPage() {
  let prices = []
  let date = new Date().toISOString().split('T')[0]
  let error = false

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/agri-prices`,
      { next: { revalidate: 86400 } }
    )
    const data = await res.json()
    prices = data.prices || []
    date = data.date || date
  } catch {
    error = true
  }

  return <AgriPricesClient prices={prices} date={date} error={error} />
}