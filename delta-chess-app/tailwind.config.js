/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'delta-gold': '#d4af37',  // El dorado de los trofeos
        'chess-dark': '#0f0f0f',  // El negro mate del tablero
        'delta-green': '#062c23', // Un toque de verde Delta
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}