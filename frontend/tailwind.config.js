module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          400: '#EBEBEB',
          500: '#C4C4C4',
        },
        primary: '#455a64',
        primary_light: '#718792',
        primary_dark: '#1c313a',
        accent: ' #d32f2f',
        accent_light: '#F93030',
        accent_dark: '#9a0007',
      }
    }
  },
  plugins: [],
};