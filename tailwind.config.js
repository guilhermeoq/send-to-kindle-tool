/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        kindle: {
          orange: '#ff9900',
          blue: '#146eb4',
          dark: '#131921',
          surface: '#1e293b',
          card: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif']
      },
      boxShadow: {
        'glow-brand': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-sm': '0 0 15px -3px rgba(245, 158, 11, 0.2)',
      }
    },
  },
  plugins: [],
}
