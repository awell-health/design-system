/* eslint-disable */
/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  safelist: [],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
      code: ['Source Code Pro', 'monospace']
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        }
      }
    }
  },
  plugins: [require('daisyui'), require('tailwindcss-animate')],
  daisyui: {
    themes: [
      {
        awell: {
          primary: colors.blue[700],
          'primary-focus': colors.blue[800],
          'primary-content': colors.white,

          secondary: colors.white,
          'secondary-focus': colors.slate[100],
          'secondary-content': colors.slate[600],

          accent: colors.blue[50],
          'accent-focus': colors.blue[100],
          'accent-content': colors.blue[600],

          neutral: colors.slate[700],
          'neutral-focus': colors.slate[800],
          'neutral-content': colors.white,

          success: colors.green[600],
          'success-content': colors.white,

          info: colors.blue[600],
          'info-content': colors.white,

          warning: colors.orange[600],
          'warning-content': colors.white,

          error: colors.red[600],
          'error-content': colors.white,

          'base-100': colors.white,
          'base-200': colors.slate[100],
          'base-300': colors.slate[300],
          'base-content': colors.slate[600],

          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px'
        }
      }
    ]
  }
};
