/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html, js}", 
    "./public/**/*"
],
  theme: {
    extend: {
      fontFamily: {
        "headings": "'Poppins', sans-serif",
        "body": "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [],
}

