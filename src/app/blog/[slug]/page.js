// app/blog/[slug]/page.js
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'

// ── All post content lives here — replace with MDX/CMS later ──
const posts = {
  'how-to-convert-bs-to-ad-date': {
    title: 'How to Convert BS to AD Date in Nepal — Complete Guide',
    category: 'Date Converter',
    categoryColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
    date: '2026-04-15',
    readTime: '4 min read',
    toolSlug: 'date-converter',
    content: `
Bikram Sambat (BS), also called Vikram Samvat, is Nepal's official calendar system. It runs approximately 56 years and 8.5 months ahead of the Gregorian (AD) calendar. For example, AD 2025 corresponds roughly to BS 2081/82.

## Why BS to AD Conversion Matters

Almost every official document in Nepal — citizenship certificates, land deeds, school records, and bank forms — uses the BS calendar. However, international platforms, embassies, and global services use AD. Being able to convert accurately between the two is essential for:

- Filling visa and passport applications
- International university admissions
- Bank and financial records
- Government forms and certificates

## How the Conversion Works

The BS calendar has months of varying lengths (ranging from 29 to 32 days), unlike the fixed Gregorian months. The conversion cannot be done with a simple addition — it requires a lookup table that maps each BS month to its corresponding AD dates.

**General rule:** Add 56 years and approximately 8.5 months to a BS date to get the AD equivalent — but this is only approximate. For exact conversion, use a proper lookup table.

## Example

BS: 2081 Baisakh 1 → AD: April 14, 2024
BS: 2080 Poush 15 → AD: December 30, 2023

## Use the Free Tool

Our [BS/AD Date Converter](/date-converter) does this instantly and accurately using the official Nepal Government conversion table. No manual calculation needed.
    `,
  },
  'nepal-income-tax-guide-2081': {
    title: 'Nepal Income Tax Guide for FY 2081/82 — Slabs, SSF & Deductions',
    category: 'Salary Tax',
    categoryColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
    date: '2026-04-10',
    readTime: '7 min read',
    toolSlug: 'salary-tax',
    content: `
Nepal's income tax is governed by the Income Tax Act 2058. For FY 2081/82, the Inland Revenue Department (IRD) applies progressive tax slabs on individual taxable income.

## Tax Slabs for FY 2081/82 (Individual)

| Taxable Income (NPR) | Tax Rate |
|---|---|
| Up to 5,00,000 | 1% |
| 5,00,001 – 7,00,000 | 10% |
| 7,00,001 – 10,00,000 | 20% |
| 10,00,001 – 20,00,000 | 30% |
| Above 20,00,000 | 36% |

Married individuals and couples with a single income source get an additional NPR 1,00,000 exemption threshold.

## SSF Deductions

The Social Security Fund (SSF) contribution is 31% of basic salary — 20% employer contribution and 11% employee contribution. The employee's 11% contribution is deductible from gross income before tax is calculated.

## Allowable Deductions

- SSF employee contribution (11% of basic)
- Life insurance premium (up to NPR 40,000)
- Health insurance premium (up to NPR 20,000)
- Retirement fund contributions (up to limits)
- Donation to approved organizations

## How to Use the Calculator

Our [Salary Tax Calculator](/salary-tax) automatically applies FY 2081/82 slabs, computes your SSF deduction, and shows your net take-home salary.
    `,
  },
  'nepse-broker-commission-explained': {
    title: 'NEPSE Broker Commission, SEBON Fee & DP Charges Explained',
    category: 'NEPSE',
    categoryColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
    date: '2026-04-05',
    readTime: '5 min read',
    toolSlug: 'nepse-calculator',
    content: `
Every share transaction on the Nepal Stock Exchange (NEPSE) involves three main charges. Understanding them helps you calculate your real profit or loss.

## 1. Broker Commission

Broker commission is charged on the total transaction amount (buy or sell) and follows a tiered structure:

| Transaction Amount (NPR) | Commission Rate |
|---|---|
| Up to 50,000 | 0.60% |
| 50,001 – 5,00,000 | 0.55% |
| 5,00,001 – 20,00,000 | 0.50% |
| 20,00,001 – 1,00,00,000 | 0.45% |
| Above 1,00,00,000 | 0.30% |

Minimum commission is NPR 10 per transaction.

## 2. SEBON Regulatory Fee

The Securities Board of Nepal (SEBON) charges 0.015% of the transaction amount on both buy and sell sides.

## 3. DP (Depository Participant) Charges

CDS and Clearing Limited charges NPR 25 per company per sell transaction as a depository fee. This is a flat fee regardless of the number of shares sold.

## Why This Matters

Even if a share's price increases, you may still make a net loss if the charges exceed your gain. For short-term trades on small amounts, commission and DP charges can significantly eat into returns.

## Use the Calculator

The [NEPSE Profit/Loss Calculator](/nepse-calculator) automatically computes all three charges and shows your exact net gain or loss.
    `,
  },
  'nepal-vat-guide': {
    title: 'Nepal VAT 13% — When to Add It, When to Remove It',
    category: 'VAT Calculator',
    categoryColor: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400',
    date: '2026-03-28',
    readTime: '3 min read',
    toolSlug: 'vat-calculator',
    content: `
Value Added Tax (VAT) in Nepal is levied at a flat rate of 13% and is governed by the VAT Act 2052. It applies to most goods and services supplied by registered businesses.

## When to Add VAT

If you have a VAT-exclusive price (the base price before tax) and need to find the final consumer price:

**VAT-inclusive price = Base price × 1.13**

Example: NPR 1,000 base price → NPR 1,130 with VAT.

## When to Remove VAT (Reverse Calculation)

If you have a VAT-inclusive price and want to find the original base price:

**Base price = VAT-inclusive price ÷ 1.13**

Example: NPR 1,130 VAT-inclusive → NPR 1,000 base price.

## VAT-Exempt Items in Nepal

Some goods and services are exempt from VAT in Nepal, including:
- Basic agricultural products
- Healthcare services
- Educational services (certain types)
- Financial services

## Who Must Register for VAT?

Businesses with annual turnover exceeding NPR 50,00,000 must register for VAT. Below this threshold, registration is optional.

Use the [VAT Calculator](/vat-calculator) to add or remove 13% instantly.
    `,
  },
  'ropani-aana-bigha-land-units-nepal': {
    title: 'Ropani, Aana, Bigha, Kattha — Nepal Land Units Explained',
    category: 'Land Converter',
    categoryColor: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    date: '2026-03-20',
    readTime: '5 min read',
    toolSlug: 'land-converter',
    content: `
Nepal uses two distinct land measurement systems depending on the geography.

## Hilly System (Pahad)

Used in hilly and mountain regions including Kathmandu Valley.

| Unit | Equivalent |
|---|---|
| 1 Ropani | 16 Aana |
| 1 Aana | 4 Paisa |
| 1 Paisa | 4 Daam |
| 1 Ropani | 508.72 sq. meters |

## Terai System (Madhesh)

Used in the Terai plains of Nepal.

| Unit | Equivalent |
|---|---|
| 1 Bigha | 20 Kattha |
| 1 Kattha | 20 Dhur |
| 1 Bigha | 6,772.63 sq. meters |

## Cross-System Conversion

| Ropani | Square Meters | Bigha |
|---|---|---|
| 1 | 508.72 | 0.0751 |
| 1 | — | 1 Bigha = 13.31 Ropani |

## Practical Uses

- Land registration at the District Land Revenue Office uses the local system
- Banks and financial institutions require area in official units for valuation
- Real estate listings may use either system

Use the [Land Unit Converter](/land-converter) to convert between all Nepal land units instantly.
    `,
  },
  'gold-price-nepal-tola-gram-ratti': {
    title: 'Gold Price in Nepal — Tola, Gram & Ratti Explained',
    category: 'Gold Price',
    categoryColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
    date: '2026-03-12',
    readTime: '4 min read',
    toolSlug: 'gold-calculator',
    content: `
Gold in Nepal is priced and traded using traditional units — primarily the Tola. Understanding these units is essential when buying or selling gold jewelry or bars.

## Gold Units in Nepal

| Unit | Equivalent in Grams |
|---|---|
| 1 Tola | 11.664 grams |
| 1 Ratti | 0.1215 grams |
| 1 Tola | 96 Ratti |

## Fine Gold vs. Tejabi Gold

Nepal's gold market distinguishes between two grades:

- **Fine Gold (Asali):** 99.9% purity — higher price per Tola
- **Tejabi Gold:** 99.5% purity — slightly lower price

The daily gold price in Nepal is set by the Federation of Nepal Gold & Silver Dealers' Association and published each morning.

## How to Calculate Gold Value

**Value = (Price per Tola ÷ 11.664) × Weight in grams**

Or simply use the [Gold Price Calculator](/gold-calculator) which supports Tola, Gram, and Ratti with fine and Tejabi rates.

## Where to Check Daily Rates

The official daily rate is published by the Federation of Nepal Gold & Silver Dealers and is available on their website and through major Nepali news outlets each morning.
    `,
  },
  'gpa-to-percentage-nepal-universities': {
    title: 'GPA to Percentage Conversion for TU, PU & KU Nepal',
    category: 'GPA Calculator',
    categoryColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    date: '2026-03-05',
    readTime: '4 min read',
    toolSlug: 'gpa-calculator',
    content: `
Different universities in Nepal use different GPA scales and conversion formulas. Here is a guide for the three main universities.

## Tribhuvan University (TU)

TU uses a 4.0 GPA scale for most programs.

| Grade | GPA | Percentage Range |
|---|---|---|
| A+ | 4.0 | 90–100% |
| A | 3.6 | 80–89% |
| B+ | 3.2 | 70–79% |
| B | 2.8 | 60–69% |
| C+ | 2.4 | 50–59% |
| C | 2.0 | 40–49% |

**Formula:** Percentage = GPA × 25 (approximate)

## Pokhara University (PU)

PU also uses a 4.0 scale with similar grade points but slightly different percentage ranges depending on the faculty.

**Formula:** Percentage = GPA × 25 (approximate for most faculties)

## Kathmandu University (KU)

KU uses a 4.0 scale with a 10-point grade system in some departments.

**Formula:** Percentage = (GPA / 4.0) × 100

## Which Formula Should You Use?

Always check your official marksheet for the university's stated conversion formula. These are approximate conversions — for official purposes like job applications or international admissions, use the formula officially stated by your university.

Use the [GPA & Percent Calculator](/gpa-calculator) for instant conversion.
    `,
  },
  'how-to-calculate-age-in-bs': {
    title: 'How to Calculate Your Exact Age in Nepali BS Calendar',
    category: 'Age Calculator',
    categoryColor: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400',
    date: '2026-02-25',
    readTime: '3 min read',
    toolSlug: 'age-calculator',
    content: `
Calculating age in the Bikram Sambat calendar follows the same logic as the Gregorian system — subtract your birth date from today's date — but the varying month lengths in BS make manual calculation tricky.

## Why BS Age Calculation is Different

In the Gregorian calendar, months have fixed lengths (28–31 days). In the BS calendar, months vary from 29 to 32 days depending on the year, and these lengths change year to year. This means you cannot simply subtract dates without a proper conversion table.

## Manual Calculation Steps

1. Convert your birth date (BS) to the equivalent AD date
2. Calculate the difference from today's AD date in years, months, and days
3. Convert the result back if a BS-format age is needed

## Common Use Cases

- Citizenship applications require age as of a specific BS date
- School enrollment cutoffs are often defined by BS birth year
- Pension and retirement calculations use BS dates

## What Documents Require Age Proof?

- Citizenship certificate (Nagarikta)
- Voter ID registration
- Government job applications
- Passport applications

Use the [Age Calculator](/age-calculator) to find your exact age in years, months, and days from any BS or AD birth date.
    `,
  },
}

