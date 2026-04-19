import './globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export const metadata = {
  metadataBase: new URL('https://nepaltools.com.np'),
  title: {
    default: 'Nepal Tools - Free Online Calculators & Converters',
    template: '%s | Nepal Tools',
  },
  description:
    'Free online tools for Nepal: Date Converter, Age Calculator, GPA Calculator, NEPSE Share Calculator, Salary Tax, VAT, Gold Price, Land Unit Converter and more.',
  keywords: [
    'Nepal tools', 'BS AD date converter', 'Nepal age calculator',
    'NEPSE calculator', 'Nepal salary tax calculator', 'VAT calculator Nepal',
    'gold price Nepal', 'Ropani Aana converter', 'GPA percent Nepal',
  ],
  openGraph: {
    title: 'Nepal Tools - Free Online Calculators',
    description: 'All the calculators and converters you need for Nepal.',
    url: 'https://nepaltools.com.np',
    siteName: 'Nepal Tools',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_NP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Nepal Tools' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://nepaltools.com.np' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8106368274356741"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <AdBanner slot="1234567890" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}