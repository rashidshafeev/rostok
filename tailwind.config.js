/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        colBlack: '#222',
        colGreen: '#15765B',
        colGray: '#B5B5B5',
        colDarkGray: '#727272',
        colSuperLight: '#F5F5F5',
        colLightGray: '#EBEBEB',
      },
    },
    screens: {
      xl: '1280px',
      lg: '991px',
      md: '768px',
      mm: '576px',
      sm: '480px',
      xs: '380px',
    },
  },
  plugins: [],
};
