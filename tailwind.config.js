/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#F59E0B",
        "primary-dark": "#D97706",
        background: "#121212",
        surface: "#1E1E1E",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        border: "#333333",
        // Light mode equivalents: warm subtle tones, calm on eyes, brutalist hairline border
        "light-bg": "#F3F4F6",
        "light-surface": "#FAFAFA",
        "light-text-primary": "#1F2937",
        "light-text-secondary": "#4B5563",
        "light-border": "#D1D5DB",
      },
      fontFamily: {
        heading: ["'Archivo Black'", "'Impact'", "sans-serif"],
        body: ["Inter", "Roboto", "sans-serif"],
      },
      animation: {
        'marquee-left': 'marqueeLeft 25s linear infinite',
        'marquee-right': 'marqueeRight 25s linear infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
