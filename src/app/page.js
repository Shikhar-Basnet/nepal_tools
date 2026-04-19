import ToolCard from '@/components/ToolCard'
import { tools } from '@/lib/tools'

export const metadata = {
  title: 'Nepal Tools - Free Online Calculators & Converters',
  description: 'Free tools for Nepal: Date Converter, Age Calculator, GPA, NEPSE, Tax, VAT, Gold Price and more.',
  title: 'Land Registry Verifier Nepal – Check Lalpurja & Plot Details',
  description: 'Verify land ownership and plot details in Nepal. Check lalpurja, kittaat number, and land records by district.',
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
          Free Online Tools for Every Nepali
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Instant calculators and converters, always free.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {tools.map(tool => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      {/* SEO Content Block */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Built for Nepal</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Nepal Tools provides free, fast, and accurate online calculators built specifically for Nepali users.
            From converting Bikram Sambat dates to calculating NEPSE share profit/loss, all tools are designed
            with Nepal's unique systems in mind.
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white text-lg mb-3">Popular Tools</h2>
          <ul className="space-y-2">
            {[
              ['📅', 'BS ↔ AD Date Converter', 'Bikram Sambat to Anno Domini and back'],
              ['📈', 'NEPSE Calculator', 'Profit/loss with broker & SEBON fees'],
              ['💰', 'Nepal Salary Tax', 'Income tax as per latest IRD slabs'],
              ['🏔️', 'Land Unit Converter', 'Ropani/Aana ↔ Bigha/Kattha/Dhur'],
            ].map(([icon, title, desc]) => (
              <li key={title} className="flex items-start gap-3">
                <span className="text-base mt-0.5">{icon}</span>
                <div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}