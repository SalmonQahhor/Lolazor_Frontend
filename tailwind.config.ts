import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <- Shu qator orqali rejimlar almashadi
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        card: "var(--card)",
        border: "var(--border)",
        lolazor: {
          DEFAULT: "#0D2261",
          sky: "#38BDF8",
        },
        gold: "#F59E0B",
        text: {
          main: "var(--text-main)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(56,189,248,0.4), 0 0 24px -4px rgba(56,189,248,0.35)",
      },
      backgroundImage: {
        "lolazor-radial": "var(--bg-radial)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;