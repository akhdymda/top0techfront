/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 10s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'drop-in': 'dropIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      },
      keyframes: {
        dropIn: {
          '0%': { 
            transform: 'translateY(-60vh)',
            opacity: '0'
          },
          '60%': {
            transform: 'translateY(10px)',
            opacity: '1'
          },
          '80%': {
            transform: 'translateY(-5px)'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        dropInBounce: {
          '0%': { 
            transform: 'translateY(-100vh)',
            opacity: '0'
          },
          '60%': {
            transform: 'translateY(20px)',
            opacity: '1'
          },
          '80%': {
            transform: 'translateY(-10px)'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        'sans-jp': ['var(--font-noto-sans-jp)'],
      },
    },
  },
  plugins: [require("daisyui")],
}
