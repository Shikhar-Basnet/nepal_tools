'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, Home, Info, Mail, ChevronRight, Wrench } from 'lucide-react'

const primaryLinks = [
  { href: '/',        label: 'Home',       icon: Home },
  { href: '/about',   label: 'About Us',   icon: Info },
  { href: '/contact', label: 'Contact Us', icon: Mail },
]

const toolLinks = [
  { href: '/date-converter',   label: 'Date Converter'   },
  { href: '/age-calculator',   label: 'Age Calculator'   },
  { href: '/gpa-calculator',   label: 'GPA Calculator'   },
  { href: '/land-converter',   label: 'Land Converter'   },
  { href: '/nepse-calculator', label: 'NEPSE Calculator'  },
  { href: '/salary-tax',       label: 'Salary Tax'       },
  { href: '/vat-calculator',   label: 'VAT Calculator'   },
  { href: '/gold-calculator',  label: 'Gold Price'       },
]

const DURATION = 220

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [visible, setVisible] = useState(false)
  const pathname              = usePathname()
  const drawerRef             = useRef(null)
  const hamburgerRef          = useRef(null)
  const touchStartY           = useRef(null)
  const touchStartX           = useRef(null)
  const rafRef                = useRef(null)
  const closeTimer            = useRef(null)

  // Exact match for '/', prefix match for everything else
  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  const openDrawer = () => {
    clearTimeout(closeTimer.current)
    cancelAnimationFrame(rafRef.current)
    setOpen(true)
    rafRef.current = requestAnimationFrame(() =>
      requestAnimationFrame(() => setVisible(true))
    )
  }

  const closeDrawer = () => {
    cancelAnimationFrame(rafRef.current)
    setVisible(false)
    closeTimer.current = setTimeout(() => setOpen(false), DURATION)
  }

  const toggleDrawer = () => (open ? closeDrawer() : openDrawer())

  useEffect(() => { if (open) closeDrawer() }, [pathname])
  useEffect(() => () => {
    clearTimeout(closeTimer.current)
    cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (!open) return
    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const onTouchEnd = (e) => {
      if (touchStartY.current === null) return
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current)
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current)
      touchStartY.current = touchStartX.current = null
      if (dy > 8 || dx > 8) return
      if (!drawerRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target))
        closeDrawer()
    }
    const onMouseDown = (e) => {
      if (!drawerRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target))
        closeDrawer()
    }
    const t2 = setTimeout(() => {
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('touchstart', onTouchStart, { passive: true })
      document.addEventListener('touchend',   onTouchEnd,   { passive: true })
    }, 10)
    return () => {
      clearTimeout(t2)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend',   onTouchEnd)
    }
  }, [open])

  const t = `${DURATION}ms ease-in-out`

  return (
    <>
      <style>{`
        html { scroll-padding-top: 68px; }
        @media (min-width: 768px) { html { scroll-padding-top: 105px; } }
      `}</style>

      {open && (
        <div
          aria-hidden="true"
          onMouseDown={closeDrawer}
          onTouchStart={closeDrawer}
          style={{ opacity: visible ? 1 : 0, transition: `opacity ${t}` }}
          className="fixed inset-0 z-40 md:hidden bg-black/30 backdrop-blur-[1px]"
        />
      )}

      <nav className="sticky top-0 z-50 bg-white dark:bg-[#343a40] border-b border-[#e8eaed] dark:border-[#404144]">

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">

          <Link href="/"
            className="shrink-0 text-[22px] font-bold text-[#202124] dark:text-[#e8eaed] hover:opacity-75 active:opacity-50 transition-opacity">
            Tools<span className="text-[#1a73e8] dark:text-[#8ab4f8]">.NP</span>
          </Link>

          {/* Desktop primary links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {primaryLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link key={href} href={href}
                  className={`relative px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-150
                    ${active
                      ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#1a3a5c]'
                      : 'text-[#3c4043] dark:text-[#bdc1c6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#35363a]'
                    }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8]" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-1 ml-auto">
            <ThemeToggle />
            <button
              ref={hamburgerRef}
              onClick={toggleDrawer}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="md:hidden relative w-8 h-8 rounded-full flex items-center justify-center touch-manipulation bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-[#35363a] dark:hover:bg-[#404144] dark:active:bg-[#4a4b4f] transition-colors duration-150"
            >
              <span aria-hidden="true" style={{
                position: 'absolute',
                opacity: visible ? 0 : 1,
                transform: visible ? 'rotate(90deg) scale(0.6)' : 'rotate(0deg) scale(1)',
                transition: `opacity ${t}, transform ${t}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Menu size={18} />
              </span>
              <span aria-hidden="true" style={{
                position: 'absolute',
                opacity: visible ? 1 : 0,
                transform: visible ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.6)',
                transition: `opacity ${t}, transform ${t}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={18} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop tools strip */}
        <div className="hidden md:block border-t border-[#e8eaed] dark:border-[#404144]">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-0.5 overflow-x-auto scrollbar-none">
            {toolLinks.map(({ href, label }) => {
              const active = isActive(href)
              return (
                <Link key={href} href={href} prefetch={false}
                  className={`relative shrink-0 px-3 py-2 text-[13px] font-medium transition-all duration-150 whitespace-nowrap touch-manipulation
                    ${active
                      ? 'text-[#1a73e8] dark:text-[#8ab4f8]'
                      : 'text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f1f3f4] dark:hover:bg-[#35363a] rounded-md'
                    }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a73e8] dark:bg-[#8ab4f8] rounded-t-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div
            ref={drawerRef}
            style={{
              transform: visible ? 'translateX(0)' : 'translateX(100%)',
              transition: `transform ${t}`,
              boxShadow: '-4px 0 24px rgba(0,0,0,0.18)',
            }}
            className="fixed top-0 right-0 h-full w-[272px] z-50 md:hidden flex flex-col bg-white dark:bg-[#292a2d]"
          >
            <div className="flex items-center justify-between px-3 h-14 border-b border-[#e8eaed] dark:border-[#404144] shrink-0">
              <span className="text-[15px] font-semibold text-[#202124] dark:text-[#e8eaed] pl-1">Menu</span>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button onClick={closeDrawer} aria-label="Close menu"
                  className="w-8 h-8 rounded-full flex items-center justify-center touch-manipulation bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-[#35363a] dark:hover:bg-[#404144] dark:active:bg-[#4a4b4f] text-[#5f6368] dark:text-[#9aa0a6] transition-colors duration-150">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-3 pt-3 pb-1">
                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-widest text-[#9aa0a6] dark:text-[#5f6368]">
                  Navigate
                </p>
                {primaryLinks.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href)
                  return (
                    <Link key={href} href={href}
                      className={`flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-[14px] font-medium transition-colors touch-manipulation select-none mb-0.5
                        ${active
                          ? 'bg-[#e8f0fe] dark:bg-[#1a3a5c] text-[#1a73e8] dark:text-[#8ab4f8]'
                          : 'text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#f1f3f4] dark:hover:bg-[#35363a] active:bg-[#e8f0fe] dark:active:bg-[#1a3a5c]'
                        }`}
                    >
                      <Icon size={17} className={active ? 'text-[#1a73e8] dark:text-[#8ab4f8]' : 'text-[#5f6368] dark:text-[#9aa0a6]'} />
                      <span className="flex-1">{label}</span>
                      {active && <ChevronRight size={14} className="text-[#1a73e8] dark:text-[#8ab4f8]" />}
                    </Link>
                  )
                })}
              </div>

              <div className="mx-4 my-2 border-t border-[#e8eaed] dark:border-[#404144]" />

              <div className="px-3 pb-4">
                <div className="flex items-center gap-1.5 px-2 pb-1">
                  <Wrench size={11} className="text-[#9aa0a6] dark:text-[#5f6368]" />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9aa0a6] dark:text-[#5f6368]">Tools</p>
                </div>
                {toolLinks.map(({ href, label }) => {
                  const active = isActive(href)
                  return (
                    <Link key={href} href={href} prefetch={false}
                      className={`flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-[14px] font-medium transition-colors touch-manipulation select-none mb-0.5
                        ${active
                          ? 'bg-[#e8f0fe] dark:bg-[#1a3a5c] text-[#1a73e8] dark:text-[#8ab4f8]'
                          : 'text-[#3c4043] dark:text-[#bdc1c6] hover:bg-[#f1f3f4] dark:hover:bg-[#35363a] active:bg-[#e8f0fe] dark:active:bg-[#1a3a5c]'
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${active ? 'bg-[#1a73e8] dark:bg-[#8ab4f8]' : 'bg-[#dadce0] dark:bg-[#5f6368]'}`} />
                      <span className="flex-1">{label}</span>
                      {active && <ChevronRight size={14} className="text-[#1a73e8] dark:text-[#8ab4f8]" />}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[#e8eaed] dark:border-[#404144] shrink-0">
              <p className="text-[11px] text-[#9aa0a6] dark:text-[#5f6368] text-center">
                Tools.NP · Free tools for Nepal
              </p>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}