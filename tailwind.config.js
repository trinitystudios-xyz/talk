import tailwindprime from 'tailwindcss-primeui'
import tailwindtypo from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindprime, tailwindtypo],
}
