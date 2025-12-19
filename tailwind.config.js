/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "fg-brand-primary": "var(--fg-brand-primary, #fff)",
        "text-secondary": "var(--text-secondary, rgba(255, 255, 255, 0.7))",
        "bg-tertiary": "var(--bg-tertiary, rgba(255, 255, 255, 0.1))",
      },
      stroke: {
        "fg-brand-primary": "var(--fg-brand-primary, #fff)",
      },
      textColor: {
        secondary: "var(--text-secondary, rgba(255, 255, 255, 0.7))",
      },
    },
  },
  plugins: [],
};
