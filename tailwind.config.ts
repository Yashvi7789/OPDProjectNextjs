import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    // If you use any other folders (like src/lib, src/hooks), add them too
  ],
  darkMode: "selector",   // ← Change this line (was "class")
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

