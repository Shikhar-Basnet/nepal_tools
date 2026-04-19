'use client'
import { useState } from 'react'
import ToolLayout from '@/components/ToolLayout'

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
    breakdown.push({ range: chunk, rate, tax: t })
    tax += t
    remaining -= chunk
  }
  return { tax, breakdown }
}

const fmt = (n) => 'Rs. ' + Math.round(n).toLocaleString('en-NP')
const fmtD = (n) => 'Rs. ' + parseFloat(n).toLocaleString('en-NP', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const NumberField = ({ label, placeholder, value, onChange, hint }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">{label}</label>
    <input
      type="number" placeholder={placeholder} value={value} onChange={onChange}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

const SectionTitle = ({ children }) => (
  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pb-2 border-b border-gray-100 dark:border-gray-700">
    {children}
  </p>
)

const Row = ({ label, value, bold, highlight, negative }) => (
  <div className={`flex justify-between items-center px-3 py-2.5 text-sm ${bold ? 'bg-gray-50 dark:bg-gray-800' : ''}`}>
    <span className={bold ? 'font-semibold text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}>
      {label}
    </span>
    <span className={`font-medium ${highlight ? 'text-blue-600 dark:text-blue-400 font-bold' :
      negative ? 'text-gray-800 dark:text-gray-100' :
        bold ? 'text-gray-800 dark:text-gray-100 font-bold' :
          'text-gray-700 dark:text-gray-200'
      }`}>
      {value}
    </span>
  </div>
)

// Radio-style checkbox: shows two options, only one selectable
const RadioCheck = ({ label, options, value, onChange }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</p>
    <div className="flex gap-4">
      {options.map(([l, v, hint]) => (
        <label key={l} className="flex items-start gap-2 cursor-pointer group">
          <div className="relative mt-0.5 shrink-0">
            <input type="radio" checked={value === v} onChange={() => onChange(v)} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${value === v ? 'border-blue-600' : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-400'
              }`}>
              {value === v && <div className="w-2 h-2 rounded-full bg-blue-600" />}
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{l}</span>
            {hint && <p className="text-xs text-gray-400">{hint}</p>}
          </div>
        </label>
      ))}
    </div>
  </div>
)

const EPFToggle = ({ value, onChange }) => (
  <div>
    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 block">Contribution Type</label>
    <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {[['None', '0'], ['EPF 10%', '10'], ['SSF 11%', '11']].map(([l, v]) => (
        <button key={v} onClick={() => onChange(v)}
          className={`flex-1 py-2.5 text-xs font-medium transition-all ${value === v ? 'bg-blue-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}>
          {l}
        </button>
      ))}
    </div>
    <p className="text-xs text-gray-400 mt-1">
      {value === '11' ? 'SSF contributors exempt from 1% social security tax' : 'EPF = Employees Provident Fund'}
    </p>
  </div>
)

export default function SalaryTax() {
  const [f, setF] = useState({
    salary: '',
    bonus: '',
    epf: '0',
    cit: '',
    lifeIns: '',
    healthIns: '',
    type: 'individual',  // 'individual' | 'couple'
    gender: 'male',        // 'male' | 'female'
  })
  const [r, setR] = useState(null)

  const update = (k, v) => setF(prev => ({ ...prev, [k]: v }))

  const calc = () => {
    const monthlySalary = parseFloat(f.salary) || 0
    if (!monthlySalary) return

    const annualSalary = monthlySalary * 12
    const annualBonus = parseFloat(f.bonus) || 0
    const grossIncome = annualSalary + annualBonus

    const epfRate = parseFloat(f.epf) / 100 || 0
    const epfDeduction = grossIncome * epfRate
    const citDeduction = parseFloat(f.cit) || 0

    const retirementTotal = epfDeduction + citDeduction
    const retirementCap = Math.min(grossIncome / 3, 500000)
    const retirementDeduct = Math.min(retirementTotal, retirementCap)

    const lifeInsDeduct = Math.min(parseFloat(f.lifeIns) || 0, 40000)
    const healthInsDeduct = Math.min(parseFloat(f.healthIns) || 0, 20000)
    const totalInsDeduct = lifeInsDeduct + healthInsDeduct
    const totalDeductions = retirementDeduct + totalInsDeduct
    const taxableIncome = Math.max(grossIncome - totalDeductions, 0)

    const { tax: rawTax, breakdown } = calcTax(taxableIncome, f.type)

    const femaleRebate = f.gender === 'female' ? rawTax * 0.10 : 0
    const taxAfterRebate = rawTax - femaleRebate
    const medCredit = Math.min(1500, (parseFloat(f.healthIns) || 0) * 0.15, taxAfterRebate)
    const netTax = Math.max(taxAfterRebate - medCredit, 0)
    const effectiveRate = grossIncome > 0 ? (netTax / grossIncome) * 100 : 0

    setR({
      grossIncome, annualSalary, annualBonus,
      retirementDeduct, epfDeduction, citDeduction,
      lifeInsDeduct, healthInsDeduct,
      totalDeductions, taxableIncome,
      rawTax, femaleRebate, medCredit, netTax,
      monthly: netTax / 12, effectiveRate, breakdown,
    })
  }

  return (
    <ToolLayout title="Salary Tax Calculator" icon="💼" description="Nepal income tax for salaried employees — FY 2082-83">
      <div className="space-y-5">

        {/* Taxpayer — radio options, compact two-column on md+ */}
        <div className="space-y-1">
          <SectionTitle>Taxpayer</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioCheck
              label="Taxpayer Type"
              value={f.type}
              onChange={v => update('type', v)}
              options={[
                ['Individual', 'individual'],
                ['Couple', 'couple'],
              ]}
            />
            <RadioCheck
              label="Gender"
              value={f.gender}
              onChange={v => update('gender', v)}
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
            <NumberField label="Monthly Gross Salary (Rs.)" placeholder="e.g. 25,000"
              value={f.salary} onChange={e => update('salary', e.target.value)} />
            <NumberField label="Annual Bonus (Rs.)" placeholder="e.g. 25,000"
              value={f.bonus} onChange={e => update('bonus', e.target.value)}
              hint="Festival or performance bonus (optional)" />
          </div>
        </div>

        {/* Retirement */}
        <div className="space-y-1">
          <SectionTitle>Retirement Fund</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <EPFToggle value={f.epf} onChange={v => update('epf', v)} />
            <NumberField label="Citizen Investment Trust Annual Contribution (Rs.)" placeholder="e.g. 12,000"
              value={f.cit} onChange={e => update('cit', e.target.value)}
              hint="Capped at min(⅓ gross, Rs. 5,00,000)" />
          </div>
        </div>

        {/* Insurance */}
        <div className="space-y-1">
          <SectionTitle>Insurance Premiums (Annual)</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <NumberField label="Life Insurance Premium (Rs.)" placeholder="e.g. 25,000"
              value={f.lifeIns} onChange={e => update('lifeIns', e.target.value)}
              hint="Deductible up to Rs. 40,000" />
            <NumberField label="Health / Medical Insurance (Rs.)" placeholder="e.g. 15,000"
              value={f.healthIns} onChange={e => update('healthIns', e.target.value)}
              hint="Deductible up to Rs. 20,000" />
          </div>
        </div>

        <button onClick={calc} className="w-full btn-primary">
          Calculate Tax
        </button>

        {r && (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden text-sm">

            {/* Header */}
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-4 text-center">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Tax Payable</p>
              <p className="text-4xl font-bold text-gray-700 dark:text-gray-100">{fmtD(r.netTax)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">≈ {fmtD(r.monthly)} / month</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Effective rate: {r.effectiveRate.toFixed(2)}%</p>
            </div>

            {/* Income */}
            <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Income</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-2.5">
                <span className="text-gray-500 dark:text-gray-400">Annual Salary</span>
                <span className="font-medium text-gray-700 dark:text-gray-200">{fmt(r.annualSalary)}</span>
              </div>
              {r.annualBonus > 0 && (
                <div className="flex justify-between px-4 py-2.5">
                  <span className="text-gray-500 dark:text-gray-400">Annual Bonus</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{fmt(r.annualBonus)}</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 font-semibold">
                <span className="text-gray-600 dark:text-gray-300">Gross Income</span>
                <span className="text-gray-800 dark:text-gray-100">{fmt(r.grossIncome)}</span>
              </div>
            </div>

            {/* Deductions */}
            {r.totalDeductions > 0 && (
              <>
                <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Deductions</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    r.epfDeduction > 0 && ['EPF / SSF Contribution', r.epfDeduction],
                    r.citDeduction > 0 && ['CIT Contribution', r.citDeduction],
                    r.lifeInsDeduct > 0 && ['Life Insurance', r.lifeInsDeduct],
                    r.healthInsDeduct > 0 && ['Health Insurance', r.healthInsDeduct],
                  ].filter(Boolean).map(([label, val]) => (
                    <div key={label} className="flex justify-between px-4 py-2.5">
                      <span className="text-gray-500 dark:text-gray-400">{label}</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">- {fmt(val)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 font-semibold">
                    <span className="text-gray-600 dark:text-gray-300">Total Deductions</span>
                    <span className="text-gray-800 dark:text-gray-100">- {fmt(r.totalDeductions)}</span>
                  </div>
                </div>
              </>
            )}

            {/* Taxable Income */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-200 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-700 dark:text-gray-200">Total Taxable Income</p>
              <p className="font-bold text-gray-800 dark:text-gray-100">{fmt(r.taxableIncome)}</p>
            </div>

            {/* Tax Slabs */}
            <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Tax Slabs</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {r.breakdown.map(({ range, rate, tax }, i) => (
                <div key={i} className="flex justify-between px-4 py-2.5">
                  <span className="text-gray-500 dark:text-gray-400">{fmt(range)} @ {(rate * 100).toFixed(0)}%</span>
                  <span className="font-medium text-gray-700 dark:text-gray-200">{fmt(tax)}</span>
                </div>
              ))}
            </div>

            {/* Credits & Rebates */}
            {(r.femaleRebate > 0 || r.medCredit > 0) && (
              <>
                <div className="px-4 pt-3 pb-1 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Credits & Rebates</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {r.femaleRebate > 0 && (
                    <div className="flex justify-between px-4 py-2.5">
                      <span className="text-gray-500 dark:text-gray-400">Female Rebate (10%)</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">- {fmt(r.femaleRebate)}</span>
                    </div>
                  )}
                  {r.medCredit > 0 && (
                    <div className="flex justify-between px-4 py-2.5">
                      <span className="text-gray-500 dark:text-gray-400">Medical Tax Credit</span>
                      <span className="font-medium text-gray-600 dark:text-gray-300">- {fmt(r.medCredit)}</span>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Net Total */}
            <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-bold text-gray-700 dark:text-gray-200">Net Tax Payable</p>
              </div>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{fmtD(r.netTax)}</p>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-400">Based on FY 2082-83 IRD slabs. Consult a tax professional for official advice.</p>
            </div>

          </div>
        )}
      </div>
    </ToolLayout>
  )
}