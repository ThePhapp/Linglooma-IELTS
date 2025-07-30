module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2463eb",
          background: "#e5fdff",
          foreground: "#000000",
        },
        secondary: {
          background: "#ffffff",
          foreground: "#333333",
        },
        accent: {
          DEFAULT: "#b7d8ec",
          foreground: "#ffffff",
        },
        border: {
          primary: "#b3b3b3",
          secondary: "#f2010126",
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inria: ['Inria Sans', 'sans-serif'],
      },
      boxShadow: {
        custom: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        custom: '30px',
      },
    },
  },
  plugins: [],
};