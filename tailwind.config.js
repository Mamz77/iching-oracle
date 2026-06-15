/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf5',
          100: '#f8f1e1',
          200: '#f0e4c8',
          300: '#e4d2a7',
          400: '#d4ba81',
          500: '#c3a368',
          600: '#a8895a',
          700: '#8a6f4a',
          800: '#5f4d35',
          900: '#3a2f20',
        },
        ink: {
          50: '#f4f4f5',
          100: '#e4e4e7',
          200: '#a1a1aa',
          300: '#71717a',
          400: '#52525b',
          500: '#3f3f46',
          600: '#27272a',
          700: '#18181b',
          800: '#0f0f11',
          900: '#09090b',
        },
        cinnabar: {
          400: '#e0735c',
          500: '#c4533c',
          600: '#a8402c',
        },
        jade: {
          400: '#7ba88c',
          500: '#5c8a6d',
          600: '#456b52',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif"', '"Songti SC"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'parchment-gradient':
          'radial-gradient(ellipse at top, #f8f1e1 0%, #f0e4c8 50%, #e4d2a7 100%)',
        'ink-gradient':
          'radial-gradient(ellipse at top, #27272a 0%, #18181b 50%, #09090b 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'draw-line': 'drawLine 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '100%': { opacity: '1', transform: 'scaleX(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
