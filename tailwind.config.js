/** @type {import('tailwindcss').Config} */
export default {
  //index.html을 포함한 src경로 내부에 자바스크립트,

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        140: "640px",
      },
      fontSize: {
        heading: '2.375em'
      },
      colors: {
        primary: {
          DEFAULT: "#2bca43",
        },
        'greenColor': '#AFE327',
        'placeholder': '#656565',
        // 'containerColor': '#f6f6f6',
        'profileBorder': '#e8e8e8'
      },
      lineHeight: {
        button: '1.11111em',
        input: '1.44444em'
      }
    },
  },
  plugins: [],
};
