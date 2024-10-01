"use strict";
exports.__esModule = true;
var ProfileWrap = function (props) {
    return (React.createElement("div", { className: "py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
        React.createElement("p", { className: "font-bold text-base" }, props.category),
        typeof props.description === 'string'
            ? React.createElement("p", { className: "font-medium text-base mt-4" }, props.description)
            : null));
};
exports["default"] = ProfileWrap;
