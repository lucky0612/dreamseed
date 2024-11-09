/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Environmental theme colors
        'moss': {
          50: '#f0f7f4',
          100: '#dcefe4',
          200: '#bbd9c7',
          300: '#92c0a6',
          400: '#69a483',
          500: '#4b8467',
          600: '#3b6951',
          700: '#315442',
          800: '#2a4437',
          900: '#243a2f',
        },
        'emerald-water': {
          50: '#f0fcfc',
          100: '#d0f7f7',
          200: '#a3edec',
          300: '#70dcd9',
          400: '#44c3bf',
          500: '#2aa39f',
          600: '#238481',
          700: '#206b68',
          800: '#1d5654',
          900: '#1a4847',
        },
        'forest': {
          50: '#f2f7f4',
          100: '#e0ece6',
          200: '#c1d9ce',
          300: '#9abfb0',
          400: '#739f8e',
          500: '#578272',
          600: '#46685c',
          700: '#3b554c',
          800: '#334741',
          900: '#2c3c37',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'nature-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2YwZjdmNCIvPgo8cGF0aCBkPSJNMCAwTDYwIDYwTTYwIDBMMCAzME0zMCA2MEw2MCAzMCIgc3Ryb2tlPSIjZGNlZmU0IiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')",
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
}