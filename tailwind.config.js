/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        multiple: "width , height , backgroundColor , border-radius"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
