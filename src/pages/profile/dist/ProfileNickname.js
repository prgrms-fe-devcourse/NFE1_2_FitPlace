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
var react_cookie_1 = require("react-cookie");
var Button_1 = require("../../components/Button");
var react_1 = require("react");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var useTypedSelector = react_redux_1.useSelector;
var ProfileNickname = function () {
    var cookie = new react_cookie_1.Cookies();
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(""), myToken = _a[0], setMyToken = _a[1];
    var _b = react_1.useState(''), nickname = _b[0], setNickname = _b[1];
    var myInfo = useTypedSelector(function (state) { return state.currentUser; });
    var myDetailData = null;
    react_1.useEffect(function () {
        try {
            myDetailData = JSON.parse(myInfo.fullName);
        }
        catch (err) {
            alert('잘못된 접근입니다.');
            navigate('/');
        }
    }, [myInfo]);
    react_1.useEffect(function () {
        setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
    }, [cookie]);
    var handleEdit = function () {
        var putData = __assign({}, myDetailData);
        putData.fullName = nickname;
        var submitData = { fullName: JSON.stringify(putData) };
        if (nickname.length > 9 || nickname.length < 3 || nickname.includes(' ')) {
            return alert('닉네임은 2 ~ 8자 사이여야 하며 공백이 없어야합니다.');
        }
        else {
            axios_1["default"].put("https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user", submitData, {
                headers: {
                    // Authorization: `bearer ${myToken}`,
                    Authorization: "bearer fnejkwfjklwehfkjqebnkjbnqejkvnlqeklkevjvkljeqkljekl",
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                if (res.status === 200) {
                    alert('수정이 완료되었습니다');
                    navigate('/');
                }
                else {
                    return null;
                }
            })["catch"](function (err) {
                if (err.status === 401) {
                    alert('올바르지 않은 사용자 입니다.');
                    navigate('/');
                }
                else if (err.status === 404) {
                    alert('올바르지 않은 경로의 접근입니다.');
                    navigate('/');
                }
            });
        }
    };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6" },
            React.createElement("input", { type: "text", name: "", id: "", placeholder: "\uC785\uB825\uD574\uC8FC\uC138\uC694", className: "px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor", onChange: function (e) { return setNickname(e.target.value); } }),
            nickname.length > 9 || nickname.length < 3 || nickname.includes(' ')
                ? React.createElement("p", { className: "text-red-600 font-bold text-lg" }, "\uB2C9\uB124\uC784\uC740 2 ~ 8\uC790 \uC0AC\uC774\uC5EC\uC57C \uD558\uBA70 \uACF5\uBC31\uC774 \uC5C6\uC5B4\uC57C\uD569\uB2C8\uB2E4.")
                : null),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green", onClick: handleEdit }))));
};
exports["default"] = ProfileNickname;
