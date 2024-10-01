"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/** @type {import('tailwindcss').Config} */
var _default = {
  //index.html을 포함한 src경로 내부에 자바스크립트,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"]
      },
      width: {
        140: "640px"
      },
      fontSize: {
        heading: "2.375em"
      },
      colors: {
        primary: {
          DEFAULT: "#2bca43"
        },
        greenColor: "#AFE327",
        placeholder: "#656565",
        locationColor: "#c2c2c2",
        profileBorder: "#e8e8e8"
      },
      lineHeight: {
        button: "1.11111em",
        input: "1.44444em"
      },
      padding: {
        "100P": "100%"
      },
      height: {
        150: "30%"
      }
    }
  },
  plugins: []
};
exports["default"] = _default;