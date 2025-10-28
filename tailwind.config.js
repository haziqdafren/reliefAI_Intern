/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'corporate': ['IBM Plex Sans', 'Work Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'heading': ['Work Sans', 'IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        'primary': {
          100: '#FAF8F5',
          200: '#F5F1ED', 
          300: '#F0E8E3',
          400: '#E09B8A',
          500: '#D88A75',
        },
        'text': {
          primary: '#2C2C2C',
          secondary: '#6B6B6B',
        }
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawLine: {
          '0%': { 'stroke-dasharray': '0 100' },
          '100%': { 'stroke-dasharray': '100 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      borderRadius: {
        'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'blob': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'wave': '100px 0px 100px 0px',
      },
      clipPath: {
        'wave': 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        'diagonal': 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
        'blob': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.clip-wave': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        },
        '.clip-diagonal': {
          'clip-path': 'polygon(0 0, 100% 0, 90% 100%, 0 100%)',
        },
        '.clip-blob': {
          'clip-path': 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        },
        '.animate-on-scroll': {
          opacity: '0',
          transform: 'translateY(30px)',
          transition: 'all 0.8s ease-out',
        },
        '.animate-on-scroll.visible': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}