"use strict";
exports.__esModule = true;
var react_1 = require("react");
var icon_user_profile_svg_1 = require("../assets/icon_user_profile.svg");
var CurrentMemberItem = function (_a) {
    var userName = _a.userName;
    return (react_1["default"].createElement("div", { className: "flex flex-col text-center gap-1.5" },
        react_1["default"].createElement("img", { src: icon_user_profile_svg_1["default"], alt: "\uD504\uB85C\uD544\uC774\uBBF8\uC9C0" }),
        react_1["default"].createElement("p", null, userName)));
};
exports["default"] = CurrentMemberItem;
