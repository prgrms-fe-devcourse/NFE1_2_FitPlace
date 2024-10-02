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
var react_1 = require("react");
var Button_1 = require("../../components/Button");
var RegisterInput_1 = require("../../components/RegisterInput");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var Register = function () {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(''), userId = _a[0], setUserId = _a[1];
    var _b = react_1.useState(''), userPw = _b[0], setUserPw = _b[1];
    var _c = react_1.useState(''), userPwConfirm = _c[0], setUserPwConfirm = _c[1];
    var _d = react_1.useState(''), userName = _d[0], setUserName = _d[1];
    var _e = react_1.useState(''), userBirth = _e[0], setUserBirth = _e[1];
    var _f = react_1.useState(''), userEmail = _f[0], setUserEmail = _f[1];
    var _g = react_1.useState(0), checkEmail = _g[0], setCheckEmail = _g[1];
    var _h = react_1.useState(false), checkPw = _h[0], setCheckPw = _h[1];
    var _j = react_1.useState(false), checkPwConfirm = _j[0], setCheckPwConfirm = _j[1];
    // 비밀번호 일치 체크
    react_1.useEffect(function () {
        userPw === userPwConfirm ? setCheckPwConfirm(true) : setCheckPwConfirm(false);
    }, [userPwConfirm]);
    // 이메일 검사
    var emailMsg = function () {
        switch (checkEmail) {
            case -1:
                return React.createElement("p", null, "\uC720\uD6A8\uD55C \uC774\uBA54\uC77C \uC8FC\uC18C\uAC00 \uC544\uB2D9\uB2C8\uB2E4");
            case 0:
                return React.createElement("p", null, "\uC0AC\uC6A9\uAC00\uB2A5\uD55C \uC774\uBA54\uC77C \uC8FC\uC18C\uC785\uB2C8\uB2E4");
            case 1:
                return React.createElement("p", null, "\uC774\uBBF8 \uB4F1\uB85D\uB41C \uC774\uBA54\uC77C \uC8FC\uC18C\uC785\uB2C8\uB2E4.");
        }
    };
    // 인풋에서 이메일 유효성 검사
    function regEmail() {
        var reg = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        reg.test(userEmail) ? setCheckEmail(0) : setCheckEmail(-1);
    }
    // 인풋에서 패스워드 검사
    function regPw() {
        var reg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/);
        reg.test(userPw) ? setCheckPw(true) : setCheckPw(false);
    }
    // 회원가입 정보 전송
    var handleRegi = function () {
        var regiObj = {};
        var stringObj = {
            fullName: userName,
            birth: userBirth,
            userId: userId,
            location: '',
            description: '',
            image: ''
        };
        if (checkEmail === 0 && checkPwConfirm === true) {
            regiObj.email = userEmail;
            regiObj.fullName = JSON.stringify(stringObj);
            regiObj.password = userPw;
            axios_1["default"].post('https://kdt.frontend.5th.programmers.co.kr:5009/signup', __assign({}, regiObj))
                .then(function (res) {
                var regiName = JSON.parse(res.data.user.fullName);
                alert(regiName.fullName + "\uB2D8 \uD68C\uC6D0\uAC00\uC785\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
                navigate('/');
            })["catch"](function (err) {
                err.response.data === "The email address is already being used." ?
                    setCheckEmail(1)
                    : null;
            });
        }
    };
    return (React.createElement("div", { className: "flex flex-col justify-center items-stratch w-140 h-full  px-5 bg-white" },
        React.createElement("h2", { className: "text-heading mb-14 font-black text-center" }, "FitPlace"),
        React.createElement(RegisterInput_1["default"], { type: "text", placeholder: "\uC544\uC774\uB514", margin: "mb-3", value: userId, onChange: function (e) { return setUserId(e.target.value); } }),
        React.createElement("p", { className: "\r\n        mb-3\r\n        w-full\r\n        text-left\r\n        text-lg\r\n        text-medium\r\n      " }),
        React.createElement(RegisterInput_1["default"], { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638", margin: "mb-3", value: userPw, onChange: function (e) {
                setUserPw(e.target.value);
                regPw();
            } }),
        React.createElement("p", { className: "\n        mb-3\n        w-full\n        text-left\n        text-lg\n        text-medium\n        " + (checkPw ? null : "text-red-500 font-bold") + "\n      " }, checkPw ? "사용 가능한 비밀번호입니다" : "비밀번호는 5 ~ 16자 사이 영문과 숫자를 혼합해야합니다."),
        React.createElement(RegisterInput_1["default"], { type: "password", placeholder: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", margin: "mb-3", value: userPwConfirm, onChange: function (e) {
                setUserPwConfirm(e.target.value);
            } }),
        React.createElement("p", { className: "\n        mb-3\n        w-full\n        text-left\n        text-lg\n        text-medium\n        " + (!checkPwConfirm ? "text-red-600 font-bold" : null) + "\n      " }, !checkPwConfirm ? "비밀번호가 일치하지 않습니다" : null),
        React.createElement("div", { className: "w-full mt-12 mb-24" },
            React.createElement(RegisterInput_1["default"], { type: "text", placeholder: "\uC774\uB984", margin: "mb-5", value: userName, onChange: function (e) { return setUserName(e.target.value); } }),
            React.createElement(RegisterInput_1["default"], { type: "text", placeholder: "\uC0DD\uB144\uC6D4\uC77C ex)20240930", margin: "mb-5", value: userBirth, onChange: function (e) {
                    setUserBirth(e.target.value);
                } }),
            React.createElement(RegisterInput_1["default"], { type: "text", placeholder: "\uC774\uBA54\uC77C", margin: "mb-5", value: userEmail, onChange: function (e) {
                    setUserEmail(e.target.value);
                    regEmail();
                } }),
            React.createElement("p", { className: "\n          mb-3\n          w-full\n          text-left\n          text-lg\n          text-medium\n          " + (checkEmail ? 'text-red-600 font-bold' : null) + "\n        " }, emailMsg())),
        React.createElement(Button_1["default"], { label: "\uD68C\uC6D0\uAC00\uC785", size: "full", color: "green", onClick: handleRegi })));
};
exports["default"] = Register;
