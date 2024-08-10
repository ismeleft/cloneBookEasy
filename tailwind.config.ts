import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        blue: {
          100: "#EBF8FF",
          200: "#BEE3F8",
          300: "#90CDF4",
          400: "#63B3ED",
          500: "#0F4C83",
          600: "#3182CE",
          700: "#2B6CB0",
          800: "#2C5282",
          900: "#2A4365",
        },
        primary: "#0F4C83", // 或者你可以直接引用 blue-500
      },
      fontSize: {
        h1: "36px",
        h1_lg: "42px",
        h2: "30px",
        h2_lg: "34px",
        h3: "24px",
        h3_lg: "28px",
        p: "16px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
};
export default config;
