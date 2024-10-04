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
var location_1 = require("../../data/location");
var Button_1 = require("../../components/Button");
var react_1 = require("react");
var react_cookie_1 = require("react-cookie");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var ProfileLocation = function () {
    var cookie = new react_cookie_1.Cookies();
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(0), locaNum = _a[0], setLocaNum = _a[1];
    var _b = react_1.useState(null), cityNum = _b[0], setCityNum = _b[1];
    var _c = react_1.useState(''), myToken = _c[0], setMyToken = _c[1];
    var _d = react_1.useState(''), locaValue = _d[0], setLocaValue = _d[1];
    var _e = react_1.useState(''), cityValue = _e[0], setCityValue = _e[1];
    var _f = react_1.useState(), myData = _f[0], setMyData = _f[1];
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
    // 도, 광역시 선택시 시군구 스크롤 최상단으로
    var myRef = react_1.useRef(null);
    var scrollTop = function () {
        if (myRef.current) {
            myRef.current.scrollTop = 0;
        }
    };
    // 업데이트 하는 값
    var handleEdit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var putData, submitData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(locaValue !== '' && cityValue !== '')) return [3 /*break*/, 2];
                    putData = __assign({}, myData);
                    putData.location = locaValue + ' ' + cityValue;
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
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [2 /*return*/, alert('지역을 선택해주십시요.')];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uC0B4\uACE0 \uC788\uB294 \uC9C0\uC5ED\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6 h-[calc(68vh)] bg-gray-100" },
            React.createElement("ul", { className: "flex justify-center items-start h-full" },
                React.createElement("li", { className: "w-full text-center text-xl text-locationColor h-full overflow-scroll", style: { scrollbarWidth: "none" } }, location_1.locationList.map(function (province, idx) {
                    return (React.createElement("div", { key: idx, className: "cursor-pointer py-3 hover:bg-gray-200 " + (locaNum === idx ? "text-greenColor font-bold" : null), onClick: function () {
                            setLocaNum(idx);
                            setCityNum(null);
                            scrollTop();
                            setLocaValue(province.name);
                            setCityValue('');
                        } },
                        React.createElement("span", null, province.name)));
                })),
                React.createElement("ul", { className: "w-full text-center text-xl text-locationColor h-full overflow-scroll", style: { scrollbarWidth: "none" }, ref: myRef }, location_1.locationList[locaNum].subArea.map(function (city, idx) {
                    return (React.createElement("div", { key: idx, className: "cursor-pointer py-3 hover:bg-gray-200 " + (cityNum === idx ? "text-greenColor font-bold" : null) + " relative", onClick: function () {
                            setCityNum(idx);
                            setCityValue(city);
                        } },
                        React.createElement("span", null, city),
                        cityNum === idx ? React.createElement("span", null,
                            React.createElement("img", { src: "/src/assets/check.svg", alt: "\uC120\uD0DD\uB418\uC5C8\uC2B5\uB2C8\uB2E4", className: "absolute bottom-1/2 right-12 translate-y-1/2" })) : null));
                })))),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green", onClick: handleEdit }))));
};
exports["default"] = ProfileLocation;
