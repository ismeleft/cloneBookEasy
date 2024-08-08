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
        primary: "rgb(53, 164, 127)",
        secondary: "rgb(255, 193, 7)",
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
