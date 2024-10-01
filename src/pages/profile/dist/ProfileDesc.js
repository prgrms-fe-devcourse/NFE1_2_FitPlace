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
var react_cookie_1 = require("react-cookie");
var react_redux_1 = require("react-redux");
var axios_1 = require("axios");
var useTypedSelector = react_redux_1.useSelector;
var ProfileDesc = function () {
    var cookie = new react_cookie_1.Cookies();
    var _a = react_1.useState(""), myToken = _a[0], setMyToken = _a[1];
    var _b = react_1.useState(''), textValue = _b[0], setTextValue = _b[1];
    var myInfo = useTypedSelector(function (state) { return state.currentUser; });
    var myDetailData = JSON.parse(myInfo.fullName);
    react_1.useEffect(function () {
        setMyToken(cookie.get('token').replace(/bearer\s+/g, ""));
    }, [cookie]);
    var handleEdit = function () {
        var putData = __assign({}, myDetailData);
        putData.description = textValue;
        var submitData = { fullName: JSON.stringify(putData) };
        axios_1["default"].put("https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user", submitData, {
            headers: {
                Authorization: "bearer " + myToken,
                'Content-Type': 'application/json'
            }
        })
            .then(function (res) { return res.status === 200 ? alert('수정이 완료되었습니다') : null; })["catch"](function (err) { return console.error(err); });
    };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uC18C\uAC1C\uAE00\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6" },
            React.createElement("textarea", { name: "", id: "", value: textValue, onChange: function (e) { return setTextValue(e.target.value); }, placeholder: "\uC785\uB825\uD574\uC8FC\uC138\uC694", className: "px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor min-h-52 resize-none" })),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green", onClick: handleEdit }))));
};
exports["default"] = ProfileDesc;
