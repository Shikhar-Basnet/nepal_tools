'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'

export default function AgriPricesClient({ prices, date, error }) {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')

  // Categorise by keyword matching since Kalimati data is flat
  const FRUIT_KEYWORDS  = ['apple','banana','mango','orange','grape','papaya','lemon','pear','peach','plum','guava','pomegranate','litchi','watermelon','melon','pineapple','kiwi','avocado']
  const GRAIN_KEYWORDS  = ['rice','wheat','flour','lentil','dal','oil','mustard','maize','corn','bean','soybean','barley','millet']

  const categorise = name => {
    const l = name.toLowerCase()
    if (FRUIT_KEYWORDS.some(k => l.includes(k))) return 'fruits'
    if (GRAIN_KEYWORDS.some(k => l.includes(k))) return 'grains'
    return 'vegetables'
  }

  const filtered = prices
    .filter(p => tab === 'all' || categorise(p.name) === tab)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  const TABS = [['all','🛒 All'],['vegetables','🥦 Vegetables'],['fruits','🍎 Fruits'],['grains','🌾 Grains']]

  return (
    <ToolLayout
      title="Agricultural Price Tracker"
      icon="🌾"
      description="Daily wholesale prices from Kalimati Fruits & Vegetable Market, Kathmandu"
    >
      {error && (
        <div className="flex gap-2 p-3 mb-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-700 dark:text-amber-300">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          Could not fetch live prices. Showing cached data. Try again later.
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500">📍 Kalimati Market · {date}</span>
        <span className="text-xs text-green-600 dark:text-green-400">{prices.length} items</span>
      </div>

      <input placeholder="Search commodity..." value={search} onChange={e => setSearch(e.target.value)}
        className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 mb-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 text-sm" />

      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl mb-4 overflow-x-auto">
        {TABS.map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all px-2 ${tab === k ? 'bg-white dark:bg-slate-600 shadow text-green-700 dark:text-green-400' : 'text-slate-500'}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        <div className="grid grid-cols-5 text-xs text-slate-400 px-3 pb-1">
          <span className="col-span-2">Commodity</span>
          <span className="text-right">Min</span>
          <span className="text-right">Max</span>
          <span className="text-right">Avg</span>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            {prices.length === 0 ? 'Loading prices...' : `No results for "${search}"`}
          </div>
        )}
        {filtered.map((item, i) => (
          <div key={i}
            className="grid grid-cols-5 items-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 hover:bg-green-50 dark:hover:bg-green-950 transition-colors text-sm">
            <div className="col-span-2">
              <div className="font-medium text-slate-800 dark:text-white text-xs leading-tight">{item.name}</div>
              <div className="text-xs text-slate-400">per {item.unit || 'kg'}</div>
            </div>
            <div className="text-right text-xs text-slate-500">Rs.{item.min}</div>
            <div className="text-right text-xs text-slate-500">Rs.{item.max}</div>
            <div className="text-right text-xs font-bold text-green-700 dark:text-green-400">Rs.{item.avg}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-4 text-center">
        Source: <a href="https://kalimatimarket.gov.np/price" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-500">kalimatimarket.gov.np</a> · Updated daily
      </p>
    </ToolLayout>
  )
}