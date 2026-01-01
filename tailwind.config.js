/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      boxShadow: {
        'custom-shadow': '0 5px 10px rgba(0, 0, 0, 1)',
      },
      animation: {
        bounceSlow: " bounce 4s linear infinite",
        bounceMiddle: "bounce 3s linear infinite",
        bouncefast: "bounce 2s linear infinite",
      },
    },
  },
  plugins: [],
}