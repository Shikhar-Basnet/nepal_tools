'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ExternalLink, ArrowRight, Trophy, Info } from 'lucide-react'

const PROVIDERS = [
  { name: 'Wise',          logo: '💜', marginOverMid: 0.004,  fee: { pct: 0.0067, flat: 0 },    time: 'Instant–2hr',  url: 'https://wise.com',             highlight: 'Best rate' },
  { name: 'IME Remit',     logo: '🔴', marginOverMid: 0.008,  fee: { pct: 0,      flat: 0 },    time: 'Instant',      url: 'https://imeremit.com.np',      highlight: 'Zero fee'  },
  { name: 'Prabhu Money',  logo: '🟠', marginOverMid: 0.010,  fee: { pct: 0,      flat: 0 },    time: 'Instant',      url: 'https://prabhutransfer.com',   highlight: null        },
  { name: 'Remitly',       logo: '🟢', marginOverMid: 0.007,  fee: { pct: 0,      flat: 3.99 }, time: 'Instant–4hr',  url: 'https://remitly.com',          highlight: null        },
  { name: 'Western Union', logo: '🟡', marginOverMid: 0.015,  fee: { pct: 0,      flat: 5 },    time: 'Instant–1hr',  url: 'https://westernunion.com',     highlight: null        },
  { name: 'MoneyGram',     logo: '🔵', marginOverMid: 0.018,  fee: { pct: 0,      flat: 4 },    time: '1–3 hrs',      url: 'https://moneygram.com',        highlight: null        },
]

const CURRENCIES = [
  { code: 'USD', flag: '🇺🇸', iso3: 'USD', unit: 1 },
  { code: 'GBP', flag: '🇬🇧', iso3: 'GBP', unit: 1 },
  { code: 'AUD', flag: '🇦🇺', iso3: 'AUD', unit: 1 },
  { code: 'EUR', flag: '🇪🇺', iso3: 'EUR', unit: 1 },
  { code: 'CAD', flag: '🇨🇦', iso3: 'CAD', unit: 1 },
  { code: 'JPY', flag: '🇯🇵', iso3: 'JPY', unit: 10 }, // NRB quotes per 10 JPY
  { code: 'QAR', flag: '🇶🇦', iso3: 'QAR', unit: 1 },
  { code: 'AED', flag: '🇦🇪', iso3: 'AED', unit: 1 },
  { code: 'SAR', flag: '🇸🇦', iso3: 'SAR', unit: 1 },
  { code: 'KWD', flag: '🇰🇼', iso3: 'KWD', unit: 1 },
  { code: 'MYR', flag: '🇲🇾', iso3: 'MYR', unit: 1 },
]

export default function RemittanceClient({ nrbRates, date, source, fallback }) {
  const [amount, setAmount]     = useState('500')
  const [currency, setCurrency] = useState('USD')

  const curr    = CURRENCIES.find(c => c.code === currency)
  const nrbData = nrbRates?.[curr?.iso3]
  const midRate = nrbData ? (nrbData.sell / nrbData.unit) : null
  const amtNum  = parseFloat(amount) || 0

  const results = midRate
    ? PROVIDERS.map(p => {
        const providerNPRrate = midRate * (1 - p.marginOverMid)
        const feeFC  = p.fee.flat + amtNum * p.fee.pct
        const netFC  = Math.max(amtNum - feeFC, 0)
        const received = netFC * providerNPRrate
        return { ...p, providerNPRrate, feeFC, received }
      }).sort((a, b) => b.received - a.received)
    : []

  const worst = results[results.length - 1]?.received || 0

  return (
    <ToolLayout
      title="Remittance Comparator"
      icon="💸"
      description="Live NRB rates — compare the best way to send money to Nepal"
    >
      {/* NRB rate badge */}
      {nrbData ? (
        <div className="flex items-center justify-between mb-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl text-sm">
          <div>
            <span className="text-slate-500">NRB official rate: </span>
            <span className="font-bold text-green-700 dark:text-green-400">
              1 {currency} = Rs. {(nrbData.sell / nrbData.unit).toFixed(2)}
            </span>
            <span className="text-xs text-slate-400 ml-2">(sell) / Rs. {(nrbData.buy / nrbData.unit).toFixed(2)} (buy)</span>
          </div>
          <div className="text-xs text-slate-400 text-right">
            {fallback ? '⚠️ Yesterday' : '✓ Today'}<br />{date}
          </div>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 rounded-xl text-sm text-amber-700 dark:text-amber-300">
          ⚠️ Could not load NRB rate for {currency}. Check connection or try another currency.
        </div>
      )}

      {/* Inputs */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1">
          <label className="text-xs text-slate-500 mb-1 block">You Send</label>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 text-lg font-semibold"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Currency</label>
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="h-[50px] mt-[1px] border border-slate-200 dark:border-slate-600 rounded-xl px-3 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 text-sm text-slate-500">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{amount} {currency}</span>
        <ArrowRight size={14} />
        <span className="font-semibold text-slate-700 dark:text-slate-300">NPR</span>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((p, i) => {
            const isBest = i === 0
            const loss   = p.received - worst
            return (
              <div
                key={p.name}
                className={`relative p-4 rounded-2xl border transition-all ${
                  isBest
                    ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-950'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                }`}
              >
                {isBest && (
                  <div className="absolute -top-2.5 left-4 flex items-center gap-1 bg-cyan-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    <Trophy size={10} /> Best Deal
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.logo}</span>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white text-sm">{p.name}</div>
                      <div className="text-xs text-slate-400">{p.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${isBest ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-white'}`}>
                      Rs. {p.received.toLocaleString('en-NP', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-slate-400">recipient gets</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex gap-3">
                    <span>
                      Rate: <strong className="text-slate-700 dark:text-slate-300">Rs.{p.providerNPRrate.toFixed(2)}/{currency}</strong>
                    </span>
                    <span>
                      Fee: <strong className="text-slate-700 dark:text-slate-300">
                        {p.fee.flat === 0 && p.fee.pct === 0
                          ? 'Free'
                          : p.fee.flat > 0
                          ? `${currency === 'USD' ? '$' : ''}${p.fee.flat} + ${(p.fee.pct * 100).toFixed(1)}%`
                          : `${(p.fee.pct * 100).toFixed(2)}%`}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.highlight && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">{p.highlight}</span>
                    )}
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-medium">
                      Send <ExternalLink size={10} />
                    </a>
                  </div>
                </div>

                {!isBest && loss > 20 && (
                  <div className="mt-1.5 text-xs text-red-500">
                    Rs. {loss.toFixed(0)} less than best option
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Source note */}
      <div className="mt-5 flex items-start gap-2 p-3 bg-slate-50 dark:bg-slate-700 rounded-xl text-xs text-slate-500">
        <Info size={13} className="shrink-0 mt-0.5" />
        <span>
          Exchange rates sourced directly from <strong>Nepal Rastra Bank (NRB)</strong> official API — {source}.
          Provider margins are estimates based on publicly listed rates; confirm exact rate on provider's site before sending.
        </span>
      </div>
    </ToolLayout>
  )
}