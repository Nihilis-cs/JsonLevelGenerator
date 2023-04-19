/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          1: "#ffffff",
          2: "#fafafa",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#434343",
          10: "#262626",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        }
      }
    },
  },
  plugins: [],
}

