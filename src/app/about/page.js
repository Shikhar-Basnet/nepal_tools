// app/about/page.js
import { Users, Target, Zap, Globe, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'About Us',
  description: 'Learn about Tools.NP — free online tools built for Nepal.',
}

const features = [
  {
    icon: Zap,
    iconBg: 'bg-[#fef7e0] dark:bg-[#3d2e00]',
    iconColor: 'text-[#f29900] dark:text-[#fdd663]',
    title: 'Fast & Free',
    desc: 'Every tool is completely free to use. No subscriptions, no hidden fees, no account required.',
  },
  {
    icon: Globe,
    iconBg: 'bg-[#e6f4ea] dark:bg-[#0d3521]',
    iconColor: 'text-[#1e8e3e] dark:text-[#81c995]',
    title: 'Built for Nepal',
    desc: 'Designed specifically for Nepali users — BS/AD dates, NEPSE, land units, IRD tax rules and more.',
  },
  {
    icon: Target,
    iconBg: 'bg-[#fce8e6] dark:bg-[#3c1a18]',
    iconColor: 'text-[#d93025] dark:text-[#f28b82]',
    title: 'Accurate Results',
    desc: 'All calculators follow official Nepal government rules, IRD guidelines, and NEPSE regulations.',
  },
  {
    icon: Users,
    iconBg: 'bg-[#e8f0fe] dark:bg-[#1a3a5c]',
    iconColor: 'text-[#1a73e8] dark:text-[#8ab4f8]',
    title: 'For Everyone',
    desc: 'Whether you are a student, investor, farmer, or professional — there is a tool here for you.',
  },
]

const tools = [
  'BS / AD Date Converter',
  'Age Calculator',
  'GPA & Percent Calculator',
  'Land Unit Converter',
  'NEPSE Profit / Loss Calculator',
  'Salary & Income Tax Calculator',
  'VAT Calculator',
  'Gold Price Calculator',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f4] dark:bg-[#1a1b1e]">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Hero card ── */}
        <div className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-8 py-10 mb-5 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e8f0fe] dark:bg-[#1a3a5c] mb-5">
            <Globe size={26} className="text-[#1a73e8] dark:text-[#8ab4f8]" />
          </div>
          <h1 className="text-[28px] font-medium text-[#202124] dark:text-[#e8eaed] mb-3 tracking-tight">
            About Tools.NP
          </h1>
          <p className="text-[15px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed max-w-xl mx-auto">
            Tools.NP is a free collection of everyday calculators and converters
            built specifically for people in Nepal. Our goal is simple — give
            everyone access to accurate, easy-to-use tools without any cost or barrier.
          </p>
        </div>

        {/* ── Feature grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {features.map(({ icon: Icon, iconBg, iconColor, title, desc }) => (
            <div key={title}
              className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] p-6 flex gap-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                <Icon size={20} className={iconColor} />
              </div>
              <div>
                <h2 className="text-[15px] font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
                  {title}
                </h2>
                <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tools list card ── */}
        <div className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-6 mb-5">
          <h2 className="text-[16px] font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
            Available Tools
          </h2>
          <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6] mb-5">
            We currently offer {tools.length} free tools, with more on the way.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tools.map(tool => (
              <div key={tool}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#f8f9fa] dark:bg-[#35363a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8] shrink-0" />
                <span className="text-[13px] text-[#3c4043] dark:text-[#bdc1c6] font-medium">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission card ── */}
        <div className="bg-white dark:bg-[#292a2d] rounded-2xl border border-[#dadce0] dark:border-[#404144] px-6 py-6 mb-5">
          <h2 className="text-[16px] font-medium text-[#202124] dark:text-[#e8eaed] mb-3">
            Our Mission
          </h2>
          <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-[1.75] mb-3">
            Nepal-specific tools have long been scattered, outdated, or locked behind
            apps that require sign-ups. Tools.NP exists to change that — one clean,
            fast, reliable tool at a time.
          </p>
          <p className="text-[14px] text-[#5f6368] dark:text-[#9aa0a6] leading-[1.75]">
            We believe that useful technology should be accessible to everyone,
            whether you are a student in Kathmandu, a farmer in Chitwan, or an
            investor tracking NEPSE from abroad.
          </p>
        </div>

        {/* ── CTA card ── */}
        <div className="bg-[#e8f0fe] dark:bg-[#1a3a5c] rounded-2xl border border-[#d2e3fc] dark:border-[#2a4a6c] px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-medium text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
              Have a suggestion or found a bug?
            </h2>
            <p className="text-[13px] text-[#5f6368] dark:text-[#9aa0a6]">
              We would love to hear from you.
            </p>
          </div>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a73e8] dark:bg-[#8ab4f8] text-white dark:text-[#1a1b1e] text-[13px] font-medium hover:bg-[#1557b0] dark:hover:bg-[#aecbfa] active:scale-95 transition-all duration-150 shrink-0 touch-manipulation">
            Contact Us
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}