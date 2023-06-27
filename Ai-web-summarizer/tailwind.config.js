/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi:["Satoshi","sans-serif"],
        inter:["Inter","Sans-Serif"],
      }
    },
  },
  plugins: [],
}