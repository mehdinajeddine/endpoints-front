module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      darkblue: "#2C47F5",
      white: "#FFFFFF",
      red: "#FF0000",
      dark: "#0C1B4D",
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
