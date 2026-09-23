/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0b1e36',
          blue: '#143b68',
          accent: '#1e5aa8',
          light: '#f4f6f9',
          border: '#dbe2ea',
          saffron: '#ff9933',
          green: '#138808'
        }
      }
    },
  },
  plugins: [],
}
