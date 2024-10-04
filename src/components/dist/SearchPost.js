"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var SearchPost = function (props) {
    var _a = react_1.useState("전체"), activeButton = _a[0], setActiveButton = _a[1];
    var postList = props.postList;
    var handleButtonClick = function (item) {
        setActiveButton(item);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("section", null,
            react_1["default"].createElement("p", { className: "font-bold text-xl mb-3 mt-10" }, "\uD3EC\uC2A4\uD2B8 \uAC80\uC0C9 \uACB0\uACFC"),
            react_1["default"].createElement("div", { className: "h-1/2" }, postList.map(function (value, index) { return (react_1["default"].createElement(react_router_dom_1.Link, { to: "/notion/" + value._id },
                react_1["default"].createElement("button", { key: index, className: "bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:shadow-xl" },
                    react_1["default"].createElement("p", { className: "font-bold text-lg mb-3" }, value.title || "제목 없음"),
                    react_1["default"].createElement("div", { className: "mb-2 text-sm flex" },
                        value.currentMember === value.meetingCapacity ? (react_1["default"].createElement("p", { className: "text-rose-600\t font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("p", { className: "text-lime-400 font-bold" }, "\uBAA8\uC9D1 \uC911")),
                        react_1["default"].createElement("span", { className: "mx-3 opacity-5" }, "|"),
                        value.meetingTime || "기간 없음"),
                    react_1["default"].createElement("div", { className: "text-sm flex" },
                        value.meetingSpot.split(",")[0] || "장소 없음",
                        " ",
                        react_1["default"].createElement("span", { className: "mx-3 opacity-5" }, "|"),
                        value.currentMember || 0,
                        "\uBA85 / ",
                        value.meetingCapacity || 0,
                        "\uBA85")))); })))));
};
exports["default"] = SearchPost;
