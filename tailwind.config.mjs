import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Atkinson", ...defaultTheme.fontFamily.sans],
        "mono": ["\"JetBrains Mono\"", ...defaultTheme.fontFamily.mono],
      },
      // Re-tint the theme's black/white so every existing text-black /
      // bg-white / border-black/10 utility (and their dark: pairs) resolves
      // to the slate-alpine palette instead of true black/white.
      colors: {
        black: "#0b0f13",
        white: "#eef3f4",
        ice: {
          50: "#eefaff",
          100: "#d7f0fb",
          200: "#b1e0f2",
          300: "#82c8e0",
          400: "#5aabca",
          500: "#3e8ead",
          600: "#347591",
          700: "#2d5d73",
          800: "#274a5c",
          900: "#193040",
        },
        moss: {
          50: "#f2f6ee",
          100: "#e1ead7",
          200: "#c3d5b1",
          300: "#a1bd88",
          400: "#83a468",
          500: "#688750",
          600: "#526a40",
          700: "#425434",
          800: "#35422a",
          900: "#232c1c",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
      rotate: {
        "45": "45deg",
        "135": "135deg",
        "225": "225deg",
        "315": "315deg",
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        rise: "rise 1.2s ease-out forwards",
        pulseBar: "pulseBar 1.6s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        fly: "fly linear infinite",
        shoot: "shoot linear infinite",
        liftChair: "liftChair linear infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        rise: {
          "0%": { transform: "translateY(16px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        pulseBar: {
          "0%, 100%": { transform: "scaleY(0.35)" },
          "50%": { transform: "scaleY(1)" },
        },
        twinkle: {
          "0%, 100%": { opacity: 0.15 },
          "50%": { opacity: 1 },
        },
        fly: {
          "0%": { transform: "translateX(-10vw)", opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 1 },
          "100%": { transform: "translateX(110vw)", opacity: 0 },
        },
        shoot: {
          "0%, 75%": { transform: "translate(0, 0) rotate(135deg)", opacity: 0 },
          "77%": { opacity: 1 },
          "88%": { transform: "translate(-140px, 140px) rotate(135deg)", opacity: 1 },
          "100%": { transform: "translate(-190px, 190px) rotate(135deg)", opacity: 0 },
        },
        liftChair: {
          "0%": { transform: "translate(0px, 0px)", opacity: 0 },
          "5%": { opacity: 1 },
          "95%": { opacity: 1 },
          "100%": { transform: "translate(140px, -50px)", opacity: 0 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
