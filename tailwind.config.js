/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        graybg: "#EBF0F3",
        primary_text: "#1B6770",
        secondary_text: "#86898e",
        activebg:"#DDE8EB"
      },
    },
  },
  plugins: [],
};
