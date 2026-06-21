/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        electric: "#00D4FF",
        neon: "#7C3AED",
        plasma: "#FF3DF2",
        mint: "#7CFFCB"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 28px rgba(0, 212, 255, 0.34)",
        purple: "0 0 36px rgba(124, 58, 237, 0.34)"
      },
      backgroundImage: {
        "holo-line":
          "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.65), rgba(124, 58, 237, 0.65), transparent)"
      }
    }
  },
  plugins: []
};
