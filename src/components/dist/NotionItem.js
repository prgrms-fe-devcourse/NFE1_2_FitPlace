"use strict";
exports.__esModule = true;
var react_1 = require("react");
var NotionItem = function (_a) {
    var content = _a.content;
    return (react_1["default"].createElement("div", { className: "bg-[#F6F6F6] rounded-[10px] shadow-md p-4 mb-4" },
        react_1["default"].createElement("div", null, content || "내용 없음")));
};
exports["default"] = NotionItem;
