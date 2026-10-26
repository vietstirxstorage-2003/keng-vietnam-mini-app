module.exports = {
  darkMode: ["selector", '[zaui-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        keng: {
          main: "#d30013",
          dark: "#060403",
          primary: "#d30013",
          hover: "#af0514",
          surface: "#faf2f1",
          soft: "#fff0f1",
          border: "#ffdde0",
          gray: "#ececec",
          darktext: "#212529",
          muted: "#6c757d",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
};
