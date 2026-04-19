'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const UNITS = {
  'Ropani':  5476,
  'Aana':    342.25,
  'Paisa':   85.5625,
  'Daam':    21.390625,
  'Bigha':   72900,
  'Kattha':  3645,
  'Dhur':    182.25,
  'Sq. Ft':  1,
  'Sq. M':   10.7639,
}

const UnitSelect = ({ label, val, setter }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">{label}</label>
    <select value={val} onChange={e => setter(e.target.value)}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <optgroup label="Hilly (Pahad)">
        {['Ropani','Aana','Paisa','Daam'].map(u => <option key={u}>{u}</option>)}
      </optgroup>
      <optgroup label="Terai">
        {['Bigha','Kattha','Dhur'].map(u => <option key={u}>{u}</option>)}
      </optgroup>
      <optgroup label="Metric / Common">
        {['Sq. Ft','Sq. M'].map(u => <option key={u}>{u}</option>)}
      </optgroup>
    </select>
  </div>
)

export default function LandConverter() {
  const [value,  setValue]  = useState('')
  const [from,   setFrom]   = useState('Ropani')
  const [to,     setTo]     = useState('Sq. Ft')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const num = parseFloat(value)
    if (!value || isNaN(num)) return
    const res = ((num * UNITS[from]) / UNITS[to])
      .toFixed(6)
      .replace(/\.?0+$/, '')
    setResult({ input: num, from, to, value: res })
  }

  return (
    <ToolLayout title="Land Unit Converter" icon="🗺️" description="Convert between Nepali and metric land measurement units">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">Value</label>
          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <UnitSelect label="From" val={from} setter={setFrom} />
          <UnitSelect label="To"   val={to}   setter={setTo}   />
        </div>

        <button onClick={calculate} className="w-full btn-primary">
          Convert
        </button>

        {result && (
          <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {result.input} {result.from} =
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
              {result.value} <span className="text-xl font-medium">{result.to}</span>
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}