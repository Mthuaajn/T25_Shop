/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#5D5FEF",
      },
      boxShadow: {
        outer: "0px 5px 15px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
