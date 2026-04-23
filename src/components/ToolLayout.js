import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdBanner from './AdBanner'

export default function ToolLayout({ title, description, icon, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <Link href="/" className="inline-flex items-center gap-1 text-md text-gray-700 dark:text-gray-50 hover:text-blue-600 mb-2 transition-colors">
        <ArrowLeft size={14} /> All Tools
      </Link>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{icon}</span>
        <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-200">{title}</h1>
      </div>
      <p className="text-gray-500 dark:text-gray-300 mb-4">{description}</p>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        {children}
      </div>
    </div>
  )
}
<AdBanner slot="2263999628" />