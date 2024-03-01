import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#000624",
        lighter: "#0C1439",
        "blue-accent": "#4361EE",
        "main-text": "#E5E5F1",
        "secondary-text": "#8189B0",
        "status-green": "#57C56F",
        "status-yellow": "#D9AD0F",
        "status-red": "#E65062",
        "status-grey": "#AEB2C9",
      },
    },
  },
  plugins: [],
};
export default config;
