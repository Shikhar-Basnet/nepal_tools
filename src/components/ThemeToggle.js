'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null  // ← prevents hydration mismatch

  const isDark = resolvedTheme === 'dark'  // use resolvedTheme, not theme

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-xl bg-gray-200 hover:scale-105 transition-transform "
      aria-label="Toggle theme"
    >
      {isDark
        ? <Sun size={18} className="text-stone-900" />
        : <Moon size={18} className="text-stone-900" />}
    </button>
  )
}