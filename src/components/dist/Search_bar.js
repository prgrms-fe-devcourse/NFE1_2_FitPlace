"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom"); // useLocation 훅을 가져옵니다.
var Search_svg_1 = require("../assets/Search.svg");
var Search_bar = function (_a) {
    var _b = _a.value, value = _b === void 0 ? "" : _b, getValue = _a.getValue, handleKeydown = _a.handleKeydown;
    var location = react_router_dom_1.useLocation(); // 현재 경로를 가져옵니다.
    var pushValue = function (e) {
        getValue(e.target.value);
    };
    return (react_1["default"].createElement("div", { className: "relative w-full" },
        react_1["default"].createElement("img", { src: Search_svg_1["default"], alt: "search-icon", className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-75" }),
        react_1["default"].createElement("input", { className: "bg-gray-100 h-8 w-full rounded-md shadow-lg p-5 pl-10", value: value, type: "text", onChange: pushValue, onKeyDown: handleKeydown, id: "invalue", autoFocus: location.pathname === "/search" })));
};
exports["default"] = Search_bar;
