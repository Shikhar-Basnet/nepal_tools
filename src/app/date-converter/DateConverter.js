'use client'
import { useState } from 'react'
import NepaliDate from 'nepali-date-converter'
import ToolLayout from '@/components/ToolLayout'

const BS_MONTHS = ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra']
const AD_MONTHS = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }))

const getDefaultInput = (mode) => {
  const today = new Date()
  const currentNepali = new NepaliDate(today)
  return mode === 'bs-to-ad'
    ? { year: String(currentNepali.getYear()), month: String(currentNepali.getMonth() + 1), day: String(currentNepali.getDate()) }
    : { year: String(today.getFullYear()), month: String(today.getMonth() + 1), day: String(today.getDate()) }
}

export default function DateConverter() {
  const [mode, setMode] = useState('bs-to-ad')
  const [input, setInput] = useState(() => getDefaultInput('bs-to-ad'))
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleModeChange = (m) => {
    setMode(m)
    setInput(getDefaultInput(m))
    setResult(null)
    setError(null)
  }

  const convert = () => {
    setError(null)
    setResult(null)

    const y = parseInt(input.year)
    const m = parseInt(input.month)
    const d = parseInt(input.day)

    if (!y || !m || !d) {
      setError('Please fill in all fields.')
      return
    }

    try {
      if (mode === 'bs-to-ad') {
        const nd = new NepaliDate(y, m - 1, d)
        const adDate = nd.toJsDate()
        setResult({
          primary: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          secondary: `${y}, ${BS_MONTHS[m - 1]} ${d}`,
        })
      } else {
        const adDate = new Date(y, m - 1, d)
        const nd = new NepaliDate(adDate)
        const bsYear = nd.getYear()
        const bsMonth = nd.getMonth()
        const bsDay = nd.getDate()
        setResult({
          primary: `${bsYear}, ${BS_MONTHS[bsMonth]} ${bsDay}`,
          secondary: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        })
      }
    } catch (err) {
      setError('Invalid date. Please check your input and try again.')
    }
  }

  const months = mode === 'bs-to-ad' ? BS_MONTHS : AD_MONTHS

  return (
    <ToolLayout title="Date Converter" icon="📅" description="Convert between BS and AD dates">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit border border-gray-200 dark:border-gray-700">
        {['bs-to-ad', 'ad-to-bs'].map(m => (
          <button key={m} onClick={() => handleModeChange(m)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === m ? 'bg-white dark:bg-gray-700 shadow font-bold text-gray-700 dark:text-gray-200' : 'text-gray-500'}`}>
            {m === 'bs-to-ad' ? 'BS → AD' : 'AD → BS'}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-gray-600 dark:text-gray-200">
        <div>
          <label className="text-xs mb-1 block">Year</label>
          <input type="number" value={input.year}
            onChange={e => setInput({ ...input, year: e.target.value })}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Month</label>
          <select value={input.month} onChange={e => setInput({ ...input, month: e.target.value })}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Day</label>
          <input type="number" value={input.day}
            onChange={e => setInput({ ...input, day: e.target.value })}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <button
        onClick={convert}
        className="w-full btn-primary">Convert Date
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded-xl border border-red-400 dark:border-red-500">
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{mode === 'bs-to-ad' ? 'A.D. Date' : 'B.S. Date'}</p>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">{result.primary}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">From: {result.secondary}</p>
        </div>
      )}
    </ToolLayout>
  )
}