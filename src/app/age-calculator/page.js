import AgeCalculator from './AgeCalculator'

export const metadata = {
  title: 'Age Calculator Nepal - Calculate Exact Age Online',
  description:
    'Free online Age Calculator for Nepal. Calculate exact age in years, months, days, weeks, hours, minutes, and seconds instantly.',

  keywords: [
    'Age Calculator Nepal',
    'Calculate age online',
    'Exact age calculator',
    'DOB calculator',
    'Age finder Nepal',
    'Birthday calculator',
    'Nepal age tool',
    'Online age calculator',
  ],

  alternates: {
    canonical: 'https://shikharbasnet.com.np/age-calculator',
  },

  openGraph: {
    title: 'Age Calculator Nepal - Calculate Exact Age Online',
    description:
      'Find your exact age in years, months, days, weeks, hours, minutes, and seconds instantly.',
    url: 'https://shikharbasnet.com.np/age-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator Nepal',
    description:
      'Free online calculator to find exact age from date of birth instantly.',
  },
}

export default function Page() {
  return <AgeCalculator />
}