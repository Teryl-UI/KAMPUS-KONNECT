import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Kampus Konnect Design Tokens
        brand: {
          red: "var(--color-red)",
          green: "var(--color-green)",
          purple: "var(--color-purple)",
          yellow: "var(--color-yellow)",
          orange: "var(--color-orange)",
        },
        neutral: {
          ink: "var(--color-ink)",
          "warm-white": "var(--color-warm-white)",
          white: "var(--color-white)",
          lavender: "var(--color-lavender)",
          "soft-green": "var(--color-soft-green)",
        },
        semantic: {
          success: "var(--color-success)",
          error: "var(--color-error)",
          warning: "var(--color-warning)",
          info: "var(--color-info)",
        },
      },
      fontFamily: {
        display: ["var(--font-bowlby)", "Impact", "sans-serif"],
        heading: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        meta: ["var(--font-space-grotesk)", "monospace", "sans-serif"],
      },
      boxShadow: {
        sticker: "3px 3px 0px #19151D",
        "sticker-sm": "2px 2px 0px #19151D",
        "sticker-lg": "5px 5px 0px #19151D",
        "sticker-xl": "7px 7px 0px #19151D",
        "sticker-purple": "4px 4px 0px #57248C",
        "sticker-yellow": "4px 4px 0px #FFC928",
        "sticker-red": "4px 4px 0px #F32B35",
        "sticker-green": "4px 4px 0px #08B957",
        "sticker-orange": "4px 4px 0px #FF941F",
      },
      borderRadius: {
        small: "8px",
        ui: "12px",
        card: "20px",
        section: "28px",
        panel: "32px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wiggle-slow": {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "wiggle-slow": "wiggle-slow 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
