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
var react_router_dom_1 = require("react-router-dom");
var icon_user_profile_svg_1 = require("../assets/icon_user_profile.svg");
var favorite_svg_1 = require("../assets/favorite.svg");
var commentIcon_svg_1 = require("../assets/commentIcon.svg");
var NotionItem_1 = require("../components/NotionItem");
var Button_1 = require("../components/Button");
var Header_1 = require("../components/Header");
var KakaoMap_1 = require("./KakaoMap"); // KakaoMap 컴포넌트 불러오기
var react_router_dom_2 = require("react-router-dom");
var react_router_dom_3 = require("react-router-dom");
var axios_1 = require("axios");
var NotionPage = function () {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(false), deleteModal = _a[0], setDeleteModal = _a[1];
    var modalBackground = react_1.useRef();
    var id = react_router_dom_3.useParams().id;
    var _b = react_1.useState(null), postData = _b[0], setPostData = _b[1];
    var _c = react_1.useState({}), PrevData = _c[0], setPrevData = _c[1];
    var _d = react_1.useState(null), location = _d[0], setLocation = _d[1];
    var parsePostData = function (post) {
        try {
            var parsedTitle = JSON.parse(post.title);
            var _a = parsedTitle.meetingSpot.split(","), address = _a[0], lat = _a[1], lng = _a[2];
            setLocation({
                address: address,
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            });
            return __assign(__assign({}, post), { actualTitle: parsedTitle.title, meetingCapacity: parseInt(parsedTitle.meetingCapacity, 10), currentMember: parseInt(parsedTitle.currentMember, 10), channel: parsedTitle.channel, meetingDate: parsedTitle.meetingDate, meetingTime: parsedTitle.meetingTime, isTimeFlexible: parsedTitle.isTimeFlexible, meetingInfo: parsedTitle.meetingInfo, meetingSpot: parsedTitle.meetingSpot, image: parsedTitle.image });
        }
        catch (error) {
            console.error("Error parsing post title:", error);
            return post;
        }
    };
    react_1.useEffect(function () {
        var fetchPostData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var API_URL, postId, response, data, parsedData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
                        postId = id;
                        return [4 /*yield*/, fetch(API_URL + "/posts/" + postId, {
                                headers: {
                                    Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDE0ODU5fQ.Al40jxy-6yrAoANrY3fQA1joeNw08-fjByus_ZfxXSk"
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! status: " + response.status);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        parsedData = parsePostData(data);
                        setPostData(parsedData);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching post data:", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchPostData();
    }, [id]);
    if (!postData) {
        return react_1["default"].createElement("div", null, "Loading...");
    }
    //게시글 삭제 코드 입니다. 충돌 방지--------------------------------------------------------
    var Delete_post = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"]["delete"]("https://kdt.frontend.5th.programmers.co.kr:5009/posts/delete/", {
                            headers: {
                                Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDE0ODU5fQ.Al40jxy-6yrAoANrY3fQA1joeNw08-fjByus_ZfxXSk"
                            },
                            data: {
                                id: id
                            }
                        })];
                case 1:
                    _a.sent();
                    navigate("/");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log("게시글 삭제 실패", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    //-------------------------------------------
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white w-[640px] min-h-screen" },
            react_1["default"].createElement("div", { id: "container", className: "m-5 relative" },
                deleteModal && (react_1["default"].createElement("div", { className: "flex justify-center absolute w-full h-full backdrop-blur-sm items-center" },
                    react_1["default"].createElement("div", { className: "w-[400px] h-[200px] flex justify-center items-center border-2 border-solid border-[#000000] rounded-xl bg-white", onClick: function (e) {
                            if (e.target === modalBackground.current) {
                                setDeleteModal(false);
                            }
                        } },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("p", null, "\uAC8C\uC2DC\uAE00\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694?"),
                            react_1["default"].createElement("div", { className: "flex gap-5 mt-2" },
                                react_1["default"].createElement(Button_1["default"], { label: "\uC0AD\uC81C", size: "mid", color: "green", onClick: Delete_post }),
                                react_1["default"].createElement(Button_1["default"], { label: "\uCDE8\uC18C", size: "mid", color: "green", onClick: function () { return setDeleteModal(false); } })))))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { className: "flex justify-between" },
                            postData.currentMember === postData.meetingCapacity ? (react_1["default"].createElement("p", { className: "text-sm text-rose-600 font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("p", { className: "text-sm text-[#AFE327] font-bold" }, "\uBAA8\uC9D1 \uC911")),
                            react_1["default"].createElement("div", { className: "text-xs text-[#898989] flex gap-2" },
                                react_1["default"].createElement(react_router_dom_2.Link, { to: "/notionFix/" + id },
                                    react_1["default"].createElement("button", null, "\uC218\uC815")),
                                "|",
                                react_1["default"].createElement("button", { onClick: function () { return setDeleteModal(true); } }, "\uC0AD\uC81C"))),
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold" }, postData.actualTitle),
                        react_1["default"].createElement("p", { className: "text-lg text-[#666666] pt-2.5" }))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC7A5\uC18C"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, (location === null || location === void 0 ? void 0 : location.address) || "장소 없음")),
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC77C\uC2DC"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, postData.meetingTime || "시간 무관")))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(NotionItem_1["default"], { content: postData.meetingInfo })),
                    postData.image && postData.image.length > 0 ? (postData.image.map(function (URL, i) { return (react_1["default"].createElement("div", { className: "flex flex-wrap justify-center border-2 border-gray-200 my-2", key: i },
                        react_1["default"].createElement("img", { className: "w-96 h-96", src: URL, alt: "\uAC8C\uC2DC\uAE00\uC0AC\uC9C4", id: "notionImg" }))); })) : (react_1["default"].createElement("p", { className: "my-10" }, "\uC0AC\uC9C4\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."))),
                react_1["default"].createElement("section", { className: "mt-11 flex flex-col gap-5" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "text-lg font-bold" },
                            "\uBA64\uBC84 ",
                            react_1["default"].createElement("span", null, postData.currentMember || "0명"),
                            " /",
                            " ",
                            postData.meetingCapacity,
                            "\uBA85")),
                    react_1["default"].createElement("div", { className: "flex gap-10 " },
                        react_1["default"].createElement("div", { className: "flex flex-col text-center gap-1.5" },
                            react_1["default"].createElement("img", { src: icon_user_profile_svg_1["default"], alt: "\uD504\uB85C\uD544\uC774\uBBF8\uC9C0" }),
                            react_1["default"].createElement("p", null, "\uD48B\uC0B4\uD48B\uC0B4")),
                        react_1["default"].createElement("div", { className: "flex flex-col text-center gap-1.5" },
                            react_1["default"].createElement("img", { src: icon_user_profile_svg_1["default"], alt: "\uD504\uB85C\uD544\uC774\uBBF8\uC9C0" }),
                            react_1["default"].createElement("p", null, "\uAE40\uB3D9\uB3D9")))),
                react_1["default"].createElement("section", { className: "mt-14" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-4" },
                        react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC6B4\uB3D9\uC7A5\uC18C"),
                        react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, (location === null || location === void 0 ? void 0 : location.address) || "장소 없음")),
                    location && (react_1["default"].createElement("div", { className: "mt-4" },
                        react_1["default"].createElement(KakaoMap_1["default"], { isMarkerFixed: true, location: { lat: location.lat, lng: location.lng }, style: { height: "300px" } })))),
                react_1["default"].createElement("div", { className: "mt-5 flex justify-between" },
                    react_1["default"].createElement("div", { className: "w-10/12" },
                        react_1["default"].createElement(Button_1["default"], { label: "\uCC38\uAC00 \uC2E0\uCCAD\uD558\uAE30", size: "full", color: "green" })),
                    react_1["default"].createElement("div", { className: "flex gap-2.5" },
                        react_1["default"].createElement("div", { className: "w-8" },
                            react_1["default"].createElement("button", null,
                                react_1["default"].createElement("img", { src: favorite_svg_1["default"], alt: "\uC88B\uC544\uC694\uBC84\uD2BC" }))),
                        react_1["default"].createElement("div", { className: "w-8" },
                            react_1["default"].createElement(react_router_dom_2.Link, { to: "/notion/" + id + "/comments" },
                                react_1["default"].createElement("button", null,
                                    react_1["default"].createElement("img", { src: commentIcon_svg_1["default"], alt: "\uBA54\uC138\uC9C0\uBC84\uD2BC" }))))))))));
};
exports["default"] = NotionPage;
