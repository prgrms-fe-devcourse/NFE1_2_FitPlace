"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var RegisterInput_1 = require("../../components/RegisterInput");
var react_router_dom_1 = require("react-router-dom");
var Button_1 = require("../../components/Button");
var axios_1 = require("axios");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var store_1 = require("../../data/store");
var react_cookie_1 = require("react-cookie");
var Login = function () {
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), loginError = _c[0], setLoginError = _c[1];
    var navigate = react_router_dom_1.useNavigate();
    var dispatch = react_redux_1.useDispatch();
    var cookies = new react_cookie_1.Cookies();
    var setCookie = function (name, value, opt) {
        return cookies.set(name, value, __assign({}, opt));
    };
    var handleLogin = function () {
        axios_1["default"].post('https://kdt.frontend.5th.programmers.co.kr:5009/login', {
            email: email,
            password: password
        })
            .then(function (res) {
            if (res.status === 200) {
                var token = res.data.token;
                setCookie("token", "bearer " + token, {
                    path: '/',
                    sameSite: "strict",
                    secure: true
                });
                setLoginError(false);
                dispatch(store_1.initializeUser(res.data.user));
                // 임시로 profile페이지로 감 추후 메인으로 바꿔야함
                // navigate('/')
                navigate('/profile');
            }
        })["catch"](function (err) { return err.status === 400 ? setLoginError(true) : null; });
    };
    return (React.createElement("div", { className: "flex flex-col justify-center items-stratch w-140 h-full px-5 bg-white" },
        React.createElement("h2", { className: "text-heading mb-36 font-black text-center" }, "FitPlace"),
        React.createElement(RegisterInput_1["default"], { type: "text", placeholder: "\uC774\uBA54\uC77C", margin: "mb-4", value: email, onChange: function (e) { return setEmail(e.target.value); } }),
        React.createElement(RegisterInput_1["default"], { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", margin: "mb-4", value: password, onChange: function (e) { return setPassword(e.target.value); } }),
        React.createElement(Button_1["default"], { label: "\uB85C\uADF8\uC778", size: "full", color: "green", onClick: handleLogin }),
        React.createElement(react_router_dom_1.Link, { to: "/register", className: "text-placeholder mt-6 text-center" }, "\uD68C\uC6D0\uAC00\uC785"),
        React.createElement("p", { className: "text-center text-red-600 font-bold mt-6" }, loginError ? "아이디 혹은 비밀번호를 확인해주세요" : null)));
};
exports["default"] = Login;
