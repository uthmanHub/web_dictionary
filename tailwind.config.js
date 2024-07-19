/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "heading-l": "64px",
        "heading-m": "24px",
        "heading-s": "20px",
        "body-m": "18px",
        "body-s": "14px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Lora", "", "Merriweather"],
        mono: ["Inconsolata", "monospace", "Fira Code"],
      },
      colors: {
        gray1: "#1F1F1F",
        gray2: "#2D2D2D",
        gray3: "#3A3A3A",
        gray4: "#F4F4F4",
        gray5: "#050505",
        gray7: "#757575",
        gray9: "#E9E9E9",
        white: "#FFFFFF",
        purple: "#A445ED",
        red: "#FF5252",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
      },
    },
  },
  plugins: [],
};
