import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#3B82F6", // Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#8B5CF6", // Purple
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#ff3e3f", // Cool red
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280", // Cool Gray
          foreground: "#F3F4F6",
        },
        card: {
          DEFAULT: "#1F2937", // Dark Blue Gray
          foreground: "#F9FAFB",
        },
        border: "#374151",
        input: "#4B5563",
        ring: "#60A5FA",
      },
    },
  },
  plugins: [],
};

export default config;