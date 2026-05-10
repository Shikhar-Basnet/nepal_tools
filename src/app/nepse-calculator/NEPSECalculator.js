'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const getBrokerRate = (amount) => {
  if (amount <= 50000)    return 0.0036
  if (amount <= 500000)   return 0.0033
  if (amount <= 2000000)  return 0.00306
  if (amount <= 10000000) return 0.0027
  return 0.00243
}

const fmt = (n) => 'Rs. ' + parseFloat(n).toLocaleString('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// ✅ Outside the parent component
const Field = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">{label}</label>
    <input type="number" placeholder={placeholder} value={value}
      onChange={onChange}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
  </div>
)

export default function NEPSECalculator() {
  const [f, setF] = useState({ buyPrice: '', sellPrice: '', qty: '', longTerm: false })
  const [r, setR] = useState(null)

  const calc = () => {
    const buy  = parseFloat(f.buyPrice)
    const sell = parseFloat(f.sellPrice)
    const qty  = parseInt(f.qty)
    if (!buy || !sell || !qty) return

    const buyAmount  = buy * qty
    const sellAmount = sell * qty

    const buyBroker  = Math.max(buyAmount  * getBrokerRate(buyAmount),  10)
    const sellBroker = Math.max(sellAmount * getBrokerRate(sellAmount), 10)

    const sebonBuy  = buyAmount  * 0.00015
    const sebonSell = sellAmount * 0.00015

    const dpBuy  = 5
    const dpSell = 25

    const cgtRate = f.longTerm ? 0.05 : 0.075
    const cgt = sell > buy ? (sell - buy) * qty * cgtRate : 0

    const totalCost   = buyAmount  + buyBroker  + sebonBuy  + dpBuy
    const totalReturn = sellAmount - sellBroker - sebonSell - dpSell - cgt
    const profit      = totalReturn - totalCost

    setR({ buyAmount, sellAmount, buyBroker, sellBroker, sebonBuy, sebonSell, dpBuy, dpSell, cgt, totalCost, totalReturn, profit, cgtRate })
  }

  return (
    <ToolLayout title="NEPSE Share Calculator" icon="📈" description="Calculate profit/loss from NEPSE share trading with all charges">
      <div className="space-y-4">

        <div className="grid grid-cols-2 gap-3">
          <Field label="Buy Price (Rs.)"  placeholder="e.g. 500" value={f.buyPrice}  onChange={e => setF({ ...f, buyPrice:  e.target.value })} />
          <Field label="Sell Price (Rs.)" placeholder="e.g. 650" value={f.sellPrice} onChange={e => setF({ ...f, sellPrice: e.target.value })} />
          <Field label="Quantity"         placeholder="e.g. 100" value={f.qty}       onChange={e => setF({ ...f, qty:       e.target.value })} />

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Holding Period</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {[['Short-term', false], ['Long-term', true]].map(([label, val]) => (
                <button key={label} onClick={() => setF({ ...f, longTerm: val })}
                  className={`flex-1 py-2.5 text-xs font-medium transition-all ${
                    f.longTerm === val
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              CGT: {f.longTerm ? '5%' : '7.5%'} ({f.longTerm ? '>365' : '<365'} days)
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          ℹ️ Broker commission auto-calculated per SEBON slab (0.243%-0.36%, updated Jestha, 2081)
        </p>

        <button onClick={calc} className="w-full btn-primary">
          Calculate
        </button>

        {r && (
          <div className="space-y-3">
            <div className={`p-5 rounded-xl text-center border ${
              r.profit >= 0
                ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
            }`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                Net {r.profit >= 0 ? 'Profit' : 'Loss'}
              </p>
              <p className={`text-3xl font-bold ${r.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {fmt(Math.abs(r.profit))}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {r.profit >= 0 ? '+' : '-'}{Math.abs((r.profit / r.totalCost) * 100).toFixed(2)}% return on investment
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                ['Total Buy Cost',    r.totalCost],
                ['Total Sell Return', r.totalReturn],
              ].map(([l, v]) => (
                <div key={l} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <p className="text-xs text-gray-500 mb-0.5">{l}</p>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-100">{fmt(v)}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-3 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Fee Breakdown</p>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  ['Broker (Buy)',          r.buyBroker],
                  ['Broker (Sell)',         r.sellBroker],
                  ['SEBON Fee (Buy)',       r.sebonBuy],
                  ['SEBON Fee (Sell)',      r.sebonSell],
                  ['Name Transfer (Buy)',   r.dpBuy],
                  ['DP Charge (Sell)',      r.dpSell],
                  [`CGT (${r.cgtRate * 100}%)`, r.cgt],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between items-center px-3 py-2.5 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{l}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-200">{fmt(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}