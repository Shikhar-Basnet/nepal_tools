import Link from 'next/link'

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-500 hover:border-gray-900 dark:hover:border-gray-100 bg-gray-50 dark:bg-gray-900 p-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="text-2xl">{tool.icon}</div>

      {/* Title */}
      <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-1">{tool.title}</h2>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{tool.description}</p>

      {/* CTA */}
      <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
        Use Tool →
      </button>
    </Link>
  )
}