/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f8fb",
        surface: "#ffffff",
        ink: "#172033",
        muted: "#64748b",
        line: "#dbe3ef",
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a"
        },
        success: {
          50: "#ecfdf5",
          600: "#0f9f6e",
          700: "#047857"
        },
        warning: {
          50: "#fffbeb",
          600: "#c27803",
          700: "#a16207"
        },
        danger: {
          50: "#fef2f2",
          600: "#dc2626",
          700: "#b91c1c"
        }
      },
      borderRadius: {
        app: "8px"
      },
      boxShadow: {
        panel: "0 16px 45px rgba(15, 23, 42, 0.08)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    },
  },
  plugins: [],
};
