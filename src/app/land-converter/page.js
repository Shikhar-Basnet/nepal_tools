import LandConverter from './LandConverter'

export const metadata = {
  title:
    'Land Unit Converter Nepal - Ropani, Aana, Kattha, Bigha Converter',

  description:
    'Free Nepali Land Unit Converter. Convert Ropani, Aana, Paisa, Daam, Kattha, Bigha, Dhur, Square Feet, and Square Meter instantly online.',

  keywords: [
    'Land unit converter Nepal',
    'Ropani to sq ft',
    'Kattha to sq ft',
    'Bigha converter Nepal',
    'Aana to square feet',
    'Nepali land converter',
    'Ropani Aana Paisa Daam converter',
    'Kattha Dhur converter',
    'Land measurement converter Nepal',
    'Sq ft to ropani',
    'Sq meter to ropani',
    'Nepal land calculator',
    'Ropani to kattha',
    'Bigha to ropani',
    'online land converter Nepal',
  ],

  alternates: {
    canonical: 'https://shikharbasnet.com.np/land-unit-converter',
  },

  openGraph: {
    title:
      'Land Unit Converter Nepal - Ropani, Kattha, Bigha Converter',
    description:
      'Convert Nepali land measurement units including Ropani, Aana, Kattha, Bigha, Dhur, Square Feet, and Square Meter instantly online.',
    url: 'https://shikharbasnet.com.np/land-unit-converter',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Land Unit Converter Nepal - Ropani ↔ Kattha Converter',
    description:
      'Fast and accurate Nepali land unit converter for Ropani, Aana, Kattha, Bigha, Dhur, Sq. Ft, and Sq. M conversions.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'utilities',
}

export default function Page() {
  return <LandConverter />
}