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
var react_router_dom_1 = require("react-router-dom");
var ProfileWrap_1 = require("../../components/ProfileWrap");
var react_router_dom_2 = require("react-router-dom");
var react_1 = require("react");
var axios_1 = require("axios");
var react_cookie_1 = require("react-cookie");
var ProfileTemplate = function () {
    var cookie = new react_cookie_1.Cookies();
    var _a = react_1.useState(false), isMyProfile = _a[0], setIsMyProfile = _a[1];
    var _b = react_1.useState(), myToken = _b[0], setMyToken = _b[1];
    var _c = react_1.useState(''), paramsId = _c[0], setParamsId = _c[1];
    var _d = react_1.useState(''), tokenId = _d[0], setTokenId = _d[1];
    var _e = react_1.useState([]), likedPost = _e[0], setLikedPost = _e[1];
    var _f = react_1.useState(), postData = _f[0], setPostData = _f[1];
    var _g = react_1.useState({
        fullName: '',
        birth: 0,
        userId: '',
        description: '',
        location: '',
        image: []
    }), profileData = _g[0], setProfileData = _g[1];
    var _h = react_1.useState(), likedData = _h[0], setLikedData = _h[1];
    var id = react_router_dom_2.useParams().id;
    react_1.useEffect(function () {
        var token = cookie.get("token").replace(/bearer\s+/g, "");
        setMyToken(token);
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var paramRes, profile_1, tokenRes, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/users/" + id)];
                    case 1:
                        paramRes = _a.sent();
                        setLikedPost(paramRes.data.likes);
                        setParamsId(paramRes.data._id);
                        if (paramRes.data.fullName === 'STYLED 관리자') {
                            setProfileData(function (prev) { return (__assign(__assign({}, prev), { fullName: '관리자', birth: 20000101, location: '관리자', description: '관리자용 계정입니다', userId: '관리자', image: [] })); });
                        }
                        else {
                            profile_1 = JSON.parse(paramRes.data.fullName);
                            setProfileData(function (prev) { return (__assign(__assign({}, prev), profile_1)); });
                        }
                        return [4 /*yield*/, axios_1["default"].get('https://kdt.frontend.5th.programmers.co.kr:5009/auth-user', {
                                headers: {
                                    Authorization: "bearer " + myToken
                                }
                            })];
                    case 2:
                        tokenRes = _a.sent();
                        setTokenId(tokenRes.data._id);
                        if (paramsId === tokenId) {
                            setIsMyProfile(true);
                        }
                        else {
                            setIsMyProfile(false);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        if (token) {
            fetchData();
        }
    }, [id]);
    react_1.useEffect(function () {
        if (paramsId === tokenId) {
            setIsMyProfile(true);
        }
        else {
            setIsMyProfile(false);
        }
        initializePost();
    }, [paramsId, tokenId]);
    var initializePost = function () {
        likedPost.forEach(function (item) {
            if ('post' in item) {
                console.log('있어');
            }
            else {
                console.log('없어');
            }
        });
        // if (Array.isArray(likedPost)) {
        //   const evenData: PostArr[] = [];
        //   likedPost.map((post, idx) => {
        //     const matchedData = postData?.find(item => item._id === post.post);
        //     if(typeof matchedData === 'object') {
        //       evenData.push(matchedData)
        //       console.log(evenData)
        //     }
        //   })
        //   const set = new Set(evenData)
        //   const arr = [...set];
        //   arr.map((item, idx) => {
        //     return setLikedData(JSON.parse(item.title))
        //   })
        // }
    };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
        React.createElement(react_router_dom_1.Link, { to: '/profile/edit' }, "\uC784\uC2DC\uB9AC\uB3D9"),
        React.createElement("div", { className: "flex flex-col justify-center items-stretch" },
            React.createElement("div", { className: "flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                React.createElement("div", { id: "profileImg", className: "mx-auto w-24 h-24 overflow-hidden rounded-lg" }, profileData.image.length !== 0
                    ? React.createElement("img", { src: profileData.image[0], alt: (profileData === null || profileData === void 0 ? void 0 : profileData.fullName) + "\uB2D8\uC758 \uD504\uB85C\uD544 \uC0AC\uC9C4", className: "object-cover w-full h-full" })
                    : React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: (profileData === null || profileData === void 0 ? void 0 : profileData.fullName) + "\uB2D8\uC758 \uD504\uB85C\uD544 \uC0AC\uC9C4", className: "object-cover w-full h-full" })),
                React.createElement("div", { className: "mt-2" },
                    React.createElement("p", { className: "text-3xl font-bold" }, !profileData.fullName || profileData.fullName === ''
                        ? "닉네임"
                        : profileData === null || profileData === void 0 ? void 0 : profileData.fullName)),
                React.createElement("div", { className: "mt-6" },
                    React.createElement("p", { className: "text-base font-normal" },
                        React.createElement("span", { className: "font-bold" }, "0"),
                        "\uD68C \uC624\uB298\uC758 \uAC19\uC774 \uC6B4\uB3D9 \uC644\uB8CC!"))),
            React.createElement("div", { className: "profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6" },
                React.createElement(ProfileWrap_1["default"], { category: "\uC18C\uAC1C\uAE00", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.description) ? "아직 작성하지 않았어요" : profileData.description }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC9C0\uC5ED", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.location) ? "아직 작성하지 않았어요" : profileData.location }),
                React.createElement("div", { className: "py-4 px-5 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                    React.createElement("p", { className: "font-bold text-base" }, "\uC88B\uC544\uC694\uB97C \uB204\uB978 \uAC8C\uC2DC\uBB3C"),
                    likedData === null
                        ? React.createElement("p", { className: "font-medium text-base mt-4" }, "\uC5C6\uCA84")
                        : React.createElement("p", { className: "font-medium text-base mt-4" }, "\uC788\uCA84")),
                isMyProfile
                    ?
                        // 차단 유저 목록
                        React.createElement(ProfileWrap_1["default"], { category: "\uCC28\uB2E8\uC720\uC800 \uBAA9\uB85D", description: "\uB300\uCDA9 \uC788\uC744\uB54C \uC774\uAC70\uB123\uC744\uB4EF" })
                    : null))));
};
exports["default"] = ProfileTemplate;
