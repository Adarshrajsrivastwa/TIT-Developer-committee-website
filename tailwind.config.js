/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tech-blue': '#3B82F6',
        'tech-purple': '#8B5CF6',
        'tech-gray': '#4B5563'
      },
      fontFamily: {
        'tech': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

