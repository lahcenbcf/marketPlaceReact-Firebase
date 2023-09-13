/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,html,js,tsx}",
"./src/*.{jsx,tsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

