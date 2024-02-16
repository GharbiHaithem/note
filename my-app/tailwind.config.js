/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#03001C', // Exemple de couleur personnalisée
        secondary: '#ffed4a', 
       
      },
    },
  },
  

}