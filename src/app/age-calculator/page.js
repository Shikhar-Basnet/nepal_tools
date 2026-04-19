'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate()
const currentYear = new Date().getFullYear()

// ✅ Defined OUTSIDE the parent component — no remount on re-render
const DatePicker = ({ label, value, onChange }) => {
  const daysInMonth = getDaysInMonth(value.month, value.year)
  return (
    <div className="space-y-1">
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </span>
      <div className="grid grid-cols-3 gap-2">
        <select
          value={value.month}
          onChange={e => onChange({ ...value, month: +e.target.value })}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
        </select>

        <select
          value={value.day}
          onChange={e => onChange({ ...value, day: +e.target.value })}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        >
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d =>
            <option key={d} value={d}>{d}</option>
          )}
        </select>

        <input
          type="number"
          value={value.yearStr}
          min={1900}
          max={currentYear + 50}
          onChange={e => {
            const raw = e.target.value
            const parsed = parseInt(raw)
            onChange({
              ...value,
              yearStr: raw,
              year: isNaN(parsed) ? value.year : parsed,
            })
          }}
          className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-2 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
        />
      </div>
    </div>
  )
}

export default function AgeCalculator() {
  const today = new Date()
  const todayVal = {
    month:   today.getMonth() + 1,
    day:     today.getDate(),
    year:    today.getFullYear(),
    yearStr: String(today.getFullYear()),
  }

  const [dob,    setDob]    = useState(todayVal)
  const [target, setTarget] = useState(todayVal)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const birth = new Date(dob.year,    dob.month    - 1, dob.day)
    const end   = new Date(target.year, target.month - 1, target.day)
    if (birth > end) return

    let years  = end.getFullYear() - birth.getFullYear()
    let months = end.getMonth()    - birth.getMonth()
    let days   = end.getDate()     - birth.getDate()

    if (days < 0)   { months--; days   += getDaysInMonth(end.getMonth(), end.getFullYear()) }
    if (months < 0) { years--;  months += 12 }

    const totalMs      = end - birth
    const totalDays    = Math.floor(totalMs / 86400000)
    const totalWeeks   = Math.floor(totalDays / 7)
    const remDays      = totalDays % 7
    const totalMonths  = years * 12 + months
    const totalHours   = Math.floor(totalMs / 3600000)
    const totalMinutes = Math.floor(totalMs / 60000)
    const totalSeconds = Math.floor(totalMs / 1000)

    setResult({ years, months, days, totalDays, totalWeeks, remDays, totalMonths, totalHours, totalMinutes, totalSeconds })
  }

  return (
    <ToolLayout title="Age Calculator" icon="🎂" description="Find your exact age in years, months, and days">
      <div className="space-y-4">
        <DatePicker label="Date of Birth"      value={dob}    onChange={setDob}    />
        <DatePicker label="Age at the Date of" value={target} onChange={setTarget} />

        <button onClick={calculate} className="w-full btn-primary">
          Calculate
        </button>

        {result && (
          <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Result</p>
            <div className="space-y-1.5 text-sm">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                Age: {result.years} years {result.months} months {result.days} days
              </p>
              {[
                `${result.totalMonths.toLocaleString()} months ${result.days} days`,
                `${result.totalWeeks.toLocaleString()} weeks ${result.remDays} days`,
                `${result.totalDays.toLocaleString()} days`,
                `${result.totalHours.toLocaleString()} hours`,
                `${result.totalMinutes.toLocaleString()} minutes`,
                `${result.totalSeconds.toLocaleString()} seconds`,
              ].map(line => (
                <p key={line} className="text-gray-500 dark:text-gray-400">
                  or {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}