import { Flowbite } from "flowbite-react";

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        jura: "jura",
      },
    },
    colors: {
      satu: "#B4B4B8",
      dua: "#C7C8CC",
      tiga: "#E3E1D9",
      empat: "#F2EFE5",
      hitam: "#212121",
      krem: "#E7E0C9",
      telorasin: "#C1CFC0",
      taro: "#6B7AA1",
      dongker: "#11324D",
    },
  },
  plugins: [flowbite.plugin(), "@tailwindcss/forms"],
};
