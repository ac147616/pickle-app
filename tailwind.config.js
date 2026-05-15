/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark: '#0c3120',
        },
        cream: '#f9e9da',
      },
      fontFamily: {
        belleza: ['Belleza', 'sans-serif'],
      },
    },
  },
  plugins: [],
}