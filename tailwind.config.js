/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-extraneous-dependencies
// import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '5rem',
      },
    },
    // colors: { ...colors, black: colors.gray[8] },
    extend: {
      colors: {
        primary: { 0: '#181F2B', 1: '#2B313C', 2: '#223260' },
        secondary: {
          0: '#3f4555',
          1: '#3c4d62',
          2: '#8094ae',
        },
        loader: '#ffffff1a',
      },
    },
  },
  plugins: [],
};
