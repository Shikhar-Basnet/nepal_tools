'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Search } from 'lucide-react'

const navLinks = [
  { href: '/date-converter', label: 'Date Converter' },
  { href: '/age-calculator', label: 'Age Calculator' },
  { href: '/gpa-calculator', label: 'GPA Calculator' },
  { href: '/land-converter', label: 'Land Converter' },
  { href: '/nepse-calculator', label: 'NEPSE Calculator' },
  { href: '/salary-tax', label: 'Salary Tax' },
  { href: '/vat-calculator', label: 'VAT Calculator' },
  { href: '/gold-calculator', label: 'Gold Price' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false) // controls CSS transition
  const drawerRef = useRef(null)
  const hamburgerRef = useRef(null)
  const touchStartY = useRef(null)
  const touchStartX = useRef(null)
  const closeTimer = useRef(null)

  // Animate open: mount first, then trigger transition on next frame
  const openDrawer = () => {
    setOpen(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
  }

  // Animate close: trigger transition out, then unmount after duration
  const closeDrawer = () => {
    setVisible(false)
    closeTimer.current = setTimeout(() => setOpen(false), 220)
  }

  const toggleDrawer = () => {
    if (open) closeDrawer()
    else openDrawer()
  }

  useEffect(() => {
    return () => clearTimeout(closeTimer.current)
  }, [])

  // Outside click/tap — skip if scrolling
  useEffect(() => {
    if (!open) return

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return
      const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
      const deltaX = Math.abs(e.changedTouches[0].clientX - touchStartX.current)
      touchStartY.current = null
      touchStartX.current = null
      if (deltaY > 8 || deltaX > 8) return
      const insideDrawer = drawerRef.current?.contains(e.target)
      const insideHamburger = hamburgerRef.current?.contains(e.target)
      if (!insideDrawer && !insideHamburger) closeDrawer()
    }

    const handleMouseDown = (e) => {
      const insideDrawer = drawerRef.current?.contains(e.target)
      const insideHamburger = hamburgerRef.current?.contains(e.target)
      if (!insideDrawer && !insideHamburger) closeDrawer()
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleMouseDown)
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })
    }, 10)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [open])

  return (
    <>
      <style>{`
        html { scroll-padding-top: 68px; }
        @media (min-width: 768px) { html { scroll-padding-top: 105px; } }
      `}</style>

      <nav className="sticky top-0 z-50 bg-white dark:bg-[#202124] border-b border-[#e8eaed] dark:border-[#3c4043]">

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeDrawer}
            className="flex items-center shrink-0 text-[22px] font-medium text-[#202124] dark:text-[#e8eaed] hover:opacity-80 active:opacity-60 transition-opacity"
          >
            Tools
            <span className="text-[#1a73e8] dark:text-[#669df6]">.NP</span>
          </Link>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-[#dadce0] dark:bg-[#3c4043] mx-1" />

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm items-center gap-2 h-9 px-3 rounded-full border border-[#dadce0] dark:border-[#3c4043] bg-[#f1f3f4] dark:bg-[#303134] hover:bg-white dark:hover:bg-[#3c4043] hover:border-[#1a73e8] dark:hover:border-[#669df6] focus-within:bg-white dark:focus-within:bg-[#303134] focus-within:border-[#1a73e8] dark:focus-within:border-[#669df6] focus-within:shadow-[0_0_0_2px_rgba(26,115,232,0.2)] transition-all duration-150">
            <Search size={15} className="text-[#5f6368] dark:text-[#9aa0a6] shrink-0" />
            <input
              type="text"
              placeholder="Search tools"
              className="flex-1 bg-transparent text-[13px] text-[#202124] dark:text-[#e8eaed] placeholder-[#80868b] dark:placeholder-[#9aa0a6] outline-none"
            />
          </div>

          <div className="flex-1 md:hidden" />

          {/* Right side */}
          <div className="flex items-center gap-1 ml-auto">
            <ThemeToggle />
            {/* Hamburger — fixed 20×20 container, icons overlay and cross-fade */}
            <button
              ref={hamburgerRef}
              onClick={toggleDrawer}
              className="md:hidden p-2 rounded-full text-[#5f6368] dark:text-[#9aa0a6] hover:bg-[#f1f3f4] active:bg-[#e8eaed] dark:hover:bg-[#303134] dark:active:bg-[#3c4043] transition-colors touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className="relative block w-5 h-5">
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-150 ease-in-out ${open ? 'opacity-0 rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
                  <Menu size={20} />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-150 ease-in-out ${open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-75'}`}>
                  <X size={20} />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Desktop nav strip */}
        <div className="hidden md:block border-t border-[#e8eaed] dark:border-[#3c4043] bg-white dark:bg-[#202124]">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto scrollbar-none">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="shrink-0 px-3 py-2.5 text-[13px] font-medium text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#669df6] hover:bg-[#f1f3f4] active:bg-[#e8f0fe] dark:hover:bg-[#303134] dark:active:bg-[#1e3a5f] rounded transition-colors whitespace-nowrap touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile drawer — always mounted when open=true, visibility driven by `visible` */}
        {open && (
          <div
            ref={drawerRef}
            className={`
              md:hidden border-t border-[#e8eaed] dark:border-[#3c4043]
              bg-white dark:bg-[#202124] px-3 py-2 flex flex-col
              overflow-hidden
              transition-all duration-200 ease-in-out
              ${visible
                ? 'max-h-[600px] opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2'
              }
            `}
          >

            {/* Mobile links */}
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeDrawer}
                prefetch={false}
                className="flex items-center px-3 py-3 min-h-[40px] text-[14px] font-medium text-[#202124] dark:text-[#e8eaed] rounded-lg hover:bg-[#f1f3f4] active:bg-[#e8f0fe] hover:text-[#1a73e8] active:text-[#1a73e8] dark:hover:bg-[#303134] dark:active:bg-[#1e3a5f] dark:hover:text-[#669df6] dark:active:text-[#669df6] transition-colors touch-manipulation select-none"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}