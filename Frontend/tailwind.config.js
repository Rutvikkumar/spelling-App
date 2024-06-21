
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '50rem': '50rem',
      }
    },
  },
  plugins: [

    require('daisyui'),
    
  ],
}

