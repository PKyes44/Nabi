import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: /\-translate\-x\-\[d+px\]/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        paperlogy: ["var(--font-paperlogy)"],
      },
      animation: {
        titleShow: "titleShow 2s forwards",
        titleHidden: "titleHidden 2s forwards",
        leftHandShow: "leftHandShow 2s forwards",
        leftHandHidden: "leftHandHidden 2s forwards",
        rightHandShow: "rightHandShow 2s forwards",
        rightHandHidden: "rightHandHidden 2s forwards",
      },
      keyframes: {
        titleShow: {
          "0%": { opacity: "0", transform: "translateY(50)" },
          "100%": { opacity: "1" },
        },
        titleHidden: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(50)" },
        },

        leftHandShow: {
          "0%": { opacity: "0", transform: "translateY(50) translateX(-50)" },
          "100%": { opacity: "1" },
        },
        leftHandHidden: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(50) translateX(-50)" },
        },

        rightHandShow: {
          "0%": { opacity: "0", transform: "translateY(-20) translateX(50)" },
          "100%": { opacity: "1" },
        },
        rightHandHidden: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-20) translateX(50)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
