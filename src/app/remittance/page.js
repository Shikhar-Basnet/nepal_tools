import RemittanceClient from './RemittanceClient'

export const revalidate = 3600

export const metadata = {
  title: 'Remittance Comparator Nepal – Best Rate to Send Money',
  description: 'Compare live NRB exchange rates from IME, Wise, Western Union, Prabhu to send money to Nepal.',
}

export default async function RemittancePage() {
  let nrbRates = null
  let date     = null
  let source   = null
  let fallback = false

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res  = await fetch(`${base}/api/exchange-rates`, { next: { revalidate: 3600 } })

    if (!res.ok) throw new Error(`API failed with status ${res.status}`)
    const data = await res.json()
    if (data.error) throw new Error(data.error)

    nrbRates = data.rates
    date     = data.date
    source   = data.source
    fallback = data.fallback || false
  } catch (err) {
    console.error('Remittance rates fetch failed:', err.message)
  }

  return (
    <RemittanceClient
      nrbRates={nrbRates}
      date={date}
      source={source}
      fallback={fallback}
    />
  )
}