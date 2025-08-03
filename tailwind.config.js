// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        charcoal: '#1a1a1a',
        slate: '#2e2e2e',
        graphite: '#555555',
        ash: '#aaaaaa',
        smoke: '#dddddd',
        pearl: '#f5f5f5',
        white: '#ffffff',

        // Optional accent colors
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
      }
    },
  },
  plugins: [],
}
