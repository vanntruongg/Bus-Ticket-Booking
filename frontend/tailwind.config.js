/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora'],
        pacifico: ['Pacifico'],
        codePro: ['Source Code Pro'],
        openSans: ['Open Sans'],
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
        26: '28px',
        28: '28px',
        32: '32px',
        36: '36px',
        48: '48px',
        56: '56px',
      },
      colors: {
        primary: {
          50: '#eefffa',
          100: '#c6fff2',
          200: '#8effe6',
          300: '#4dfbd9',
          400: '#19e8c5',
          500: '#00c5a7',
          600: '#00a48f',
          700: '#028374',
          800: '#08675d',
          900: '#0c554d',
          950: '#003431',
        },
      },
      boxShadow: {
        mdCustom:
          '6px 6px 16px 0 rgba(0, 0, 0, 0.2), 4px 4px 16px 0 rgba(255, 255, 255, 0.3)',
        smCustom:
          '2px 2px 8px 0 rgba(0, 0, 0, 0.1), 2px 2px 8px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        fadeIn: 'fadeIn .4s linear',
        fadeInToTop: 'fadeInToTop .5s linear',
        fadeInToLeft: 'fadeInToLeft .5s linear',
        fadeInToRight: 'fadeInToRight .5s linear',
        fadeInToBottom: 'fadeInToBottom .5s linear',
        progress: 'progress 3s linear',
        showMenu: 'showMenu 3s linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInToTop: {
          '0%': { transform: 'translateY(60px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeInToBottom: {
          '0%': { transform: 'translateY(-60px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeInToLeft: {
          '0%': { transform: 'translateX(60px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        fadeInToRight: {
          '0%': { transform: 'translateX(-60px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        progress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        showMenu: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
