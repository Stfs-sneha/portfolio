import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090B",
        // Theme colours are CSS variables (space-separated RGB) so the
        // terminal `theme` command can re-skin the whole site at runtime.
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backdropBlur: { xs: "2px", "3xl": "64px" },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(5%,-7%,0) scale(1.1)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1.05)" },
          "50%": { transform: "translate3d(-6%,6%,0) scale(0.95)" },
        },
        spin360: { to: { transform: "rotate(360deg)" } },
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(2.8)", opacity: "0" },
        },
        blink: { "50%": { opacity: "0" } },
        scrollcue: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "float-reverse 26s ease-in-out infinite",
        "spin-slow": "spin360 40s linear infinite",
        "spin-slower": "spin360 70s linear infinite reverse",
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.22,1,0.36,1) infinite",
        blink: "blink 1s steps(1) infinite",
        scrollcue: "scrollcue 2.2s cubic-bezier(0.65,0,0.35,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
