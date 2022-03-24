module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './layout/**/*.{js,ts,jsx,tsx}', ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark' : 'rgb(28,28,30)',
        'dark-2' : 'rgb(38,38,40)',
        'tinted' : '#f6f6f6',
        'bold-red': '#ff5d7a',
        'bold-secondary': '#0081FF',
        'bold-secondary-dark': '#6665FE',
      },
      zIndex: {
        '-1': '-1',
        '-10': '-10',
      },
      margin: {
        '100vh': '100vh',
      },
      height: {
        '124': '30rem',
      },
      fontSize: {
        '14px': '14px',
        '16px': '16px',
        '20px': '20px',
        '50px': '50px',
       },
       maxWidth: {
        '8xl': '80%',
       },
       screens: {
        '4xl': '1800px',
    },
    animation: {
      'spin-slow': 'spin 8s linear infinite',
      'bounce-slow': 'bounce 8s infinite',
      'ping-slow': 'ping 20s infinite',
      'breath': 'breath 8s infinite',
      'vertical': 'vertical 8s infinite',
      
     },
     keyframes: {
      breath: {
        '0%,100%' : {opacity: 0},
        '50%' : {opacity: 1},
      },
      vertical: {
        '0%,100%' : {transform: 'translateY(0%)'},
        '50%' : {transform: 'translateY(-50%)'},
      },
     },
    outline: {
      blue: '1px solid #0081FF',
     }
    },
    brightness: {
      15 : '.15',
      25: '.25',
      175: '1.75',
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce']
    },
  },
  plugins: [],
}