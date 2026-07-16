'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown } from 'lucide-react'

const getBrokerRate = (amount) => {
  if (amount <= 50000) return 0.0036
  if (amount <= 500000) return 0.0033
  if (amount <= 2000000) return 0.00306
  if (amount <= 10000000) return 0.0027
  return 0.00243
}

const fmt = (n) =>
  'Rs. ' +
  parseFloat(n).toLocaleString('en-NP', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

// ─────────────────────────────────────────────
// FAQ Data
// ─────────────────────────────────────────────

const faqs = [
  {
    q: 'What is the NEPSE Share Calculator?',
    a: 'The NEPSE Share Calculator helps investors calculate the actual profit or loss from buying and selling shares listed on the Nepal Stock Exchange (NEPSE). It automatically includes broker commission, SEBON fee, DP charge, and Capital Gains Tax (CGT), giving you the net amount you receive after all deductions.',
    tag: 'Basics',
  },
  {
    q: 'How is broker commission calculated in Nepal?',
    a: 'Broker commission in Nepal follows a slab system approved by SEBON. The commission percentage decreases as the transaction value increases, ranging from 0.36% for small trades to 0.243% for larger transactions. This calculator automatically applies the correct slab.',
    tag: 'Charges',
  },
  {
    q: 'What fees are included in this calculator?',
    a: 'This calculator includes broker commission, SEBON fee (0.015%), DP charges, name transfer fee on purchase, and Capital Gains Tax (CGT). The displayed profit or loss is your actual return after deducting every applicable charge.',
    tag: 'Charges',
  },
  {
    q: 'What is Capital Gains Tax (CGT) in Nepal?',
    a: 'Capital Gains Tax is charged only when you sell shares at a profit. Individual investors currently pay 7.5% CGT for shares held less than 365 days and 5% for shares held longer than one year. No CGT is charged when selling at a loss.',
    tag: 'Tax',
  },
  {
    q: 'Why is my actual profit lower than expected?',
    a: 'Many investors only compare buying and selling prices. However, broker commission, SEBON fee, DP charges, and Capital Gains Tax reduce the final amount you receive. This calculator considers all deductions automatically.',
    tag: 'Profit',
  },
  {
    q: 'Can I calculate both profit and loss?',
    a: 'Yes. If your selling price is higher than your buying price, the calculator shows your net profit after all deductions. If the selling price is lower, it calculates your actual loss and does not apply Capital Gains Tax.',
    tag: 'Usage',
  },
  {
    q: 'Is this calculator accurate for all NEPSE-listed companies?',
    a: 'Yes. It works for every company listed on the Nepal Stock Exchange including banks, hydropower, insurance, finance companies, manufacturing industries, hotels, microfinance institutions, and mutual funds. The calculation depends on transaction value rather than the company itself.',
    tag: 'Accuracy',
  },
  {
    q: 'Is this NEPSE calculator free?',
    a: 'Absolutely. This NEPSE Share Calculator is completely free to use and works instantly without registration. You can calculate unlimited transactions before buying or selling your shares.',
    tag: 'General',
  },
]

// ─────────────────────────────────────────────
// FAQ Card
// ─────────────────────────────────────────────

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
        onClick={() => setOpen((o) => !o)}
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
          open ? 'max-h-64' : 'max-h-0'
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

// ─────────────────────────────────────────────
// Input Field
// ─────────────────────────────────────────────

const Field = ({ label, placeholder, value, onChange }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
      {label}
    </label>

    <input
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
  </div>
)
export default function NEPSECalculator() {
  const [f, setF] = useState({
    buyPrice: '',
    sellPrice: '',
    qty: '',
    longTerm: false,
  })

  const [r, setR] = useState(null)

  const calc = () => {
    const buy = parseFloat(f.buyPrice)
    const sell = parseFloat(f.sellPrice)
    const qty = parseInt(f.qty)

    if (!buy || !sell || !qty) return

    const buyAmount = buy * qty
    const sellAmount = sell * qty

    const buyBroker = Math.max(
      buyAmount * getBrokerRate(buyAmount),
      10
    )

    const sellBroker = Math.max(
      sellAmount * getBrokerRate(sellAmount),
      10
    )

    const sebonBuy = buyAmount * 0.00015
    const sebonSell = sellAmount * 0.00015

    const dpBuy = 5
    const dpSell = 25

    const cgtRate = f.longTerm ? 0.05 : 0.075

    const cgt =
      sell > buy
        ? (sell - buy) * qty * cgtRate
        : 0

    const totalCost =
      buyAmount +
      buyBroker +
      sebonBuy +
      dpBuy

    const totalReturn =
      sellAmount -
      sellBroker -
      sebonSell -
      dpSell -
      cgt

    const profit = totalReturn - totalCost

    setR({
      buyAmount,
      sellAmount,
      buyBroker,
      sellBroker,
      sebonBuy,
      sebonSell,
      dpBuy,
      dpSell,
      cgt,
      totalCost,
      totalReturn,
      profit,
      cgtRate,
    })
  }

  return (
    <div>
      <ToolLayout
        title="NEPSE Share Calculator"
        icon="📈"
        description="Calculate profit or loss from NEPSE share trading with broker commission, SEBON fee, DP charges, and Capital Gains Tax."
      >
        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">

            <Field
              label="Buy Price (Rs.)"
              placeholder="e.g. 500"
              value={f.buyPrice}
              onChange={(e) =>
                setF({
                  ...f,
                  buyPrice: e.target.value,
                })
              }
            />

            <Field
              label="Sell Price (Rs.)"
              placeholder="e.g. 650"
              value={f.sellPrice}
              onChange={(e) =>
                setF({
                  ...f,
                  sellPrice: e.target.value,
                })
              }
            />

            <Field
              label="Quantity"
              placeholder="e.g. 100"
              value={f.qty}
              onChange={(e) =>
                setF({
                  ...f,
                  qty: e.target.value,
                })
              }
            />

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
                Holding Period
              </label>

              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

                {[
                  ['Short-term', false],
                  ['Long-term', true],
                ].map(([label, val]) => (
                  <button
                    key={label}
                    onClick={() =>
                      setF({
                        ...f,
                        longTerm: val,
                      })
                    }
                    className={`flex-1 py-2.5 text-xs font-medium transition-all ${
                      f.longTerm === val
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>

              <p className="text-xs text-gray-400 mt-1">
                CGT: {f.longTerm ? '5%' : '7.5%'} (
                {f.longTerm ? '>365' : '<365'} days)
              </p>
            </div>

          </div>

          <p className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
            ℹ️ Broker commission is automatically calculated using the latest SEBON brokerage slabs (0.243%–0.36%), along with SEBON fee, DP charges, and applicable Capital Gains Tax.
          </p>

          <button
            onClick={calc}
            className="w-full btn-primary"
          >
            Calculate
          </button>

          {r && (
            <div className="space-y-3">

              {/* Profit / Loss */}
              <div
                className={`p-5 rounded-xl text-center border ${
                  r.profit >= 0
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                  Net {r.profit >= 0 ? 'Profit' : 'Loss'}
                </p>

                <p
                  className={`text-3xl font-bold ${
                    r.profit >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {fmt(Math.abs(r.profit))}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {r.profit >= 0 ? '+' : '-'}
                  {Math.abs((r.profit / r.totalCost) * 100).toFixed(2)}%
                  {' '}return on investment
                </p>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['Total Buy Cost', r.totalCost],
                  ['Total Sell Return', r.totalReturn],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
                  >
                    <p className="text-xs text-gray-500 mb-0.5">
                      {label}
                    </p>

                    <p className="text-sm font-bold text-gray-700 dark:text-gray-100">
                      {fmt(value)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Fee Breakdown */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

                <div className="px-3 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Fee Breakdown
                  </p>
                </div>

                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['Broker (Buy)', r.buyBroker],
                    ['Broker (Sell)', r.sellBroker],
                    ['SEBON Fee (Buy)', r.sebonBuy],
                    ['SEBON Fee (Sell)', r.sebonSell],
                    ['Name Transfer (Buy)', r.dpBuy],
                    ['DP Charge (Sell)', r.dpSell],
                    [`CGT (${r.cgtRate * 100}%)`, r.cgt],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center px-3 py-2.5 text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400">
                        {label}
                      </span>

                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {fmt(value)}
                      </span>
                    </div>
                  ))}
                </div>

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
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
            />
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