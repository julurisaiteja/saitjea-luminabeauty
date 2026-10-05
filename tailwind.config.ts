import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#f7f2f8",
          fg: "#2a2430",
          muted: "#9a7090",
          primary: "#c4a0e8",
          accent: "#e8a0c0",
          surface: "rgba(255,255,255,0.55)",
          border: "rgba(255,255,255,0.65)",
          hero: "#2a2430",
          glow: "#f0d4a8",
        },
      },
      fontFamily: {
        display: ["Bodoni Moda", "Times New Roman", "serif"],
        body: ["Manrope", "system-ui", "sans-serif"],
      },
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        shimmer: { "0%": { backgroundPosition: "200% center" }, "100%": { backgroundPosition: "-200% center" } },
      },
      animation: {
        rise: "rise 0.8s ease both",
        "rise-delay": "rise 0.9s ease 0.12s both",
        "rise-late": "rise 1s ease 0.22s both",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
