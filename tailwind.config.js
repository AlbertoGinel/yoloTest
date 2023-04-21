/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.html',
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'dominant':'#38007c',
      'secondary':'#9e88b2',
      'clear': '#fef6ff ',
      'accent': '#e8d5b5 ',
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia',],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}