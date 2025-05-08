/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      maxWidth: {
        screen: "100vw",
      },
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      },
    },
  },
  plugins: ["@tailwindcss/typography"],
};
