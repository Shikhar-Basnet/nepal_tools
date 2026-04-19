'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

// 1 Tola = 11.6638 grams, 1 Ratti = 0.1215 grams
const GRAMS = { 'Tola': 11.6638, 'Gram': 1, 'Ratti': 0.1215 }

export default function GoldCalculator() {
  const [qty, setQty] = useState('')
  const [unit, setUnit] = useState('Tola')
  const [purity, setPurity] = useState('24k')
  const [rate, setRate] = useState('')  // price per tola in NPR

  const purities = { '24k': 1, '22k': 22/24, '18k': 18/24, '14k': 14/24 }
  const grams = (parseFloat(qty) || 0) * GRAMS[unit]
  const tolas = grams / 11.6638
  const value = rate ? tolas * parseFloat(rate) * purities[purity] : 0

  return (
    <ToolLayout title="Gold Price Calculator" icon="🥇" description="Calculate gold value in Tola, Gram, or Ratti at Nepal rates">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">Price per Tola (Rs.) — Check FENEGOSIDA</label>
          <input type="number" placeholder="e.g. 135000" value={rate} onChange={e => setRate(e.target.value)}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-300" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Quantity</label>
            <input type="number" placeholder="e.g. 2.5" value={qty} onChange={e => setQty(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-300" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Unit</label>
            <select value={unit} onChange={e => setUnit(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 focus:outline-none">
              {Object.keys(GRAMS).map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Purity</label>
          <div className="flex gap-2">
            {Object.keys(purities).map(p => (
              <button key={p} onClick={() => setPurity(p)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all border ${purity === p ? 'btn-primary' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        {value > 0 && (
          <div className="p-5 bg-teal-50 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <p className="text-sm text-gray-500">Estimated Value</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">Rs. {value.toLocaleString('en-NP', {maximumFractionDigits: 2})}</p>
            <p className="text-xs text-gray-400 mt-2">{qty} {unit} of {purity} gold ≈ {grams.toFixed(4)} grams = {tolas.toFixed(4)} Tola</p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}