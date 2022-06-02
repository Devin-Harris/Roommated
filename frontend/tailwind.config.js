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
        accent: '#e42f2f',
        accent_dark: '#aa0007',
      },
      borderRadius: {
        sm: '.25rem',
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '100%': {
            transform: 'translateY(5%)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
};
