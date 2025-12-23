/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: 0, transform: "scale(0.8)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out",
        "slide-left": "slideLeft 0.7s ease-out",
        "slide-right": "slideRight 0.7s ease-out",
        "zoom-in": "zoomIn 0.7s ease-out",
      },
    },
    theme: {
      extend: {
        keyframes: {
          shake: {
            "0%, 100%": { transform: "translateX(0)" },
            "20%": { transform: "translateX(-4px)" },
            "40%": { transform: "translateX(4px)" },
            "60%": { transform: "translateX(-4px)" },
            "80%": { transform: "translateX(4px)" },
          },
        },
        animation: {
          shake: "shake 0.3s ease-in-out",
        },
      },
    },
  },
  plugins: [],
};
