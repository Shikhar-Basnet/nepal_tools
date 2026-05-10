'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown, Calculator, AlertCircle, CheckCircle2 } from 'lucide-react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate()
const currentYear = new Date().getFullYear()

const faqs = [
  {
    q: 'How is age calculated exactly?',
    a: 'Age is calculated by finding the difference between your birth date and the target date in years, months, and days. The calculator accounts for varying month lengths and leap years to give a precise result.',
    tag: 'How it works',
  },
  {
    q: 'What does "Age at the Date of" mean?',
    a: 'This lets you calculate your age at any point in time — past, present, or future. By default it is set to today, but you can change it to find out how old you were on a specific date or how old you will be in the future.',
    tag: 'Usage',
  },
  {
    q: 'How are leap years handled?',
    a: 'Leap years are handled automatically. If your birthday is February 29, the calculator correctly accounts for the extra day in leap years and adjusts the calculation for non-leap years.',
    tag: 'How it works',
  },
  {
    q: 'Why does age matter for official documents in Nepal?',
    a: 'Many Nepali government services — citizenship applications, pension eligibility, school enrollment cutoffs, and job applications — require proof of exact age. Voter registration and retirement benefits also depend on precise age verification.',
    tag: 'Usage',
  },
  {
    q: 'Can I calculate age in BS (Nepali calendar)?',
    a: 'This calculator uses the AD (Gregorian) calendar for input. If your birth date is in BS, first convert it to AD using our BS/AD Date Converter, then use the result here.',
    tag: 'Technical',
  },
  {
    q: 'Why are total hours, minutes, and seconds shown?',
    a: 'These are fun statistics that give you a sense of scale — for example, a 25-year-old has lived over 200,000 hours. They are calculated from the total number of days difference, so they are approximate since exact birth time is not entered.',
    tag: 'Technical',
  },
  {
    q: 'What is the minimum and maximum date range supported?',
    a: 'The calculator supports birth dates from 1900 to 50 years into the future. For very old dates, results may be slightly off due to historical calendar changes. For typical use, the calculator is accurate for all modern dates.',
    tag: 'Technical',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden
      bg-white dark:bg-[#343a40]
      ${open
        ? 'border-gray-300 dark:border-gray-500'
        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
      }`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-3 p-4 text-left touch-manipulation"
      >
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
            {faq.tag}
          </span>
          <p className="text-[14px] font-medium leading-snug text-gray-800 dark:text-gray-200">
            {faq.q}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`shrink-0 mt-1.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`transition-all duration-200 ease-in-out overflow-hidden ${open ? 'max-h-48' : 'max-h-0'}`}>
        <div className="flex gap-3 px-4 pb-4">
          <div className="w-6 shrink-0" />
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

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
          className="border border-gray-200 dark:border-gray-500 rounded-xl px-2 py-2.5 bg-white dark:bg-[#343a40] text-[14px] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full transition-all"
        >
          {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
        </select>
        <select
          value={value.day}
          onChange={e => onChange({ ...value, day: +e.target.value })}
          className="border border-gray-200 dark:border-gray-500 rounded-xl px-2 py-2.5 bg-white dark:bg-[#343a40] text-[14px] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full transition-all"
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
            onChange({ ...value, yearStr: raw, year: isNaN(parsed) ? value.year : parsed })
          }}
          className="border border-gray-200 dark:border-gray-500 rounded-xl px-2 py-2.5 bg-white dark:bg-[#343a40] text-[14px] font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 w-full transition-all"
        />
      </div>
    </div>
  )
}

export default function AgeCalculator() {
  const today = new Date()
  const todayVal = {
    month: today.getMonth() + 1,
    day: today.getDate(),
    year: today.getFullYear(),
    yearStr: String(today.getFullYear()),
  }

  const [dob, setDob]       = useState(todayVal)
  const [target, setTarget] = useState(todayVal)
  const [result, setResult] = useState(null)
  const [error, setError]   = useState(null)

  const calculate = () => {
    setError(null)
    const birth = new Date(dob.year, dob.month - 1, dob.day)
    const end   = new Date(target.year, target.month - 1, target.day)

    if (birth > end) {
      setError('Date of birth cannot be after the target date.')
      setResult(null)
      return
    }

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

  const stats = result ? [
    { label: 'Months',  value: `${result.totalMonths.toLocaleString()} months ${result.days} days` },
    { label: 'Weeks',   value: `${result.totalWeeks.toLocaleString()} weeks ${result.remDays} days` },
    { label: 'Days',    value: `${result.totalDays.toLocaleString()} days` },
    { label: 'Hours',   value: `${result.totalHours.toLocaleString()} hours` },
    { label: 'Minutes', value: `${result.totalMinutes.toLocaleString()} minutes` },
    { label: 'Seconds', value: `${result.totalSeconds.toLocaleString()} seconds` },
  ] : []

  return (
    <div>
      <ToolLayout
        title="Age Calculator"
        icon="🎂"
        description="Find your exact age in years, months, and days — plus total weeks, hours, minutes, and seconds."
      >
        <div className="space-y-5">

          {/* Date pickers */}
          <div className="bg-gray-50 dark:bg-[#343a40] rounded-2xl border border-gray-200 dark:border-gray-500 p-4 space-y-4">
            <DatePicker label="Date of Birth"      value={dob}    onChange={setDob}    />
            <div className="h-px bg-gray-200 dark:bg-gray-600" />
            <DatePicker label="Age at the Date of" value={target} onChange={setTarget} />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800">
              <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button onClick={calculate} className="btn-primary flex items-center justify-center gap-2">
            <Calculator size={16} />
            Calculate Age
          </button>

          {/* Result */}
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

      {/* ── FAQ section ── */}
      <div className="max-w-3xl mx-auto px-4 pb-12 mt-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-1">
              Learn More
            </p>
            <h2 className="text-[20px] font-semibold text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <p className="mt-6 text-center text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
          Still have questions?{' '}
          <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Contact us
          </a>{' '}
          and we'll help you out.
        </p>
      </div>
    </div>
  )
}