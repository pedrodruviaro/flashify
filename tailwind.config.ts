/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "app.vue",
    "modules/**/*.vue",
    "components/**/*.vue",
    "assets/presets/lara/**/*.{js,vue,ts}",
  ],
  plugins: [
    // require('tailwindcss-animate')
  ],
}
