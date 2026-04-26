import './globals.css'
import { Suspense } from 'react'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'
import AdBanner from '@/components/AdBanner'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://shikharbasnet.com.np'),
  title: {
    default: 'Tools.NP - Free Online Calculators & Converters',
    template: '%s | Tools.NP',
  },
  description:
    'Free online tools for Nepal: Date Converter, Age Calculator, GPA Calculator, NEPSE Share Calculator, Salary Tax, VAT, Gold Price, Land Unit Converter and more.',
  keywords: [
    'Tools.NP', 'BS AD date converter', 'Tools.NP age calculator',
    'NEPSE calculator', 'Tools.NP salary tax calculator', 'VAT calculator Tools.NP',
    'gold price Tools.NP', 'Ropani Aana converter', 'GPA percent Tools.NP',
  ],
  openGraph: {
    title: 'Tools.NP - Free Online Calculators',
    description: 'All the calculators and converters you need for Nepal.',
    url: 'https://shikharbasnet.com.np',
    siteName: 'Tools.NP',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_NP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Tools.NP' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://shikharbasnet.com.np' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8106368274356741"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <AdBanner slot="2263999628" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}