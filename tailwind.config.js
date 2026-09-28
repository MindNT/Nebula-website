/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        azul: {
          200: "#B9D2EC",
          300: "#4E9BE2",
          400: "#1663BE",
          500: "#034EA2",
          600: "#033D83",
          700: "#022C5E",
        },
        rojo: {
          300: "#E9A0A0",
        },
        tinta: {
          600: "#1F1F22",
          700: "#141416",
          800: "#0B0B0D",
          900: "#050505",
        },
      },
      fontFamily: {
        sans: [
          '"Public Sans"',
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      letterSpacing: {
        display: "-0.03em",
        titulo: "-0.02em",
      },
      keyframes: {
        flotar: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "subir-suave": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flotar: "flotar 7s ease-in-out infinite",
        "subir-suave": "subir-suave 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
