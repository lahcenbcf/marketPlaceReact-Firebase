/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,html,js,tsx}",
"./src/*.{jsx,tsx,js}"],
  theme: {
    extend: {
      flex:{
        flexFluid:"max(calc((100% - 4rem) / 2),25rem)"
      }
    },
  },
  plugins: [require("daisyui")],
}

