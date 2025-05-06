/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gracesmews: ['GRACESMEWS', 'sans-serif'],
      },
      animation: {
        slowspin: 'slowspin 8s linear infinite',
      },
      keyframes: {
        slowspin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
