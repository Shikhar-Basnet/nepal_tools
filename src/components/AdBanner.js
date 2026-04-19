'use client'
import { useEffect } from 'react'

const IS_DEV = process.env.NODE_ENV === 'development'

export default function AdBanner({ slot, format = 'auto' }) {
  useEffect(() => {
    if (IS_DEV) return
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  // Localhost: show a placeholder box
  if (IS_DEV) {
    return (
      <div className="w-full my-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-24">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          📢 Ad Placeholder — slot: {slot}
        </p>
      </div>
    )
  }

  // Production: real AdSense ad
  return (
    <div className="w-full my-6 text-center overflow-hidden">
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-8106368274356741"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}