/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  safelist: [],
  theme: {},
  plugins: [require('daisyui'), require('tailwindcss-animate')],
  daisyui: {
    themes: [
      {
        awell: {                
          'primary': colors.blue[600],
          'primary-content' : colors.white,

          'secondary' : colors.slate[600],
          'secondary-content' : colors.white,

          'accent' : '#37cdbe',
          'accent-content' : colors.white,

          'success': colors.green[600],
          'success-content': colors.white,

          'info' : colors.blue[400],
          'info-content': colors.white,

          'warning': colors.orange[600],
          'warning-content': colors.white,

          'error': colors.red[600],
          'error-content': colors.white,

          'neutral': colors.slate[800],
          'neutral-content': colors.white,

          'base-100' : colors.white,
          'base-200' : colors.slate[100],
          'base-300' : colors.slate[300],
          'base-content' : colors.slate[600],

         '--rounded-box': '1rem',          
         '--rounded-btn': '.5rem',        
         '--rounded-badge': '1.9rem',      

         '--animation-btn': '.25s',       
         '--animation-input': '.2s',       

         '--btn-text-case': 'uppercase',   
         '--navbar-padding': '.5rem',      
         '--border-btn': '1px',        
        },
      },
    ],
  },
}