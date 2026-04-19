/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mukta', 'sans-serif'],
        display: ['"Yatra One"', 'serif'],
      },
      colors: {
        brand: {
          50:  '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea6c0a',
          700: '#c2550a',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}