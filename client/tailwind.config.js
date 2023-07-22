/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#623eba",
        light: "#f3f4f8",
      },
      fontFamily: {
        leaguespartan: ['"League Spartan"', ...defaultTheme.fontFamily.sans],
        dmsans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "460px",
      },
    },
  },
  plugins: [],
};
