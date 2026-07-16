'use client'
import { useRef } from 'react'
import ToolCard from '@/components/ToolCard'
import { tools } from '@/lib/tools'
import AdBanner from '@/components/AdBanner'
import {
  Calendar, TrendingUp, MapPin, GraduationCap, Coins,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

const categories = [
  {
    icon: Calendar,
    tile: 'bg-blue-500',
    title: 'Date & Age Tools',
    desc: 'Convert Bikram Sambat to Gregorian dates or calculate exact age for official forms and documents.',
    href: '/date-converter',
  },
  {
    icon: TrendingUp,
    tile: 'bg-emerald-500',
    title: 'Finance & Tax Tools',
    desc: 'Salary tax, VAT, and NEPSE share profit/loss — with broker commission and capital gains built in.',
    href: '/salary-tax',
  },
  {
    icon: MapPin,
    tile: 'bg-amber-500',
    title: 'Land & Measurement',
    desc: 'Ropani, Aana, Paisa, Daam, Bigha, Kattha, Dhur, Sq. Ft, and Sq. M — all in one converter.',
    href: '/land-unit-converter',
  },
  {
    icon: GraduationCap,
    tile: 'bg-violet-500',
    title: 'Education Tools',
    desc: 'Convert GPA to percentage (or the reverse) for university and scholarship applications.',
    href: '/gpa-calculator',
  },
  {
    icon: Coins,
    tile: 'bg-rose-500',
    title: 'Gold Price Tools',
    desc: 'Daily gold price trends in Nepal per tola and per gram, so you can time a purchase with confidence.',
    href: '/gold-calculator',
  },
]

function CategoryCarousel() {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Arrow controls — hidden on mobile, shown on larger screens */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md items-center justify-center hover:scale-105 transition-transform"
      >
        <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-md items-center justify-center hover:scale-105 transition-transform"
      >
        <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Scroll-snap track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {categories.map(cat => {
          const Icon = cat.icon
          return (
            <a
              key={cat.title}
              href={cat.href}
              className="snap-start shrink-0 w-[260px] sm:w-[280px] rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#343a40] p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-2xl ${cat.tile} flex items-center justify-center mb-5 shadow-sm`}>
                <Icon size={30} className="text-white" strokeWidth={2} />
              </div>

              <h3 className="text-[19px] font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight leading-snug">
                {cat.title}
              </h3>

              <p className="text-[14px] text-gray-500 dark:text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-[1.15]">
          Tools.NP — Free Nepali Online Tools
        </h1>
        <p className="mt-4 text-[16px] sm:text-[18px] text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
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

      <div className="my-12">
        <AdBanner slot="2263999628" />
      </div>

      {/* Category carousel */}
      <section className="max-w-6xl mx-auto">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-blue-500 dark:text-blue-400 mb-2">
          Browse by Category
        </p>
        <h2 className="text-[26px] sm:text-[32px] font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
          Find the right tool, faster
        </h2>

        <CategoryCarousel />
      </section>
    </div>
  )
}