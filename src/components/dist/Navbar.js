"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Home_svg_1 = require("../assets/navbar/Home.svg");
var Search_svg_1 = require("../assets/navbar/Search.svg");
var newPost_svg_1 = require("../assets/navbar/newPost.svg");
var My_svg_1 = require("../assets/navbar/My.svg");
var Ranking_svg_1 = require("../assets/navbar/Ranking.svg");
var react_router_dom_1 = require("react-router-dom");
var Navbar = function () {
    var _a = react_1.useState(false), nav_on = _a[0], setNav_on = _a[1];
    var handleMouseEnter = function () {
        setNav_on(true);
    };
    var handleMouseLeave = function () {
        setNav_on(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null, nav_on ? (react_1["default"].createElement("div", { className: "w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-200 border-b-gray-200 drop-shadow-2xl transition-all duration-300 " + (nav_on ? "opacity-100 translate-y-0" : "opacity-100 translate-y-12"), onMouseLeave: handleMouseLeave },
        react_1["default"].createElement("div", { className: "w-full h-[56px] bg-white flex justify-between items-center px-20" },
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/" },
                react_1["default"].createElement("button", { className: "group mt-3" },
                    react_1["default"].createElement("img", { src: Home_svg_1["default"], alt: "Home", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-125" }))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/search" },
                react_1["default"].createElement("button", { className: "group mt-3" },
                    react_1["default"].createElement("img", { src: Search_svg_1["default"], alt: "Search", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-125" }))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/notionAdd" },
                react_1["default"].createElement("button", { className: "group mt-3" },
                    react_1["default"].createElement("img", { src: newPost_svg_1["default"], alt: "NewPost", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-125" }))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/ranking" },
                react_1["default"].createElement("button", { className: "group mt-3" },
                    react_1["default"].createElement("img", { src: Ranking_svg_1["default"], alt: "Ranking", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-125" }))),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/profile" },
                react_1["default"].createElement("button", { className: "group mt-3" },
                    react_1["default"].createElement("img", { src: My_svg_1["default"], alt: "My", className: "w-9 h-9 transition-transform duration-200 group-hover:scale-125" })))))) : (react_1["default"].createElement("div", { className: "w-140 fixed bottom-0 flex flex-col items-center border-2 border-gray-200 border-b-gray-200 drop-shadow-2xl" },
        react_1["default"].createElement("button", { className: "bg-white w-full h-[15px]", onMouseEnter: handleMouseEnter })))));
};
exports["default"] = Navbar;
