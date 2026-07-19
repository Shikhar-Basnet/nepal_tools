import GPACalculator from './GPACalculator'

export const metadata = {
  title:
    'GPA Calculator Nepal - GPA to Percentage & SGPA Calculator Online',

  description:
    'Free GPA Calculator for Nepal students. Convert GPA to Percentage, Percentage to GPA, and calculate SGPA instantly using an easy online calculator.',

  keywords: [
    'GPA calculator Nepal',
    'GPA to percentage',
    'percentage to GPA',
    'SGPA calculator',
    'CGPA calculator Nepal',
    'Nepal GPA calculator',
    'college GPA calculator',
    'semester GPA calculator',
    'GPA converter Nepal',
    'student GPA calculator',
    'online GPA calculator',
    'GPA percentage converter',
    'calculate SGPA online',
    'Nepal education tools',
    'grade point calculator',
  ],

  alternates: {
    canonical: 'https://nepal-tools.vercel.app/gpa-calculator',
  },

  openGraph: {
    title:
      'GPA Calculator Nepal - GPA ↔ Percentage & SGPA Calculator',
    description:
      'Convert GPA to Percentage, Percentage to GPA, and calculate SGPA instantly with this free online GPA Calculator for Nepal students.',
    url: 'https://nepal-tools.vercel.app/gpa-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'GPA Calculator Nepal - GPA ↔ Percentage Converter',
    description:
      'Fast and accurate GPA to Percentage, Percentage to GPA, and SGPA Calculator online for Nepal students.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'education',
}

export default function Page() {
  return <GPACalculator />
}