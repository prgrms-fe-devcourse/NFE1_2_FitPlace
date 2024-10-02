"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("./Button");
var NotionCategory = function (_a) {
    var onSelect = _a.onSelect;
    var exerciseList = [
        "자전거",
        "야구",
        "축구",
        "테니스",
        "농구",
        "직접 입력",
    ];
    var _b = react_1.useState(""), activeButton = _b[0], setActiveButton = _b[1];
    var handleButtonClick = function (item) {
        setActiveButton(item);
        onSelect(item);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "mb-10" }, exerciseList.map(function (item, index) { return (react_1["default"].createElement(Button_1["default"], { key: index, label: item, color: item === activeButton ? "green" : "grey", size: "mid", margin: "btnMr", onClick: function () { return handleButtonClick(item); } })); }))));
};
exports["default"] = NotionCategory;
