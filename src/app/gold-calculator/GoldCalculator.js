'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How is the gold value calculated?',
    a: 'The calculator converts your quantity into Tola, then multiplies it by the current gold price per Tola and adjusts the value based on the selected purity.',
    tag: 'How it works',
  },
  {
    q: 'What is a Tola?',
    a: 'Tola is the traditional gold measurement unit commonly used in Nepal and India. 1 Tola equals approximately 11.6638 grams.',
    tag: 'Usage',
  },
  {
    q: 'Why does purity affect the price?',
    a: 'Higher purity gold contains more actual gold content. For example, 24k is pure gold, while 22k and 18k contain alloy metals, reducing their value proportionally.',
    tag: 'Technical',
  },
  {
    q: 'Can I calculate value in grams or Ratti?',
    a: 'Yes. The calculator automatically converts Gram and Ratti into Tola before calculating the estimated value.',
    tag: 'Usage',
  },
  {
    q: 'Are making charges included?',
    a: 'No. This calculator estimates only the raw gold value based on market price and purity. Jewelry making charges and taxes are not included.',
    tag: 'Technical',
  },
  {
    q: 'Why do gold prices change daily in Nepal?',
    a: 'Gold prices fluctuate based on international market rates, currency exchange rates, and local demand within Nepal.',
    tag: 'Learn More',
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

export default function GoldCalculator() {
  const GRAMS = {
    Tola: 11.6638,
    Gram: 1,
    Ratti: 0.1215,
  }

  const purities = {
    '24k': 1,
    '22k': 22 / 24,
    '18k': 18 / 24,
    '14k': 14 / 24,
  }

  const [qty, setQty] = useState('')
  const [unit, setUnit] = useState('Tola')
  const [purity, setPurity] = useState('24k')
  const [rate, setRate] = useState('')

  const grams = (parseFloat(qty) || 0) * GRAMS[unit]
  const tolas = grams / 11.6638

  const value =
    rate ? tolas * parseFloat(rate) * purities[purity] : 0

  return (
    <div>
      <ToolLayout
        title="Gold Calculator"
        icon="🥇"
        description="Calculate gold value in Tola, Gram, and Ratti based on purity and rate"
      >
        <div className="space-y-5">

          {/* Inputs */}
          <div className="bg-gray-50 dark:bg-[#343a40] rounded-2xl border border-gray-200 dark:border-gray-500 p-4 space-y-4">

            {/* Rate */}
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Price per Tola (Rs.)
              </label>

              <input
                type="number"
                placeholder="e.g. 135000"
                value={rate}
                onChange={e => setRate(e.target.value)}
                className="w-full mt-1 border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-2.5 bg-white dark:bg-[#343a40] text-[14px] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              />
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-600" />

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
                  className="w-full mt-1 border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-2.5 bg-white dark:bg-[#343a40] text-[14px] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Unit
                </label>

                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full mt-1 border border-gray-200 dark:border-gray-500 rounded-xl px-3 py-2.5 bg-white dark:bg-[#343a40] text-[14px] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                >
                  {Object.keys(GRAMS).map(u => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-px bg-gray-200 dark:bg-gray-600" />

            {/* Purity */}
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                Purity
              </label>

              <div className="grid grid-cols-4 gap-2">
                {Object.keys(purities).map(p => (
                  <button
                    key={p}
                    onClick={() => setPurity(p)}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all
                    ${
                      purity === p
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'border-gray-200 dark:border-gray-500 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          {value > 0 && (
            <div className="p-5 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-100 dark:border-blue-900">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Estimated Value
              </p>

              <div className="space-y-1.5 text-sm">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  Rs.{' '}
                  {value.toLocaleString('en-NP', {
                    maximumFractionDigits: 2,
                  })}
                </p>

                <p className="text-gray-500 dark:text-gray-400">
                  {qty} {unit} = {tolas.toFixed(4)} Tola ({purity})
                </p>

                <p className="text-gray-500 dark:text-gray-400">
                  Approx. {grams.toFixed(2)} grams
                </p>
              </div>
            </div>
          )}
        </div>
      </ToolLayout>

      {/* FAQ Section */}
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