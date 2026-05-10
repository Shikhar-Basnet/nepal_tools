import DateConverter from './DateConverter'

export const metadata = {
  title: 'BS to AD Date Converter Nepal - Convert Bikram Sambat Online',

  description:
    'Free Nepali BS to AD Date Converter. Convert Bikram Sambat (BS) dates to English AD dates and AD to BS instantly with accurate Nepali calendar conversion.',

  keywords: [
    'BS to AD converter',
    'AD to BS converter',
    'Nepali date converter',
    'Bikram Sambat converter',
    'BS AD converter Nepal',
    'Nepali calendar converter',
    'Convert BS to AD',
    'Convert AD to BS',
    'Nepal date converter online',
    'Nepali patro converter',
  ],

  alternates: {
    canonical: 'https://nepal-tools.vercel.app/date-converter',
  },

  openGraph: {
    title: 'BS to AD Date Converter Nepal',
    description:
      'Convert Bikram Sambat (BS) dates to AD and AD dates to BS instantly using the accurate Nepali calendar converter.',
    url: 'https://nepal-tools.vercel.app/date-converter',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'BS to AD Date Converter Nepal',
    description:
      'Fast and accurate Nepali date converter for BS ↔ AD conversion online.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'utilities',
}

export default function Page() {
  return <DateConverter />
}