"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Search_svg_1 = require("../assets/Search.svg");
var Search_bar = function (_a) {
    var value = _a.value, getValue = _a.getValue;
    function pushValue(e) {
        getValue(e.target.value);
    }
    return (react_1["default"].createElement("div", { className: "relative w-full" },
        react_1["default"].createElement("img", { src: Search_svg_1["default"], alt: "search-icon", className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-75" }),
        react_1["default"].createElement("input", { className: "bg-gray-100 h-8 w-full rounded-md shadow-lg p-5 pl-10", value: value, type: "text", onChange: pushValue, id: "invalue" })));
};
exports["default"] = Search_bar;
