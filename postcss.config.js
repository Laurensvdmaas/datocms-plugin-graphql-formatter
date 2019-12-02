module.exports = {
  plugins: [
    require("tailwindcss")("tailwind.js"),
    require("autoprefixer")(),
    //Only add purgecss in production
    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./src/**/*.html", "./src/**/*.vue"]
        })
      : ""
  ]
};
