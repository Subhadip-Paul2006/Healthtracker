/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: '#3B2F2F',
        burnt: '#D96C2D',
        sand: '#E6D3B3',
        ivory: '#FAF7F0',
      }
    },
  },
  plugins: [],
}
