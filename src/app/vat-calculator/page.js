import VATCalculator from './VATCalculator'

export const metadata = {
  title:
    'VAT Calculator Nepal - Add or Extract 13% VAT Online',

  description:
    'Free VAT Calculator for Nepal. Add 13% VAT or extract VAT from VAT-inclusive amounts instantly using the Nepal VAT calculator.',

  keywords: [
    'VAT calculator Nepal',
    '13% VAT calculator',
    'VAT add calculator',
    'VAT extract calculator',
    'Nepal VAT calculator',
    'VAT inclusive calculator',
    'VAT exclusive calculator',
    'Nepal tax calculator',
    'VAT amount calculator',
    '13 percent VAT Nepal',
    'online VAT calculator Nepal',
    'business VAT calculator',
    'invoice VAT calculator',
    'VAT removal calculator',
    'Nepal Revenue Authority VAT',
  ],

  alternates: {
    canonical: 'https://nepal-tools.vercel.app/vat-calculator',
  },

  openGraph: {
    title:
      'VAT Calculator Nepal - Add & Extract 13% VAT',
    description:
      'Calculate 13% VAT instantly. Add VAT to amounts or extract VAT from VAT-inclusive prices using the Nepal VAT calculator.',
    url: 'https://nepal-tools.vercel.app/vat-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'VAT Calculator Nepal',
    description:
      'Fast and accurate 13% VAT calculator for Nepal businesses, invoices, and VAT-inclusive price calculations.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'finance',
}

export default function Page() {
  return <VATCalculator />
}