import { defineConfig } from "windicss/helpers";

export default defineConfig({
  extract: {
    include: ["src/**/*.{js,jsx,ts,tsx,vue}"],
  },
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: { min: "320px", max: "419px" },
        sm: "420px",
        md: "768px",
        lg: "1024px",
        xl: "1366px",
        "2xl": "3840px",
        portrait: { raw: '(orientation: portrait)' },
        landscape: { raw: '(orientation: landscape)' },
      },
    },
  },
});
