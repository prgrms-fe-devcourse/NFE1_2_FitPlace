"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Button = function (_a) {
    var label = _a.label, _b = _a.size, size = _b === void 0 ? "full" : _b, _c = _a.color, color = _c === void 0 ? "green" : _c, _d = _a.margin, margin = _d === void 0 ? "" : _d, onClick = _a.onClick;
    // 크기와 색상에 따라 Tailwind CSS 클래스를 설정합니다.
    var sizeClasses = {
        small: "inline-block px-2 py-1 text-sm flex items-center justify-center min-w-14",
        mid: "inline-block px-4 py-2 text-sm",
        full: "flex items-center justify-center w-full px-4 py-2 text-sm"
    };
    var colorClasses = {
        green: "bg-[#AFE327] text-[#333] hover:bg-[#C4F545]",
        line: "border-2 border-[#AFE327] text-[#555] hover:bg-[#AFE327] hover:text-[#555]",
        grey: "bg-[#E7E7E7] text-[#555] cursor-not-allowed opacity-50"
    };
    var marginClasses = {
        btnMr: "mr-2",
        btnMl: "ml-2",
        "": ""
    };
    // grey 색상일 때 비활성화 상태를 설정
    var isDisabled = color === "grey";
    return (react_1["default"].createElement("div", { className: "rounded " + sizeClasses[size] + " " + colorClasses[color] + " " + marginClasses[margin] + " " + (isDisabled ? "" : "cursor-pointer"), onClick: isDisabled ? undefined : onClick, role: "button", tabIndex: isDisabled ? -1 : 0, "aria-disabled": isDisabled }, label));
};
exports["default"] = Button;
