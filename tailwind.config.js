/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // #### Backgrounds
        //  (main background)
        'Verydarkdesaturatedblue1': 'hsl(222, 26%, 31%)',
        // (toggle background, keypad background)
        'Verydarkdesaturatedblue2': 'hsl(223, 31%, 20%)',
        //  (screen background)
        'Verydarkdesaturatedblue3': 'hsl(224, 36%, 15%)',
        // #### Keys
        //  (key background)
        'Desaturateddarkblue1': 'hsl(225, 21%, 49%)',
        //  (key shadow)
        'Desaturateddarkblue2': 'hsl(224, 28%, 35%)',
        //  (key background, toggle)
        'Red': 'hsl(6, 63%, 50%)',
        //  (key shadow)
        'Darkred': 'hsl(6, 70%, 34%)',
        //  (key background)
        'Lightgrayishorange': 'hsl(30, 25%, 89%)',
        //  (key shadow)
        'Grayishorange': 'hsl(28, 16%, 65%)',
        // #### Text

        'Verydarkgrayishblue': 'hsl(221, 14%, 31%)',
        'White': 'hsl(0, 0%, 100%)'

      }
    },
  },
  plugins: [],
}