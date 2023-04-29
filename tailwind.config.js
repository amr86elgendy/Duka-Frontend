/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        // sm: '2rem',
        // lg: '3rem',
        // xl: '4rem',
        // '2xl': '5rem',
      },
    },
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
