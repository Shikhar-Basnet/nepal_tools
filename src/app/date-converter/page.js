import DateConverter from './DateConverter'

export const metadata = {
  title: 'BS to AD Date Converter - Bikram Sambat to Anno Domini',
  description: 'Convert Nepali Bikram Sambat (BS) dates to English AD dates and vice versa. Fast, accurate, free Nepali date converter.',
  keywords: ['Date converter', 'BS AD converter Nepal', 'Bikram Sambat converter', 'Nepali date converter online'],
  alternates: { canonical: 'https://nepal-tools.vercel.app/date-converter' },
}

export default function Page() {
  return <DateConverter />
}