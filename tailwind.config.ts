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
          DEFAULT: "#10B981", // Emerald
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