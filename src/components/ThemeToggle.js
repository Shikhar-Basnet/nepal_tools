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
      className="p-2 rounded-full bg-gray-100 active:bg-gray-300 dark:bg-[#495057]
      dark:active:bg-[#adb5bd] transition-transform "
      aria-label="Toggle theme"
    >
      {isDark
        ? <Sun size={18} />
        : <Moon size={18} />}
    </button>
  )
}