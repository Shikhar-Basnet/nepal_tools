import Link from 'next/link'
import { tools } from '@/lib/tools'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#343a40]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">

          <div className="col-span-2 md:col-span-1">
            <div className="text-[18px] font-bold text-gray-900 dark:text-gray-100 mb-2">
              Tools<span className="text-blue-600 dark:text-blue-400">.NP</span>
            </div>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
              Free online tools built for Nepal. Fast, accurate, and easy to use.
            </p>
          </div>

          {[
            { heading: 'Tools',      items: tools.slice(0, 4).map(t => ({ label: t.title, href: `/${t.slug}` })) },
            { heading: 'More Tools', items: tools.slice(4).map(t => ({ label: t.title, href: `/${t.slug}` })) },
            { heading: 'Legal',      items: [{ label: 'Privacy Policy', href: '/privacy-policy' }, { label: 'Terms & Conditions', href: '/terms' }] },
            { heading: 'Company',    items: [{ label: 'About Us', href: '/about' }, { label: 'Contact Us', href: '/contact' }] },
          ].map(({ heading, items }) => (
            <div key={heading}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                {heading}
              </p>
              <ul className="space-y-2">
                {items.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Tools.NP · Free tools for Nepal
          </p>
          <p className="text-[12px] text-gray-400 dark:text-gray-500">
            Built with ❤️ in Nepal
          </p>
        </div>
      </div>
    </footer>
  )
}