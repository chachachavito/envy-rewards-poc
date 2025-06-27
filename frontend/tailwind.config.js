/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'font-nouvelr',
    'font-nouvelrBook',
    'font-nouvelrVariable',
  ],
  theme: {
  extend: {
    fontFamily: {
      nouvelr: ['NouvelR', 'sans-serif'],
      nouvelrBook: ['NouvelR Book', 'sans-serif'],
      nouvelrVariable: ['NouvelR Variable', 'sans-serif'],
    },
  },
  },
  plugins: [],
}