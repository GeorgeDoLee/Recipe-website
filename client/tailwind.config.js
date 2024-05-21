/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cornstick': '#F6F1D1',
        'blue': {
          'rich': '#0B2027',
          'cerulean': '#40798C'
        }
      }
    },
  },
  plugins: [],
}

