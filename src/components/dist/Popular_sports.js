"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Popular_sports = function (_a) {
    var name = _a.name, description = _a.description, postLength = _a.postLength;
    return (react_1["default"].createElement("button", { className: "bg-gray-100 p-5 w-48 h-32 rounded-md shadow-lg m-2 text-left text-xl font-bold transition-transform duration-300 ease-in-out hover:bg-gray-200  hover:shadow-xl" },
        name,
        " \uBAA8\uC784 ",
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("span", { className: "text-sm font-thin" },
            "\uAC8C\uC2DC\uAE00 ",
            postLength,
            "\uAC1C")));
};
exports["default"] = Popular_sports;
