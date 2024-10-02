"use strict";
exports.__esModule = true;
var Button_1 = require("../../components/Button");
var ProfileImg = function () {
    return (React.createElement("form", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uD504\uB85C\uD544 \uC0AC\uC9C4\uC744 \uB4F1\uB85D\uD574\uC8FC\uC138\uC694."),
            React.createElement("p", { className: "font-normal text-sm mt-2" }, "\uCD5C\uB300 2\uC7A5\uAE4C\uC9C0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC5B4\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6" },
            React.createElement("ul", { className: "flex justify-start items-start flex-wrap gap-4" },
                React.createElement("li", { className: "w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uC608\uC2DC\uC774\uBBF8\uC9C0", className: "w-full h-full object-cover absolute" }),
                    React.createElement("p", { className: "absolute top-0 right-0 cursor-pointer" }, "\u274C")),
                React.createElement("li", { className: "w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uC608\uC2DC\uC774\uBBF8\uC9C0", className: "w-full h-full object-cover absolute" }),
                    React.createElement("p", { className: "absolute top-0 right-0 cursor-pointer" }, "\u274C")),
                React.createElement("li", { className: "bg-gray-100 hover:bg-gray-200 w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("label", { htmlFor: "imgUploadInput", className: "w-full h-full absolute flex justify-center items-center cursor-pointer" },
                        React.createElement("p", { className: "text-greenColor font-bold text-xl" }, "+ \uC0AC\uC9C4 \uC5C5\uB85C\uB4DC")),
                    React.createElement("input", { type: "file", name: "", id: "imgUploadInput", className: "hidden", accept: "image/jpeg, image/png, image/webp" })))),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green" }))));
};
exports["default"] = ProfileImg;
