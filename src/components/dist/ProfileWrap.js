"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProfileWrap = function (props) {
    var _a = react_1.useState(props.postData), posts = _a[0], setPosts = _a[1];
    var render = function () {
        if (typeof props.description === 'string') {
            return (React.createElement("p", { className: "font-medium text-base mt-4" }, props.description));
        }
    };
    return (React.createElement("div", { className: "py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
        React.createElement("p", { className: "font-bold text-base" }, props.category),
        React.createElement(React.Fragment, null, render())));
};
exports["default"] = ProfileWrap;
