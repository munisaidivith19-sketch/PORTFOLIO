/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050816",
        primary: "#2563EB",
        secondary: "#06B6D4",
        accent: "#00F5FF",
        success: "#22C55E",
        glass: "rgba(255,255,255,0.08)",
        "glass-border": "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.5, filter: "blur(40px)" },
          "50%": { opacity: 0.9, filter: "blur(60px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(37,99,235,0.35)",
        "glow-cyan": "0 0 40px rgba(0,245,255,0.25)",
      },
    },
  },
  plugins: [],
};
