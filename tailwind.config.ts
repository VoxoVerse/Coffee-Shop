import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: [
          "var(--font-syne)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        arabic: ["var(--font-ibm-arabic)", "Tahoma", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "#FFFFFF",
          panel: "#F7F7F7",
          teal: "#1A1A1A",
          mint: "#1A1A1A",
          gold: "#888888",
          dark: "#0A0A0A",
          "dark-card": "#141414",
          "dark-border": "#222222",
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;