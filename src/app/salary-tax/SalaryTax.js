'use client'

import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'
import { ChevronDown } from 'lucide-react'

// ─────────────────────────────────────────────
// Tax Slabs (FY 2082/83)
// ─────────────────────────────────────────────

const TAX_SLABS = {
  individual: [
    { limit: 500000, rate: 0.01 },
    { limit: 200000, rate: 0.10 },
    { limit: 300000, rate: 0.20 },
    { limit: 1000000, rate: 0.30 },
    { limit: 3000000, rate: 0.36 },
    { limit: Infinity, rate: 0.39 },
  ],

  couple: [
    { limit: 600000, rate: 0.01 },
    { limit: 200000, rate: 0.10 },
    { limit: 300000, rate: 0.20 },
    { limit: 900000, rate: 0.30 },
    { limit: 3000000, rate: 0.36 },
    { limit: Infinity, rate: 0.39 },
  ],
}

const calcTax = (taxable, type) => {
  if (taxable <= 0) return { tax: 0, breakdown: [] }

  let remaining = taxable
  let tax = 0
  const breakdown = []

  for (const { limit, rate } of TAX_SLABS[type]) {
    if (remaining <= 0) break

    const chunk = Math.min(remaining, limit)
    const t = chunk * rate

    breakdown.push({
      range: chunk,
      rate,
      tax: t,
    })

    tax += t
    remaining -= chunk
  }

  return { tax, breakdown }
}

const fmt = (n) =>
  'Rs. ' + Math.round(n).toLocaleString('en-NP')

