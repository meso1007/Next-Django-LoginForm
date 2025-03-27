/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-color": "#17df69",
        "form-bg-color": "#2f4858",
        "ori-gray": "#EFEFEF",
        "ori-eme": "#00B1B9"
      },
    },
  },
  plugins: [],
};

