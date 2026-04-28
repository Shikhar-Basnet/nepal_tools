import ToolCard from '@/components/ToolCard'
import { tools } from '@/lib/tools'

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

    </div>
  )
}