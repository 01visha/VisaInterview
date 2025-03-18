/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",  // Include all files in the app directory
 "./src/**/*.{js,jsx,ts,tsx}",    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the components directory
    "./styles/**/*.{css}",                // Include CSS files in the styles directory
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Arial', 'sans-serif'], // Add the Inter font family
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        scroll: "scroll 30s linear infinite",
      },
    },
  },
  plugins: [],
}
