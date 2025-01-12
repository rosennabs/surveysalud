import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#f0fdfa',
        'light-grey': '#D5D5D5',
        'light-teal': '#E1FEFB'
      },
      gradientColorStops: {
        'primary-start': '#14b8a6',
        'primary-end': '#134e4a',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
