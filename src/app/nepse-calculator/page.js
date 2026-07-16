import NEPSECalculator from './NEPSECalculator'

export const metadata = {
  title:
    'NEPSE Share Calculator Nepal - Profit, Loss, Broker & CGT Calculator',

  description:
    'Free NEPSE Share Calculator for Nepal investors. Calculate stock trading profit/loss, broker commission, SEBON fee, DP charge, and capital gains tax instantly.',

  keywords: [
    'NEPSE calculator',
    'share calculator Nepal',
    'NEPSE profit calculator',
    'stock profit calculator Nepal',
    'broker commission calculator Nepal',
    'capital gains tax calculator Nepal',
    'CGT calculator Nepal',
    'NEPSE trading calculator',
    'share market calculator Nepal',
    'SEBON fee calculator',
    'DP charge calculator Nepal',
    'NEPSE buy sell calculator',
    'Nepal stock calculator',
    'share trading calculator',
    'NEPSE investment calculator',
  ],

  alternates: {
    canonical: 'https://shikharbasnet.com.np/nepse-share-calculator',
  },

  openGraph: {
    title:
      'NEPSE Share Calculator Nepal - Profit & Loss Calculator',
    description:
      'Calculate NEPSE share trading profit/loss with broker commission, SEBON fee, DP charges, and CGT included.',
    url: 'https://shikharbasnet.com.np/nepse-share-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'NEPSE Share Calculator Nepal',
    description:
      'Fast and accurate NEPSE calculator for profit/loss, broker commission, SEBON fee, DP charge, and CGT.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'finance',
}

export default function Page() {
  return <NEPSECalculator />
}