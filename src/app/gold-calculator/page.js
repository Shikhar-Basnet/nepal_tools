import GoldCalculator from './GoldCalculator'

export const metadata = {
  title: 'Gold Calculator Nepal - Calculate Gold Price by Tola, Gram & Purity',

  description:
    'Free Gold Calculator for Nepal. Calculate gold value instantly using Tola, Gram, or Ratti with 24K, 22K, 18K, and 14K purity rates.',

  keywords: [
    'Gold Calculator Nepal',
    'Gold price calculator',
    'Tola gold calculator',
    'Gold value calculator',
    'Nepal gold calculator',
    'Gold rate Nepal',
    '24K gold calculator',
    '22K gold calculator',
    'Gold calculator in Tola',
    'Gold calculator in grams',
    'Ratti to Tola converter',
    'Gold valuation tool',
  ],

  alternates: {
    canonical: 'https://shikharbasnet.com.np/gold-calculator',
  },

  openGraph: {
    title: 'Gold Calculator Nepal',
    description:
      'Calculate gold value in Tola, Gram, and Ratti using live gold rates and purity levels.',
    url: 'https://shikharbasnet.com.np/gold-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Gold Calculator Nepal',
    description:
      'Free online gold calculator for Nepal with Tola, Gram, Ratti and purity support.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'finance',
}

export default function Page() {
  return <GoldCalculator />
}