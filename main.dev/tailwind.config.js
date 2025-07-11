/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "Cascadia Code",
          "JetBrains Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      backgroundColor: {
        blackkind: "212121",
      },
      colors: {
        "terminal-green": "#535353",
        gray: {
          950: "#0a0a0a",
        },
      },
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
