'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

export default function GoldCalculator() {
  const GRAMS = { Tola: 11.6638, Gram: 1, Ratti: 0.1215 }
  const purities = { '24k': 1, '22k': 22 / 24, '18k': 18 / 24, '14k': 14 / 24 }

  const [qty, setQty] = useState('')
  const [unit, setUnit] = useState('Tola')
  const [purity, setPurity] = useState('24k')
  const [rate, setRate] = useState('')

  const grams = (parseFloat(qty) || 0) * GRAMS[unit]
  const tolas = grams / 11.6638
  const value =
    rate ? tolas * parseFloat(rate) * purities[purity] : 0

  return (
    <ToolLayout
      title="Gold Calculator"
      icon="🥇"
      description="Calculate gold value in Tola, Gram, and Ratti based on purity and rate"
    >
      <div className="space-y-4">

        {/* Rate input */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Price per Tola (Rs.)
          </label>
          <input
            type="number"
            placeholder="e.g. 135000"
            value={rate}
            onChange={e => setRate(e.target.value)}
            className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Quantity + Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Quantity
            </label>
            <input
              type="number"
              placeholder="2.5"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Unit
            </label>
            <select
              value={unit}
              onChange={e => setUnit(e.target.value)}
              className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {Object.keys(GRAMS).map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Purity buttons */}
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(purities).map(p => (
            <button
              key={p}
              onClick={() => setPurity(p)}
              className={`py-2 rounded-lg text-sm font-medium border transition ${
                purity === p
                  ? 'bg-yellow-400 text-white border-yellow-400'
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Result */}
        {value > 0 && (
          <div className="p-5 bg-yellow-50 dark:bg-yellow-950 rounded-xl border border-yellow-200 dark:border-yellow-900 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Estimated Value
            </p>

            <p className="text-3xl font-bold text-yellow-600">
              Rs. {value.toLocaleString('en-NP', { maximumFractionDigits: 2 })}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {qty} {unit} = {tolas.toFixed(4)} Tola ({purity})
            </p>
          </div>
        )}

      </div>
    </ToolLayout>
  )
}