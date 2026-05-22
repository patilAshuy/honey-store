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
        primary: {
          50: "#fcfbf9",
          100: "#f1ede2",
          200: "#e3dbc5",
          300: "#d5c9a8",
          400: "#c7b78b",
          500: "#1a5f3a", // Forest Green
          600: "#154d2f",
          700: "#103b24",
          800: "#0b2919",
          900: "#06170e",
          950: "#030b07",
        },
        honey: {
          light: "#FFF8E1",
          gold: "#e2951b", // Honey Amber
          dark: "#b37613",
          rich: "#8a580a",
        },
        brand: {
          green: "#1a5f3a",
          amber: "#e2951b",
          beige: "#fcfbf9",
          rust: "#a63a1e",
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
