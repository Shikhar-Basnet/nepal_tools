import Link from 'next/link'
import ToolCard from '@/components/ToolCard'
import { tools } from '@/lib/tools'
import AdBanner from '@/components/AdBanner'
import {
  Smartphone, ShieldCheck, Zap, Lock, Gift, Flag, ArrowUpRight, CalendarClock,
} from 'lucide-react'

const featureCards = [
  {
    icon: Smartphone,
    title: 'Works on Any Device',
    description: 'No app to download and nothing to install. Every calculator and converter runs right in your browser — phone, tablet, or desktop.',
    iconBg: 'bg-blue-50 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: ShieldCheck,
    title: 'Built for Nepal',
    description: 'BS/AD conversions match the official Nepal Government calendar table. VAT and tax tools follow current IRD rates.',
    iconBg: 'bg-emerald-50 dark:bg-emerald-900',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Zap,
    title: 'Fast & Free, Always',
    description: 'No sign-up, no paywalls, no hidden limits. Every tool on this site is free to use — today and every time after.',
    iconBg: 'bg-amber-50 dark:bg-amber-900',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
]

const trustBadges = [
  { icon: Lock, label: 'Privacy First',    color: 'text-blue-600 dark:text-blue-400' },
  { icon: Zap,  label: 'Instant Results',  color: 'text-amber-600 dark:text-amber-400' },
  { icon: Gift, label: 'Always Free',      color: 'text-purple-600 dark:text-purple-400' },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Tools.NP — Free Nepali Online Tools
        </h1>
        <p className="mt-3 text-[15px] text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          Date Converter, Age Calculator, GPA Calculator, NEPSE Tools, Salary Tax,
          VAT Calculator, Gold Price, and more — all free, no login needed.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {/* ── Why Tools.NP ── */}
      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-gray-100 tracking-tight mb-10">
          Work your way
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featureCards.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
            <div key={title}
              className="rounded-2xl border border-gray-200 dark:border-gray-500 bg-white dark:bg-[#343a40] shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-150"
            >
              {/* Icon block */}
              <div className="h-32 bg-gray-50 dark:bg-[#2b3035] flex items-center justify-center">
                <div className={`w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center ${iconBg}`}>
                  <Icon size={26} className={iconColor} />
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100 mb-1.5">
                  {title}
                </h3>
                <p className="text-[13.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Highlight banner ── */}
      <div className="mt-16 rounded-2xl border border-gray-200 dark:border-gray-500 bg-white dark:bg-[#343a40] shadow-sm p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-3xl bg-blue-50 dark:bg-blue-900 flex items-center justify-center">
          <CalendarClock size={40} className="text-blue-600 dark:text-blue-400" />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Accuracy you can rely on
          </h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
            Our BS ⇄ AD conversions are checked against the official Nepal Government calendar,
            so the dates on your citizenship, land, and school documents always match.
          </p>
        </div>

        <Link href="/date-converter"
          className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-[14px] font-medium transition-colors"
        >
          Try Date Converter <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* ── Trust strip ── */}
      <div className="mt-16 text-center">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
          Free tools, trusted across Nepal
        </h3>
        <p className="text-[13.5px] text-gray-500 dark:text-gray-400 mb-8 max-w-lg mx-auto">
          Built for students, professionals, and businesses who just need a quick, correct answer — no strings attached.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map(({ icon: Icon, label, color }) => (
            <div key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-500 bg-white dark:bg-[#343a40] shadow-sm text-[13px] font-medium text-gray-600 dark:text-gray-300"
            >
              <Icon size={14} className={color} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <AdBanner slot="2263999628" />
    </div>
  )
}