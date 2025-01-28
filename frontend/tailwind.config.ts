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
        'primary-start': '#fbbf24',
        'primary-end': '#92400e',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [
   
  ],
};
export default config;
