
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      // Verify these paths match where your React components are located
      "./src/**/*.{js,jsx,ts,tsx}", 
      "./public/index.html",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }