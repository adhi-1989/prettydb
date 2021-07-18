import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "475px",
        portrait: { raw: '(orientation: portrait)' },
        landscape: { raw: '(orientation: landscape)' },
      },
    },
  },
});
