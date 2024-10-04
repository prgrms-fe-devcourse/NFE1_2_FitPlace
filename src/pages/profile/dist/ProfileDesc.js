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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var Button_1 = require("../../components/Button");
var react_cookie_1 = require("react-cookie");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var ProfileDesc = function () {
    var cookie = new react_cookie_1.Cookies();
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(""), myToken = _a[0], setMyToken = _a[1];
    var _b = react_1.useState(""), textValue = _b[0], setTextValue = _b[1];
    var _c = react_1.useState(0), textLength = _c[0], setTextLength = _c[1];
    var _d = react_1.useState(), myData = _d[0], setMyData = _d[1];
    react_1.useEffect(function () {
        setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
        try {
            axios_1["default"]
                .get("https://kdt.frontend.5th.programmers.co.kr:5009/auth-user", {
                headers: {
                    Authorization: "bearer " + myToken
                }
            })
                .then(function (res) {
                setMyData(JSON.parse(res.data.fullName));
            });
        }
        catch (err) {
            console.log(err);
            navigate("/");
        }
    }, [cookie]);
    var handleEdit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var putData, submitData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(textValue.length < 20 || textValue.length > 300)) return [3 /*break*/, 1];
                    return [2 /*return*/, alert('소개글은 20자에서 300자 사이여야 합니다.')];
                case 1:
                    putData = __assign({}, myData);
                    putData.description = textValue;
                    submitData = JSON.stringify(putData);
                    return [4 /*yield*/, axios_1["default"]
                            .put("https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user", {
                            fullName: submitData
                        }, {
                            headers: {
                                Authorization: "bearer " + myToken
                            }
                        })
                            .then(function (res) {
                            if (res.status === 200) {
                                alert("수정 되었습니다.");
                            }
                        })["catch"](function (err) {
                            console.log(err);
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uC18C\uAC1C\uAE00\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6" },
            React.createElement("textarea", { name: "", id: "", value: textValue, onChange: function (e) {
                    setTextValue(e.target.value);
                    setTextLength(e.target.value.length);
                }, placeholder: "\uC785\uB825\uD574\uC8FC\uC138\uC694", className: "px-4 py-5 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none rounded-lg shadow w-full font-bold text-xl placeholder:text-greenColor min-h-52 resize-none" }),
            React.createElement("p", { className: "text-gray-400 text-right" },
                textLength,
                " / 300")),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green", onClick: handleEdit }))));
};
exports["default"] = ProfileDesc;
