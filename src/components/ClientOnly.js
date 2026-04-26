'use client'
import dynamic from 'next/dynamic'

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: false,
  loading: () => null,
})

const AdBanner = dynamic(() => import('@/components/AdBanner'), {
  ssr: false,
  loading: () => null,
})

export function LazyFooter() {
  return <Footer />
}

export function LazyAdBanner({ slot }) {
  return <AdBanner slot={slot} />
}