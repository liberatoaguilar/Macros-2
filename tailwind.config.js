module.exports = {
  darkMode: 'class',
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          'foreground': '#ffffff'
        }
      }
    }
  },
  plugins: []
}