// Simple markdown-to-JSX renderer (no external lib needed)
function renderContent(markdown) {
  const lines = markdown.trim().split('\n')
  const elements = []
  let i = 0
  let tableBuffer = []
  let inTable = false

  const parseInline = (text) => {
    // Bold **text**, inline code `code`, links [text](href)
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-[13px] font-mono text-blue-700 dark:text-blue-300">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>')
  }

  while (i < lines.length) {
    const line = lines[i]

    // Heading h2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-[18px] font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
          {line.slice(3)}
        </h2>
      )
      i++; continue
    }

    // Table
    if (line.startsWith('|')) {
      tableBuffer.push(line)
      i++
      while (i < lines.length && lines[i].startsWith('|')) {
        tableBuffer.push(lines[i]); i++
      }
      const rows = tableBuffer.filter(r => !r.match(/^\|[-| ]+\|$/))
      const headers = rows[0].split('|').filter(Boolean).map(h => h.trim())
      const body = rows.slice(1)
      elements.push(
        <div key={i} className="my-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table className="w-full text-[13px]">
            <thead className="bg-gray-50 dark:bg-[#343a40]">
              <tr>{headers.map((h, j) => (
                <th key={j} className="px-4 py-2.5 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  {h}
                </th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {body.map((row, ri) => {
                const cells = row.split('|').filter(Boolean).map(c => c.trim())
                return (
                  <tr key={ri} className="bg-white dark:bg-gray-800">
                    {cells.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: parseInline(cell) }} />
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
      tableBuffer = []; continue
    }

    // Bullet list
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2)); i++
      }
      elements.push(
        <ul key={i} className="my-3 space-y-1.5 ml-2">
          {items.map((item, j) => (
            <li key={j} className="flex gap-2.5 text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Empty line
    if (line.trim() === '') { i++; continue }

    // Paragraph
    elements.push(
      <p key={i} className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.8] mb-3"
        dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
    )
    i++
  }
  return elements
}

export async function generateStaticParams() {
  return Object.keys(posts).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params          // ← await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: post.title,
    description: post.content.trim().slice(0, 155).replace(/[#*|`\[\]]/g, '') + '...',
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params          // ← await params
  const post = posts[slug]
  if (!post) notFound()

  const allSlugs = Object.keys(posts)
  const currentIdx = allSlugs.indexOf(params.slug)
  const related = allSlugs
    .filter(s => s !== params.slug)
    .slice(0, 3)
    .map(s => ({ slug: s, ...posts[s] }))

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Back */}
        <Link href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors">
          <ArrowLeft size={14} /> All Posts
        </Link>

        {/* Article card */}
        <article className="bg-white dark:bg-[#343a40] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">

          {/* Header */}
          <div className="px-6 pt-7 pb-5 border-b border-gray-100 dark:border-gray-700">
            <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3 ${post.categoryColor}`}>
              {post.category}
            </span>
            <h1 className="text-[22px] font-semibold text-gray-900 dark:text-gray-100 leading-snug tracking-tight mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-[12px] text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1.5"><Calendar size={12} />{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {renderContent(post.content)}
          </div>

          {/* Tool CTA */}
          <div className="mx-6 mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold text-blue-700 dark:text-blue-300 mb-0.5">
                Try the free tool
              </p>
              <p className="text-[12px] text-blue-600/70 dark:text-blue-400/70">
                Use our calculator for instant, accurate results.
              </p>
            </div>
            <Link href={`/${post.toolSlug}`}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-[13px] font-medium hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors touch-manipulation">
              Open Tool <ArrowRight size={13} />
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              More Articles
            </p>
            <div className="flex flex-col gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/blog/${r.slug}`}
                  className="group flex items-start gap-4 bg-white dark:bg-[#343a40] rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-sm transition-all duration-150 p-4">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1.5 ${r.categoryColor}`}>
                      {r.category}
                    </span>
                    <p className="text-[14px] font-medium text-gray-800 dark:text-gray-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {r.title}
                    </p>
                  </div>
                  <ArrowRight size={15} className="text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors mt-0.5 shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}