// app/blog/page.js
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog — Tools.NP',
  description: 'Tips, guides, and updates about Nepali tools, finance, tax, NEPSE, date conversion, and more.',
}

const posts = [
  {
    slug: 'how-to-convert-bs-to-ad-date',
    title: 'How to Convert BS to AD Date in Nepal — Complete Guide',
    excerpt: 'Bikram Sambat is Nepal\'s official calendar. Learn how to convert BS dates to AD for banks, embassies, and government forms.',
    category: 'Date Converter',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    date: '2026-04-15',
    readTime: '4 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&q=80',
  },
  {
    slug: 'nepal-income-tax-guide-2081',
    title: 'Nepal Income Tax Guide for FY 2081/82 — Slabs, SSF & Deductions',
    excerpt: 'Complete breakdown of Nepal\'s income tax slabs, SSF deductions, and allowable expenses for FY 2081/82.',
    category: 'Salary Tax',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    date: '2026-04-10',
    readTime: '7 min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    slug: 'nepse-broker-commission-explained',
    title: 'NEPSE Broker Commission, SEBON Fee & DP Charges Explained',
    excerpt: 'Every NEPSE transaction has hidden charges. Learn broker commission tiers, SEBON fees, and DP charges before you trade.',
    category: 'NEPSE',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    date: '2026-04-05',
    readTime: '5 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
  },
  {
    slug: 'nepal-vat-guide',
    title: 'Nepal VAT 13% — When to Add It, When to Remove It',
    excerpt: 'VAT in Nepal is 13%. Learn when it\'s included, how to reverse-calculate, and which items are exempt.',
    category: 'VAT Calculator',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
    date: '2026-03-28',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  },
  {
    slug: 'ropani-aana-bigha-land-units-nepal',
    title: 'Ropani, Aana, Bigha, Kattha — Nepal Land Units Explained',
    excerpt: 'Nepal uses two separate land systems. Learn the Hilly and Terai measurement units and how to convert between them.',
    category: 'Land Converter',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    date: '2026-03-20',
    readTime: '5 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    slug: 'gold-price-nepal-tola-gram-ratti',
    title: 'Gold Price in Nepal — Tola, Gram & Ratti Explained',
    excerpt: 'Gold in Nepal is priced per Tola. Learn the Tola-to-gram conversion, what Ratti means, and how to value your gold.',
    category: 'Gold Price',
    categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    date: '2026-03-12',
    readTime: '4 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
  },
  {
    slug: 'gpa-to-percentage-nepal-universities',
    title: 'GPA to Percentage Conversion for TU, PU & KU Nepal',
    excerpt: 'TU, PU, and KU all use different GPA scales. Here are the conversion formulas for each university.',
    category: 'GPA Calculator',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    date: '2026-03-05',
    readTime: '4 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'how-to-calculate-age-in-bs',
    title: 'How to Calculate Your Exact Age in Nepali BS Calendar',
    excerpt: 'Calculating age in BS is tricky because of varying month lengths. Here\'s how to do it accurately.',
    category: 'Age Calculator',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    date: '2026-02-25',
    readTime: '3 min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1484712401471-05c7215830eb?w=800&q=80',
  },
]

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function BlogPage() {
  const featured = posts.filter(p => p.featured)
  const rest     = posts.filter(p => !p.featured)

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* ── Page header ── */}
        <div className="mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
            Tools.NP Blog
          </p>
          <h1 className="text-[32px] font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-tight mb-3">
            Guides & Explainers
          </h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
            In-depth guides on Nepal's calendar, taxes, stock market, land units, and more — written to help you use each tool effectively.
          </p>
        </div>

        {/* ── Featured: hero 2-col ── */}
        {featured.length > 0 && (
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
              Featured
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map(post => (
                <Link key={post.slug} href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden
                    bg-white dark:bg-[#343a40]
                    border border-gray-200 dark:border-gray-700
                    hover:border-blue-200 dark:hover:border-blue-700
                    hover:shadow-lg dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                    transition-all duration-200">

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Category pill overlaid on image */}
                    <div className="absolute top-3 left-3">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${post.categoryColor}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h2 className="text-[16px] font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-gray-400 dark:text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />{formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />{post.readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-600 dark:text-blue-400 group-hover:gap-1.5 transition-all">
                        Read <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Rest: horizontal card list with thumbnail ── */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            All Articles
          </p>
          <div className="flex flex-col gap-3">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group flex gap-4 rounded-xl overflow-hidden
                  bg-white dark:bg-[#343a40]
                  border border-gray-200 dark:border-gray-700
                  hover:border-blue-200 dark:hover:border-blue-700
                  hover:shadow-md dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)]
                  transition-all duration-150 p-0">

                {/* Thumbnail */}
                <div className="w-[120px] sm:w-[160px] h-auto shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ minHeight: '100px' }}
                    loading="lazy"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center py-4 pr-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${post.categoryColor}`}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-2 hidden sm:block">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />{post.readTime}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 rounded-2xl bg-white dark:bg-[#343a40] px-6 py-8 text-center">
          <h2 className="text-[18px] font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Try the free tools
          </h2>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-5 max-w-sm mx-auto">
            All calculators and converters are free — no login, no ads interrupting your work.
          </p>
          <Link href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors touch-manipulation">
            Browse All Tools <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}