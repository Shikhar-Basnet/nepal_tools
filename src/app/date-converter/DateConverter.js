'use client'
import { useState } from 'react'
import NepaliDate from 'nepali-date-converter'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown, ArrowLeftRight, AlertCircle, CheckCircle2 } from 'lucide-react'

const BS_MONTHS = ['Baishakh','Jestha','Ashadh','Shrawan','Bhadra','Ashwin','Kartik','Mangsir','Poush','Magh','Falgun','Chaitra']
const AD_MONTHS = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('en', { month: 'long' }))

const getDefaultInput = (mode) => {
  const today = new Date()
  const nd = new NepaliDate(today)
  return mode === 'bs-to-ad'
    ? { year: String(nd.getYear()), month: String(nd.getMonth() + 1), day: String(nd.getDate()) }
    : { year: String(today.getFullYear()), month: String(today.getMonth() + 1), day: String(today.getDate()) }
}

const faqs = [
  {
    q: 'What is Bikram Sambat (BS)?',
    a: 'Bikram Sambat (BS) is the official calendar of Nepal, named after King Vikramaditya. It runs approximately 56 years and 8.5 months ahead of the Gregorian (AD) calendar. For example, AD 2025 corresponds to BS 2081/82.',
    tag: 'Basics',
  },
  {
    q: 'How many days ahead is BS compared to AD?',
    a: 'The BS calendar is approximately 56 years and 8-9 months ahead of AD. However, the exact offset varies because BS months have different lengths (29–32 days) that change each year, making a simple subtraction inaccurate.',
    tag: 'Basics',
  },
  {
    q: "Why can't I just add 56 years to convert BS to AD?",
    a: 'Because BS months have variable lengths (29 to 32 days) that differ from year to year. The exact conversion requires a lookup table mapping each BS month to its AD equivalent. Adding 56 years gives only an approximate result.',
    tag: 'How it works',
  },
  {
    q: "What is today's BS date?",
    a: "The converter automatically loads today's BS date when you open it in BS → AD mode. Switch to AD → BS and the current Gregorian date will be pre-filled — click Convert to see today's BS equivalent.",
    tag: 'Usage',
  },
  {
    q: 'Where is BS/AD conversion used in Nepal?',
    a: 'BS dates are used on citizenship certificates, land deeds, school certificates, government forms, and bank documents. AD dates are required for passports, visa applications, international university admissions, and foreign bank transactions.',
    tag: 'Usage',
  },
  {
    q: 'What date range does this converter support?',
    a: 'This converter supports BS dates from 2000 BS to 2090 BS (approximately AD 1943 to AD 2033), covering the range of the standard Nepal Government conversion table.',
    tag: 'Technical',
  },
  {
    q: 'Is this converter accurate for official use?',
    a: 'Yes — it uses the nepali-date-converter library based on the official Nepal Government BS calendar table. Results match the Department of Civil Registration. For critical documents, verify with the issuing authority.',
    tag: 'Accuracy',
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
        {/* Number badge */}
        <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300`}>
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
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function DateConverter() {
  const [mode, setMode]     = useState('bs-to-ad')
  const [input, setInput]   = useState(() => getDefaultInput('bs-to-ad'))
  const [result, setResult] = useState(null)
  const [error, setError]   = useState(null)

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
    if (!y || !m || !d) { setError('Please fill in all fields.'); return }
    try {
      if (mode === 'bs-to-ad') {
        const nd = new NepaliDate(y, m - 1, d)
        const adDate = nd.toJsDate()
        setResult({
          label: 'Anno Domini (A.D.)',
          primary: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          weekday: adDate.toLocaleDateString('en-US', { weekday: 'long' }),
          secondary: `${BS_MONTHS[m - 1]} ${d}, ${y}  B.S.`,
        })
      } else {
        const adDate = new Date(y, m - 1, d)
        const nd = new NepaliDate(adDate)
        setResult({
          label: 'Bikram Sambat (B.S.)',
          primary: `${nd.getYear()} ${BS_MONTHS[nd.getMonth()]} ${nd.getDate()}`,
          weekday: adDate.toLocaleDateString('en-US', { weekday: 'long' }),
          secondary: adDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        })
      }
    } catch {
      setError('Invalid date. Please check your input and try again.')
    }
  }

  const months = mode === 'bs-to-ad' ? BS_MONTHS : AD_MONTHS
  const inputLabel = mode === 'bs-to-ad' ? 'Bikram Sambat (BS)' : 'Anno Domini (AD)'

  return (
    <div>
      <ToolLayout
        title="BS / AD Date Converter"
        icon="📅"
        description="Convert between Bikram Sambat (BS) and Anno Domini (AD) calendar dates instantly and accurately."
      >

        {/* ── Mode selector ── */}
        <div className="flex items-center justify-between mb-6 p-1 bg-gray-100 dark:bg-[#343a40] rounded-2xl border border-gray-200 dark:border-gray-500">
          {[
            { id: 'bs-to-ad', label: 'BS → AD', sub: 'Nepali to English' },
            { id: 'ad-to-bs', label: 'AD → BS', sub: 'English to Nepali' },
          ].map(m => (
            <button key={m.id} onClick={() => handleModeChange(m.id)}
              className={`flex-1 flex flex-col items-center py-2.5 px-4 rounded-xl transition-all duration-150
                ${mode === m.id
                  ? 'bg-white dark:bg-[#495057] shadow-sm text-gray-900 dark:text-gray-100'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}>
              <span className="text-[15px] font-semibold tracking-wide">{m.label}</span>
              <span className={`text-[11px] font-medium mt-0.5 ${mode === m.id ? 'text-blue-500 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'}`}>
                {m.sub}
              </span>
            </button>
          ))}
        </div>

        {/* ── Input section ── */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            Enter {inputLabel} Date
          </p>
          <div className="grid grid-cols-3 gap-3">

            {/* Year */}
            <div className="col-span-1">
              <label className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Year</label>
              <input
                type="number"
                value={input.year}
                onChange={e => setInput({ ...input, year: e.target.value })}
                placeholder={mode === 'bs-to-ad' ? '2081' : '2025'}
                className="w-full border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-3 text-[15px] font-semibold bg-white dark:bg-[#343a40] text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>

            {/* Month */}
            <div className="col-span-1">
              <label className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Month</label>
              <select
                value={input.month}
                onChange={e => setInput({ ...input, month: e.target.value })}
                className="w-full border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-3 text-[14px] font-medium bg-white dark:bg-[#343a40] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              >
                {months.map((m, i) => (
                  <option key={i} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>

            {/* Day */}
            <div className="col-span-1">
              <label className="text-[12px] font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Day</label>
              <input
                type="number"
                value={input.day}
                onChange={e => setInput({ ...input, day: e.target.value })}
                placeholder="1"
                min="1"
                max="32"
                className="w-full border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-3 text-[15px] font-semibold bg-white dark:bg-[#343a40] text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* ── Convert button ── */}
        <button onClick={convert} className="btn-primary flex items-center justify-center gap-2">
          <ArrowLeftRight size={16} />
          Convert Date
        </button>

        {/* ── Error ── */}
        {error && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-800">
            <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-[13px] text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* ── Result ── */}
        {result && (
          <div className="mt-5 rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-800">
            {/* Top strip */}
            <div className="bg-blue-600 dark:bg-blue-700 px-5 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-blue-200" />
                <span className="text-[11px] font-semibold text-blue-100 uppercase tracking-widest">
                  {result.label}
                </span>
              </div>
              <span className="text-[11px] text-blue-300 font-medium">
                {result.weekday}
              </span>
            </div>

            {/* Result body */}
            <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/40 dark:to-[#212529] px-6 py-6 text-center">
              <p className="text-[20px] md:text-[28px] font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight mb-3">
                {result.primary}
              </p>
              {/* Divider */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-blue-100 dark:bg-blue-900" />
                <span className="text-[11px] text-blue-400 dark:text-blue-500 font-medium uppercase tracking-widest">converted from</span>
                <div className="flex-1 h-px bg-blue-100 dark:bg-blue-900" />
              </div>
              <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium">
                {result.secondary}
              </p>
            </div>
          </div>
        )}

      </ToolLayout>

      {/* ── FAQ section ── */}
      <div className="max-w-3xl mx-auto px-4 pb-12 mt-8">

        {/* Section header */}
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

        {/* FAQ cards — each is its own card */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i}  />
          ))}
        </div>

        {/* Footer note */}
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