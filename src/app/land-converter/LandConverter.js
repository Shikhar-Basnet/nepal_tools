'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown } from 'lucide-react'

const UNITS = {
  'Ropani': 5476,
  'Aana': 342.25,
  'Paisa': 85.5625,
  'Daam': 21.390625,
  'Bigha': 72900,
  'Kattha': 3645,
  'Dhur': 182.25,
  'Sq. Ft': 1,
  'Sq. M': 10.7639,
}

const faqs = [
  {
    q: 'What is Ropani in square feet?',
    a: '1 Ropani equals 5,476 square feet. It is one of the most commonly used land measurement units in the hilly regions of Nepal.',
    tag: 'Ropani',
  },
  {
    q: 'How many Aana are in 1 Ropani?',
    a: '1 Ropani equals 16 Aana. Similarly, 1 Aana = 4 Paisa and 1 Paisa = 4 Daam.',
    tag: 'Conversion',
  },
  {
    q: 'What is the difference between Ropani and Bigha?',
    a: 'Ropani is mainly used in Nepal’s hilly regions, while Bigha is commonly used in the Terai region. They represent different land measurement systems.',
    tag: 'Basics',
  },
  {
    q: 'How many square feet are in 1 Kattha?',
    a: '1 Kattha equals 3,645 square feet. Kattha is widely used for land measurement in the Terai region of Nepal.',
    tag: 'Kattha',
  },
  {
    q: 'Can I convert square meters to Nepali land units?',
    a: 'Yes. This converter supports Square Meter (Sq. M) to Ropani, Aana, Kattha, Bigha, and other Nepali land units instantly.',
    tag: 'Metric',
  },
  {
    q: 'Which land units are used in Nepal?',
    a: 'Nepal mainly uses Ropani, Aana, Paisa, Daam in hilly regions and Bigha, Kattha, Dhur in the Terai region. Metric units like Square Feet and Square Meter are also commonly used.',
    tag: 'Usage',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden
      bg-white dark:bg-[#343a40]
      ${
        open
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
          <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
            {faq.tag}
          </span>

          <p className="text-[14px] font-medium leading-snug text-gray-800 dark:text-gray-200">
            {faq.q}
          </p>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 mt-1.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          open ? 'max-h-48' : 'max-h-0'
        }`}
      >
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

const UnitSelect = ({ label, val, setter }) => (
  <div>
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
      {label}
    </label>

    <select
      value={val}
      onChange={e => setter(e.target.value)}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <optgroup label="Hilly (Pahad)">
        {['Ropani', 'Aana', 'Paisa', 'Daam'].map(u => (
          <option key={u}>{u}</option>
        ))}
      </optgroup>

      <optgroup label="Terai">
        {['Bigha', 'Kattha', 'Dhur'].map(u => (
          <option key={u}>{u}</option>
        ))}
      </optgroup>

      <optgroup label="Metric / Common">
        {['Sq. Ft', 'Sq. M'].map(u => (
          <option key={u}>{u}</option>
        ))}
      </optgroup>
    </select>
  </div>
)

export default function LandConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('Ropani')
  const [to, setTo] = useState('Sq. Ft')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const num = parseFloat(value)

    if (!value || isNaN(num)) return

    const res = ((num * UNITS[from]) / UNITS[to])
      .toFixed(6)
      .replace(/\.?0+$/, '')

    setResult({
      input: num,
      from,
      to,
      value: res,
    })
  }

  return (
    <div>
      <ToolLayout
        title="Land Unit Converter"
        icon="🗺️"
        description="Convert between Nepali and metric land measurement units"
      >
        <div className="space-y-4">

          {/* Value input */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">
              Value
            </label>

            <input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && calculate()}
              className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Unit selectors */}
          <div className="grid grid-cols-2 gap-3">
            <UnitSelect
              label="From"
              val={from}
              setter={setFrom}
            />

            <UnitSelect
              label="To"
              val={to}
              setter={setTo}
            />
          </div>

          {/* Convert button */}
          <button
            onClick={calculate}
            className="w-full btn-primary"
          >
            Convert
          </button>

          {/* Result */}
          {result && (
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {result.input} {result.from} =
              </p>

              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {result.value}{' '}
                <span className="text-xl font-medium">
                  {result.to}
                </span>
              </p>
            </div>
          )}
        </div>
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

        {/* FAQ cards */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
            />
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
          Need help with Nepali land measurements?{' '}
          <a
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Contact us
          </a>{' '}
          and we'll help you out.
        </p>
      </div>
    </div>
  )
}