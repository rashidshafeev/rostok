/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        colGreen: '#15765B',
        darkGray: '#727272',
      },
    },
  },
  plugins: [],
};
