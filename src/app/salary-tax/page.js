import SalaryTax from './SalaryTax'

export const metadata = {
  title:
    'Salary Tax Calculator Nepal - Income Tax Calculator FY 2082/83',

  description:
    'Free Nepal Salary Tax Calculator for FY 2082/83. Calculate income tax, EPF, SSF, CIT deductions, insurance rebates, and monthly tax payable instantly.',

  keywords: [
    'Salary tax calculator Nepal',
    'Nepal income tax calculator',
    'tax calculator Nepal',
    'salary calculator Nepal',
    'EPF calculator Nepal',
    'SSF calculator Nepal',
    'CIT calculator Nepal',
    'income tax Nepal FY 2082 83',
    'Nepal payroll tax calculator',
    'annual tax calculator Nepal',
    'monthly salary tax Nepal',
    'IRD tax calculator Nepal',
    'Nepal employee tax calculator',
    'tax slab Nepal',
    'salary after tax Nepal',
  ],

  alternates: {
    canonical: 'https://nepal-tools.vercel.app/salary-tax-calculator',
  },

  openGraph: {
    title:
      'Salary Tax Calculator Nepal - FY 2082/83',
    description:
      'Calculate Nepal salary tax, EPF, SSF, CIT deductions, insurance rebates, and net tax payable online instantly.',
    url: 'https://nepal-tools.vercel.app/salary-tax-calculator',
    siteName: 'Nepal Tools',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Salary Tax Calculator Nepal',
    description:
      'Fast and accurate Nepal salary tax calculator with EPF, SSF, CIT, deductions, and tax slab calculation for FY 2082/83.',
  },

  robots: {
    index: true,
    follow: true,
  },

  category: 'finance',
}

export default function Page() {
  return <SalaryTax />
}