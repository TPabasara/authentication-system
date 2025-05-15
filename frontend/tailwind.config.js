// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js projects
    "./components/**/*.{js,ts,jsx,tsx}", // If you have components
    // Add more paths if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"], //this will add coustom inter format or if it anable sans-serif format
      },
    },
  },
  plugins: [],
};
