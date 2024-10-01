"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Mainpage_1 = require("./pages/Mainpage");
var Ranking_page_1 = require("./pages/Ranking_page");
var LocationSetting_1 = require("./pages/LocationSetting");
var ProfileTemplate_1 = require("./pages/profile/ProfileTemplate");
var ProfileEdit_1 = require("./pages/profile/ProfileEdit");
var ProfileDesc_1 = require("./pages/profile/ProfileDesc");
var ProfileLocation_1 = require("./pages/profile/ProfileLocation");
var SearchPage_1 = require("./pages/SearchPage");
var Login_1 = require("./pages/register/Login");
var Register_1 = require("./pages/register/Register");
var NotionAdd_1 = require("./pages/NotionAdd");
var NotificationPage_1 = require("./pages/NotificationPage");
var NotionPage_1 = require("./pages/NotionPage");
var ProfileNickname_1 = require("./pages/profile/ProfileNickname");
var ProfileImg_1 = require("./pages/profile/ProfileImg");
var CommentPage_1 = require("./pages/CommentPage");
var react_cookie_1 = require("react-cookie");
var store_1 = require("./data/store");
var react_redux_1 = require("react-redux");
var App = function () {
    var dispatch = react_redux_1.useDispatch();
    var cookie = new react_cookie_1.Cookies();
    react_1.useEffect(function () {
        var token = cookie.get("token");
        if (token) {
            dispatch(store_1.initializeToken(token));
            dispatch(store_1.isLogin(true));
        }
    }, []);
    return (react_1["default"].createElement("div", { className: "flex flex-col justify-center items-center min-h-screen bg-white" },
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Mainpage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", element: react_1["default"].createElement(Register_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile", element: react_1["default"].createElement(ProfileTemplate_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/edit", element: react_1["default"].createElement(ProfileEdit_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/edit/nickname", element: react_1["default"].createElement(ProfileNickname_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/edit/img", element: react_1["default"].createElement(ProfileImg_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/edit/desc", element: react_1["default"].createElement(ProfileDesc_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/profile/edit/location", element: react_1["default"].createElement(ProfileLocation_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/ranking", element: react_1["default"].createElement(Ranking_page_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/map", element: react_1["default"].createElement(LocationSetting_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/search", element: react_1["default"].createElement(SearchPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/notifications", element: react_1["default"].createElement(NotificationPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/notionAdd", element: react_1["default"].createElement(NotionAdd_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/notion/:id", element: react_1["default"].createElement(NotionPage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/notion/:id/comments", element: react_1["default"].createElement(CommentPage_1["default"], null) }))));
};
exports["default"] = App;
