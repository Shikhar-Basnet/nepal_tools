'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What is the current VAT rate in Nepal?',
    a: 'The standard Value Added Tax (VAT) rate in Nepal is 13%, as set by the Inland Revenue Department (IRD) under the VAT Act, 2052. This flat rate applies to most goods and services sold within Nepal.',
    tag: 'Basics',
  },
  {
    q: 'How do you calculate VAT in Nepal?',
    a: 'To add VAT: multiply the base amount by 0.13 to get the VAT, then add it to the base amount for the total. To extract VAT from a VAT-inclusive price: divide the total by 1.13, then subtract that from the total to find the VAT portion.',
    tag: 'How it works',
  },
  {
    q: 'What is the difference between VAT-inclusive and VAT-exclusive price?',
    a: 'A VAT-exclusive price shows the base cost before the 13% tax is added — common on wholesale quotes and B2B invoices. A VAT-inclusive price already has the 13% built in — this is what customers typically see on retail receipts and price tags.',
    tag: 'Basics',
  },
  {
    q: 'Who needs to register for VAT in Nepal?',
    a: 'Businesses with annual transactions exceeding the IRD threshold (currently Rs. 50 lakhs for goods and Rs. 20 lakhs for services) must register for VAT. Certain professions and import/export businesses are required to register regardless of turnover.',
    tag: 'Compliance',
  },
  {
    q: 'How do I extract VAT from a total (VAT-inclusive) amount?',
    a: 'Divide the total amount by 1.13 to find the base price, then subtract the base price from the total to get the VAT amount. This "Extract VAT" mode is useful when you have a receipt total and need to know how much tax was charged.',
    tag: 'Usage',
  },
  {
    q: 'Is VAT the same as income tax in Nepal?',
    a: 'No. VAT is an indirect consumption tax charged on the sale of goods and services and collected by businesses on behalf of the government. Income tax is a direct tax paid on personal or business earnings. The two are calculated and filed separately.',
    tag: 'Basics',
  },
  {
    q: 'Are any goods or services exempt from VAT in Nepal?',
    a: 'Yes. Certain essential items are VAT-exempt, including basic agricultural products, healthcare and educational services, and some financial services. Exported goods are typically zero-rated rather than exempt. Check the IRD schedule for the current exemption list.',
    tag: 'Compliance',
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
          <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function VATCalculator() {
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState('add')
  const VAT_RATE = 0.13

  const base    = parseFloat(amount) || 0
  const vatAmt  = mode === 'add' ? base * VAT_RATE : base - base / (1 + VAT_RATE)
  const total   = mode === 'add' ? base + vatAmt : base

  return (
    <div>
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