// Navbar.js
'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 dark:border-blue-900 bg-blue-600 dark:bg-blue-950 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 font-display text-2xl text-white font-bold hover:text-blue-100 transition-colors">
          Tools.NP
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-500 dark:border-blue-800 bg-blue-600 dark:bg-blue-950 px-4 py-3 flex flex-col gap-2">
         
          <Link href="/date-converter" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            Date Converter
          </Link>
          <Link href="/age-calculator" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            Age Calculator
          </Link>
          <Link href="/gpa-calculator" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            GPA Calculator
          </Link>
          <Link href="/land-converter" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            Land Converter
            </Link>
          <Link href="/nepse-calculator" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            NEPSE Calculator
          </Link>
          <Link href="/salary-tax" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            Salary Tax Calculator
            </Link>
          <Link href="/vat-calculator" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            VAT Calculator
            </Link>
          <Link href="/gold-calculator" onClick={() => setOpen(false)} prefetch={false}
            className="text-white hover:bg-blue-700 dark:hover:bg-blue-900 px-3 py-2 rounded-lg transition-colors text-sm font-medium">
            Gold Price Calculator
            </Link>
        </div>
      )}
    </nav>
  )
}