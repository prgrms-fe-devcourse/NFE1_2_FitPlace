"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Health_post_1 = require("../components/Health_post");
var Button_1 = require("../components/Button");
var SearchPost = function (props) {
    var exerciseList = ["전체", "축구", "야구", "러닝", "자전거"];
    var _a = react_1.useState("전체"), activeButton = _a[0], setActiveButton = _a[1];
    var postList = props.postList;
    var handleButtonClick = function (item) {
        setActiveButton(item);
    };
    console.log("여긴어디:", postList.meetingCapacity);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "mb-10" }, exerciseList.map(function (item, index) { return (react_1["default"].createElement(Button_1["default"], { key: index, label: item, color: item === activeButton ? "green" : "grey", size: "mid", margin: "btnMr", onClick: function () { return handleButtonClick(item); } })); })),
        react_1["default"].createElement("section", null,
            react_1["default"].createElement("p", { className: "font-bold text-xl mb-3" }, "\uC778\uAE30 \uBAA8\uC784"),
            react_1["default"].createElement("div", { className: "h-1/2" }, postList.map(function (value, index) {
                var _a;
                return (react_1["default"].createElement(Health_post_1["default"], { title: value.title, channel_name: (_a = value.channel) === null || _a === void 0 ? void 0 : _a.name, id: value._id, key: index }));
            })))));
};
exports["default"] = SearchPost;
