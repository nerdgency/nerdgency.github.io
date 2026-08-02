/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './docs/**/*.{md,mdx}',
    './src/theme/**/*.{js,jsx,ts,tsx}',
    './node_modules/cosmos-docusaurus-theme/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#faaf40',
        },
      },
    },
  },
  corePlugins: {
    // Disable preflight to reduce conflicts with Docusaurus/Infima base styles
    preflight: false,
  },
  plugins: [],
};
