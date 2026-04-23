import ToolCard from '@/components/ToolCard'
import { tools } from '@/lib/tools'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">

      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Tools.NP - Free Nepali Online Tools
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Date Converter, Age Calculator, GPA Calculator, NEPSE Tools, Salary Tax,
          VAT Calculator, Gold Price, and more.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tools.map(tool => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

    </div>
  )
}