const fmtD = (n) =>
  'Rs. ' +
  parseFloat(n).toLocaleString('en-NP', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

// ─────────────────────────────────────────────
// Reusable Components
// ─────────────────────────────────────────────

const NumberField = ({
  label,
  placeholder,
  value,
  onChange,
  hint,
}) => (
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

    {hint && (
      <p className="text-xs text-gray-400 mt-1">
        {hint}
      </p>
    )}
  </div>
)

const SectionTitle = ({ children }) => (
  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 dark:border-gray-700">
    {children}
  </p>
)

const Row = ({
  label,
  value,
  bold,
  highlight,
  negative,
}) => (
  <div
    className={`flex justify-between items-center px-3 py-2.5 text-sm ${bold
        ? 'bg-gray-50 dark:bg-gray-800'
        : ''
      }`}
  >
    <span
      className={
        bold
          ? 'font-semibold text-gray-700 dark:text-gray-200'
          : 'text-gray-500 dark:text-gray-400'
      }
    >
      {label}
    </span>

    <span
      className={`font-medium ${highlight
          ? 'text-blue-600 dark:text-blue-400 font-bold'
          : negative
            ? 'text-gray-800 dark:text-gray-100'
            : bold
              ? 'text-gray-800 dark:text-gray-100 font-bold'
              : 'text-gray-700 dark:text-gray-200'
        }`}
    >
      {value}
    </span>
  </div>
)

const RadioCheck = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div>
    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
      {label}
    </p>

    <div className="flex gap-4">
      {options.map(([text, val, hint]) => (
        <label
          key={val}
          className="flex items-start gap-2 cursor-pointer group"
        >
          <div className="relative mt-0.5 shrink-0">

            <input
              type="radio"
              checked={value === val}
              onChange={() => onChange(val)}
              className="sr-only"
            />

            <div
              className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${value === val
                  ? 'border-blue-600'
                  : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
                }`}
            >
              {value === val && (
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </div>

          </div>

          <div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {text}
            </span>

            {hint && (
              <p className="text-xs text-gray-400">
                {hint}
              </p>
            )}
          </div>
        </label>
      ))}
    </div>
  </div>
)

const EPFToggle = ({
  value,
  onChange,
}) => (
  <div>
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">
      Contribution Type
    </label>

    <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">

      {[
        ['None', '0'],
        ['EPF 10%', '10'],
        ['SSF 11%', '11'],
      ].map(([label, val]) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          className={`flex-1 py-2.5 text-xs font-medium transition-all ${value === val
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
        >
          {label}
        </button>
      ))}

    </div>

    <p className="text-xs text-gray-400 mt-1">
      {value === '11'
        ? 'SSF contributors are exempt from the 1% Social Security Tax.'
        : 'EPF = Employees Provident Fund'}
    </p>
  </div>
)
// ─────────────────────────────────────────────
// FAQ Data
// ─────────────────────────────────────────────

const faqs = [
  {
    q: 'What is the Nepal Salary Tax Calculator?',
    a: 'The Nepal Salary Tax Calculator helps salaried employees estimate their annual and monthly income tax according to the latest Inland Revenue Department (IRD) tax slabs. It automatically calculates taxable income after deductions such as EPF, SSF, CIT, life insurance, and health insurance.',
    tag: 'Basics',
  },
  {
    q: 'How is salary tax calculated in Nepal?',
    a: 'Nepal follows a progressive income tax system where different portions of your taxable income are taxed at different rates. Your gross annual income is reduced by eligible deductions before the applicable IRD tax slabs are applied. This calculator performs those calculations automatically.',
    tag: 'Calculation',
  },
  {
    q: 'Which deductions reduce taxable income?',
    a: 'Eligible deductions include Employees Provident Fund (EPF), Social Security Fund (SSF), Citizen Investment Trust (CIT), life insurance premiums, and health insurance premiums within the limits specified by the Inland Revenue Department. These deductions reduce your taxable income and may lower your tax liability.',
    tag: 'Deductions',
  },
  {
    q: 'What is the difference between EPF and SSF?',
    a: 'EPF (Employees Provident Fund) and SSF (Social Security Fund) are retirement savings schemes in Nepal. Employees contributing to SSF are generally exempt from the 1% Social Security Tax, while both EPF and SSF contributions may qualify for income tax deductions subject to IRD rules.',
    tag: 'Retirement',
  },
  {
    q: 'Do female taxpayers receive any tax benefit?',
    a: 'Yes. Under current Nepal income tax rules, eligible female taxpayers receive a 10% rebate on the calculated income tax before applying other eligible tax credits. This calculator automatically applies the rebate when the Female option is selected.',
    tag: 'Rebate',
  },
  {
    q: 'Can I calculate tax for both individuals and couples?',
    a: 'Yes. Nepal has different basic exemption limits for individual taxpayers and married couples. Simply choose the appropriate taxpayer type, and the calculator automatically uses the correct tax slabs and exemption thresholds.',
    tag: 'Usage',
  },
  {
    q: 'Which fiscal year does this calculator use?',
    a: 'This Salary Tax Calculator is based on the Nepal Government income tax rules and tax slabs for Fiscal Year (FY) 2082/83. Tax rates may change with future national budgets, so always verify with the latest Inland Revenue Department (IRD) notice for official filing.',
    tag: 'Tax Year',
  },
  {
    q: 'Is this Nepal salary tax calculator accurate?',
    a: 'Yes. The calculator follows the published IRD tax slabs and deduction rules for salaried employees. It provides a reliable estimate for most taxpayers, although individuals with multiple income sources, business income, or special tax situations should consult a qualified tax professional.',
    tag: 'Accuracy',
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
      ${open
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
          className={`shrink-0 mt-1.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''
            }`}
        />
      </button>

      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${open ? 'max-h-64' : 'max-h-0'
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
export default function SalaryTax() {
  const [f, setF] = useState({
    salary: '',
    bonus: '',
    epf: '0',
    cit: '',
    lifeIns: '',
    healthIns: '',
    type: 'individual',
    gender: 'male',
  })

  const [r, setR] = useState(null)

  const update = (key, value) =>
    setF(prev => ({
      ...prev,
      [key]: value,
    }))

  const calc = () => {
    const monthlySalary = parseFloat(f.salary) || 0

    if (!monthlySalary) return

    const annualSalary = monthlySalary * 12
    const annualBonus = parseFloat(f.bonus) || 0
    const grossIncome = annualSalary + annualBonus

    // Retirement deductions
    const epfRate = parseFloat(f.epf) / 100 || 0
    const epfDeduction = grossIncome * epfRate
    const citDeduction = parseFloat(f.cit) || 0

    const retirementTotal =
      epfDeduction + citDeduction

    const retirementCap = Math.min(
      grossIncome / 3,
      500000
    )

    const retirementDeduct = Math.min(
      retirementTotal,
      retirementCap
    )

    // Insurance deductions
    const lifeInsDeduct = Math.min(
      parseFloat(f.lifeIns) || 0,
      40000
    )

    const healthInsDeduct = Math.min(
      parseFloat(f.healthIns) || 0,
      20000
    )

    const totalInsDeduct =
      lifeInsDeduct + healthInsDeduct

    const totalDeductions =
      retirementDeduct + totalInsDeduct

    const taxableIncome = Math.max(
      grossIncome - totalDeductions,
      0
    )

    // Calculate tax slab
    const {
      tax: rawTax,
      breakdown,
    } = calcTax(
      taxableIncome,
      f.type
    )

    // Female rebate
    const femaleRebate =
      f.gender === 'female'
        ? rawTax * 0.1
        : 0

    const taxAfterRebate =
      rawTax - femaleRebate

    // Medical tax credit
    const medCredit = Math.min(
      1500,
      (parseFloat(f.healthIns) || 0) * 0.15,
      taxAfterRebate
    )

    const netTax = Math.max(
      taxAfterRebate - medCredit,
      0
    )

    const effectiveRate =
      grossIncome > 0
        ? (netTax / grossIncome) * 100
        : 0

    setR({
      grossIncome,
      annualSalary,
      annualBonus,

      epfDeduction,
      citDeduction,
      retirementDeduct,

      lifeInsDeduct,
      healthInsDeduct,

      totalDeductions,
      taxableIncome,

      rawTax,
      femaleRebate,
      medCredit,

      netTax,
      monthly: netTax / 12,
      effectiveRate,

      breakdown,
    })
  }

  return (
    <>
      <ToolLayout
        title="Salary Tax Calculator"
        icon="💼"
        description="Nepal income tax calculator for salaried employees based on FY 2082/83 tax slabs."
      >
        <div className="space-y-5">

          {/* Taxpayer */}
          <div className="space-y-1">
            <SectionTitle>Taxpayer</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <RadioCheck
                label="Taxpayer Type"
                value={f.type}
                onChange={(v) => update('type', v)}
                options={[
                  ['Individual', 'individual'],
                  ['Couple', 'couple'],
                ]}
              />

              <RadioCheck
                label="Gender"
                value={f.gender}
                onChange={(v) => update('gender', v)}
                options={[
                  ['Male', 'male'],
                  ['Female', 'female'],
                ]}
              />

            </div>
          </div>

          {/* Income */}
          <div className="space-y-3">

            <SectionTitle>Income</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <NumberField
                label="Monthly Gross Salary (Rs.)"
                placeholder="e.g. 25,000"
                value={f.salary}
                onChange={(e) =>
                  update('salary', e.target.value)
                }
              />

              <NumberField
                label="Annual Bonus (Rs.)"
                placeholder="e.g. 25,000"
                value={f.bonus}
                onChange={(e) =>
                  update('bonus', e.target.value)
                }
                hint="Festival or performance bonus (optional)"
              />

            </div>
          </div>
          {/* Retirement Fund */}
          <div className="space-y-1">

            <SectionTitle>Retirement Fund</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <EPFToggle
                value={f.epf}
                onChange={(v) => update('epf', v)}
              />

              <NumberField
                label="Citizen Investment Trust Annual Contribution (Rs.)"
                placeholder="e.g. 12,000"
                value={f.cit}
                onChange={(e) =>
                  update('cit', e.target.value)
                }
                hint="Maximum deductible: lower of ⅓ gross income or Rs. 5,00,000"
              />

            </div>
          </div>

          {/* Insurance */}
          <div className="space-y-1">

            <SectionTitle>Insurance Premiums (Annual)</SectionTitle>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <NumberField
                label="Life Insurance Premium (Rs.)"
                placeholder="e.g. 25,000"
                value={f.lifeIns}
                onChange={(e) =>
                  update('lifeIns', e.target.value)
                }
                hint="Deductible up to Rs. 40,000"
              />

              <NumberField
                label="Health / Medical Insurance (Rs.)"
                placeholder="e.g. 15,000"
                value={f.healthIns}
                onChange={(e) =>
                  update('healthIns', e.target.value)
                }
                hint="Deductible up to Rs. 20,000"
              />

            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calc}
            className="w-full btn-primary"
          >
            Calculate Tax
          </button>

          {r && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">

              {/* Header */}
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-4 text-center">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Tax Payable
                </p>

                <p className="text-4xl font-bold text-gray-700 dark:text-gray-100">
                  {fmtD(r.netTax)}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ≈ {fmtD(r.monthly)} / month
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Effective Rate: {r.effectiveRate.toFixed(2)}%
                </p>
              </div>

              {/* Income */}
              <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Income
                </p>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">

                <Row
                  label="Annual Salary"
                  value={fmt(r.annualSalary)}
                />

                {r.annualBonus > 0 && (
                  <Row
                    label="Annual Bonus"
                    value={fmt(r.annualBonus)}
                  />
                )}

                <Row
                  label="Gross Income"
                  value={fmt(r.grossIncome)}
                  bold
                />

              </div>

              {/* Deductions */}
              {r.totalDeductions > 0 && (
                <>
                  <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      Deductions
                    </p>
                  </div>

                  <div className="divide-y divide-gray-100 dark:divide-gray-700">

                    {r.epfDeduction > 0 && (
                      <Row
                        label="EPF / SSF Contribution"
                        value={`- ${fmt(r.epfDeduction)}`}
                      />
                    )}

                    {r.citDeduction > 0 && (
                      <Row
                        label="Citizen Investment Trust (CIT)"
                        value={`- ${fmt(r.citDeduction)}`}
                      />
                    )}

                    {r.lifeInsDeduct > 0 && (
                      <Row
                        label="Life Insurance"
                        value={`- ${fmt(r.lifeInsDeduct)}`}
                      />
                    )}

                    {r.healthInsDeduct > 0 && (
                      <Row
                        label="Health Insurance"
                        value={`- ${fmt(r.healthInsDeduct)}`}
                      />
                    )}

                    <Row
                      label="Total Deductions"
                      value={`- ${fmt(r.totalDeductions)}`}
                      bold
                    />

                  </div>
                </>
              )}

              {/* Taxable Income */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-200 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">

                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Total Taxable Income
                </p>

                <p className="font-bold text-gray-800 dark:text-gray-100">
                  {fmt(r.taxableIncome)}
                </p>

              </div>

              {/* Tax Slabs */}
              <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Tax Slabs
                </p>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">

                {r.breakdown.map(({ range, rate, tax }, i) => (
                  <Row
                    key={i}
                    label={`${fmt(range)} @ ${(rate * 100).toFixed(0)}%`}
                    value={fmt(tax)}
                  />
                ))}

              </div>

              {/* Credits & Rebates */}
              {(r.femaleRebate > 0 || r.medCredit > 0) && (
                <>
                  <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                      Credits & Rebates
                    </p>
                  </div>

                  <div className="divide-y divide-gray-100 dark:divide-gray-700">

                    {r.femaleRebate > 0 && (
                      <Row
                        label="Female Rebate (10%)"
                        value={`- ${fmt(r.femaleRebate)}`}
                      />
                    )}

                    {r.medCredit > 0 && (
                      <Row
                        label="Medical Tax Credit"
                        value={`- ${fmt(r.medCredit)}`}
                      />
                    )}

                  </div>
                </>
              )}

              {/* Net Tax */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">

                <div>
                  <p className="font-bold text-gray-700 dark:text-gray-200">
                    Net Tax Payable
                  </p>
                </div>

                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  {fmtD(r.netTax)}
                </p>

              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-center">
                <p className="text-xs text-gray-400">
                  Based on Nepal Inland Revenue Department (IRD) FY 2082/83 tax slabs. This calculator provides an estimate only and should not replace professional tax advice.
                </p>
              </div>

            </div>
          )}
        </div>
      </ToolLayout>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 pb-12 mt-8">

        {/* Section Header */}
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

        {/* FAQ Cards */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
          Still have questions?{' '}
          <a
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Contact us
          </a>{' '}
          and we'll help you understand Nepal's income tax rules.
        </p>

      </div>
    </>
  )
}