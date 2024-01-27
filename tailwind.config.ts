import type { Config } from "tailwindcss";
import { uiPresets } from "./ui.preset"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [uiPresets],
};

export default config;
