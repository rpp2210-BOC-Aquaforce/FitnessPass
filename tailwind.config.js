/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solid-orange': '#FF9F1C',
        'mint-orange': '#FFBF69',
        'mint-seafoam': '#CBF3F0',
        seafoam: '#2EC4B6',
        orange: 'rgb(255, 159, 28)',
        orangeLight: 'rgb(255, 191, 105)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, #CBF3F0, #2EC4B6, #FFFFFF)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, #CBF3F0, #2EC4B6, #FFFFFF)',
      },
    },
  },
  plugins: [],
};
