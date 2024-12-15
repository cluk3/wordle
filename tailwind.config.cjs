/**@type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      fontFamily: {
        sans: [
          "Nunito",
          "ui-sans-serif",
          "system-ui",
          "Helvetica Neue",
          "Arial Nova",
          "Nimbus Sans",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        "cloud-burst": {
          50: "#f0f7fe",
          100: "#deedfb",
          200: "#c5e1f8",
          300: "#9dcff3",
          400: "#6eb3ec",
          500: "#4c96e5",
          600: "#377bd9",
          700: "#2e66c7",
          800: "#2b53a2",
          900: "#284880",
          950: "#1f3155",
        },
        picasso: {
          50: "#fefce8",
          100: "#fffac2",
          200: "#fff390",
          300: "#ffe345",
          400: "#fcd013",
          500: "#ecb706",
          600: "#cc8e02",
          700: "#a26406",
          800: "#864f0d",
          900: "#724011",
          950: "#432105",
        },
        "bright-turquoise": {
          50: "#effefc",
          100: "#c8fff7",
          200: "#91fef1",
          300: "#52f6e9",
          400: "#1ee3d8",
          500: "#06ddd5",
          600: "#01a09e",
          700: "#067f7f",
          800: "#0a6465",
          900: "#0e5253",
          950: "#003033",
        },
        "persian-rose": {
          50: "#fef1f9",
          100: "#fee5f5",
          200: "#fecceb",
          300: "#ffa2db",
          400: "#fe68bf",
          500: "#f82e9e",
          600: "#e91982",
          700: "#cb0b67",
          800: "#a70d54",
          900: "#8b1048",
          950: "#560128",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "content-show": {
          from: { opacity: 0, transform: "scale(0.96)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        "content-hide": {
          from: { opacity: 1, transform: "scale(1)" },
          to: { opacity: 0, transform: "scale(0.96)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "content-show": "content-show 0.2s ease-out",
        "content-hide": "content-hide 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
