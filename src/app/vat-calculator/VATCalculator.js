'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

export default function VATCalculator() {
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState('add')
  const VAT_RATE = 0.13

  const base    = parseFloat(amount) || 0
  const vatAmt  = mode === 'add' ? base * VAT_RATE : base - base / (1 + VAT_RATE)
  const total   = mode === 'add' ? base + vatAmt : base

  return (
    <ToolLayout title="VAT Calculator" icon="🧾" description="Add or extract 13% VAT as per Nepal Revenue Authority">
      <div className="flex gap-2 mb-5 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl w-fit">
        {[['add','Add VAT'],['remove','Extract VAT']].map(([m,l]) => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-white dark:bg-slate-600 shadow text-teal-600' : 'text-slate-500'}`}>
            {l}
          </button>
        ))}
      </div>
      <label className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 block">
        {mode === 'add' ? 'Amount before VAT (Rs.)' : 'VAT-inclusive Amount (Rs.)'}
      </label>
      <input type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)}
        className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4" />
      {base > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[['Base Amount', mode === 'add' ? base : (base/(1+VAT_RATE)), 'text-slate-700 dark:text-slate-200'],
              ['VAT (13%)', vatAmt, 'text-teal-600'],
              ['Total', total, 'text-teal-700 font-bold']].map(([l,v,c]) => (
              <div key={l} className="p-4 bg-teal-50 dark:bg-teal-950 rounded-xl border border-teal-100 dark:border-teal-900">
                <div className={`text-xl font-bold ${c}`}>Rs. {v.toFixed(2)}</div>
                <div className="text-xs text-slate-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}