import type { Config } from "tailwindcss"

const config = {
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F5F1E8",
          deep: "#EDE7DA",
          card: "#FBF9F4",
        },
        ink: {
          DEFAULT: "#15140F",
          soft: "#3A3830",
          muted: "#6E6A5E",
          faint: "#A39E90",
        },
        rule: "#DCD5C5",
        signal: {
          DEFAULT: "#E5582B",
          deep: "#B8401A",
          soft: "#F6D9CB",
        },
        moss: "#2F4A3A",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 8.2vw, 7.75rem)", { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.6rem, 5.6vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 3.8vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        page: "86rem",
        prose: "40rem",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "rise": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 48s linear infinite",
        rise: "rise 0.9s cubic-bezier(0.2, 0.7, 0.1, 1) both",
        blink: "blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
