import Link from 'next/link'
import { tools } from '@/lib/tools'

export default function Footer() {
  return (
    <footer className="border border-gray-300 dark:border-gray-500 bg-stone-800 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl text-white font-bold mb-2">NepalTools</div>
            <p className="text-sm text-gray-300">Free online tools built for Nepal. Fast, accurate, and easy to use.</p>
          </div>
          <div>
            <p className="font-bold text-gray-300 mb-3 text-md">Tools</p>
            <ul className="space-y-2">
              {tools.slice(0, 4).map(t => (
                <li key={t.slug}><Link href={`/${t.slug}`} className="text-sm text-gray-300 hover:text-underline">{t.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-gray-300 mb-3 text-md">More Tools</p>
            <ul className="space-y-2">
              {tools.slice(4).map(t => (
                <li key={t.slug}><Link href={`/${t.slug}`} className="text-sm text-gray-300 hover:text-underline">{t.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 text-center text-xs text-gray-300">
          © {new Date().getFullYear()} NepalTools - Made with ❤️ for Nepal
        </div>
      </div>
    </footer>
  )
}