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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var icon_user_profile_svg_1 = require("../assets/icon_user_profile.svg");
var favorite_svg_1 = require("../assets/favorite.svg");
var commentIcon_svg_1 = require("../assets/commentIcon.svg");
var NotionItem_1 = require("../components/NotionItem");
var Button_1 = require("../components/Button");
var Header_1 = require("../components/Header");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var NotionPage = function () {
    var API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
    var id = react_router_dom_2.useParams().id;
    var postId = id;
    var modalBackground = react_1.useRef();
    var _a = react_1.useState(false), deleteModal = _a[0], setDeleteModal = _a[1];
    var _b = react_1.useState(null), PrevData = _b[0], setPrevData = _b[1]; //파싱하기 전의 데이터
    var _c = react_1.useState(null), postData = _c[0], setPostData = _c[1];
    var _d = react_1.useState([]), currentMember = _d[0], setCurrentMember = _d[1];
    var _e = react_1.useState([]), channels = _e[0], setChannels = _e[1];
    var parsePostData = function (post) {
        try {
            var parsedTitle = JSON.parse(post.title);
            return __assign(__assign({}, post), { actualTitle: parsedTitle.title, meetingCapacity: parseInt(parsedTitle.meetingCapacity, 10), currentMember: currentMember, channel: parsedTitle.channel, meetingDate: parsedTitle.meetingDate, meetingStartTime: parsedTitle.meetingStartTime, meetingEndTime: parsedTitle.meetingEndTime, isTimeFlexible: parsedTitle.isTimeFlexible, meetingSpot: parsedTitle.meetingSpot, image: parsedTitle.image });
        }
        catch (error) {
            console.error("Error parsing post title:", error);
            return post; // 파싱에 실패하면 원본 데이터 반환
        }
    };
    react_1.useEffect(function () {
        var fetchPostData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(API_URL + "/posts/" + postId, {
                                headers: {}
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("HTTP error! status: " + response.status);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        setPrevData(data);
                        // const parsedData = parsePostData(data);
                        setPostData(JSON.parse(data.title));
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
    }, []);
    if (!postData) {
        return react_1["default"].createElement("div", null, "Loading..."); // 데이터 로딩 중 표시
    }
    // 참가신청 클릭 시 실행함수
    var handleJoin = function () {
        var userName = "현재 로그인한 사용자 이름"; // 실제 로그인 시스템에서 가져와야 함
        if (!currentMember.includes(userName)) {
            setCurrentMember(__spreadArrays(currentMember, [userName]));
            // 여기에 서버로 업데이트된 정보를 보내는 API 호출 추가
        }
        else {
            alert("이미 참가 신청하셨습니다.");
        }
    };
    react_1.useEffect(function () {
        if (currentMember !== postData.currentMember) {
        }
    }, [currentMember]);
    var updatePostData = function (postData, image, token) { return __awaiter(void 0, void 0, void 0, function () {
        var channelId, requestBody, response, updatedPost, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    channelId = ((_a = channels.find(function (ch) { return ch.name === postData.channel; })) === null || _a === void 0 ? void 0 : _a._id) || "";
                    requestBody = {
                        postId: postId,
                        title: JSON.stringify(parsePostData),
                        currentMember: currentMember,
                        image: null,
                        channelId: channelId
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(API_URL + "/posts/update", {
                            method: "PUT",
                            headers: {
                                Authorization: "bearer " + token
                            },
                            body: requestBody
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error("서버 업데이트 실패");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    updatedPost = _b.sent();
                    return [2 /*return*/, updatedPost];
                case 4:
                    error_2 = _b.sent();
                    console.error("서버 업데이트 중 오류 발생:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white w-[640px] h-full" },
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
                                react_1["default"].createElement(Button_1["default"], { label: "\uC0AD\uC81C", size: "mid", color: "green" }),
                                react_1["default"].createElement(Button_1["default"], { label: "\uCDE8\uC18C", size: "mid", color: "green", onClick: function () {
                                        return setDeleteModal(false);
                                    } })))))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("div", { className: "flex justify-between" },
                            postData.currentMember.length ===
                                postData.meetingCapacity ? (react_1["default"].createElement("p", { className: "text-sm text-rose-600 font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("p", { className: "text-sm text-[#AFE327] font-bold" }, "\uBAA8\uC9D1 \uC911")),
                            react_1["default"].createElement("div", { className: "text-xs text-[#898989] flex gap-2" },
                                react_1["default"].createElement("button", null, "\uC218\uC815"),
                                "|",
                                react_1["default"].createElement("button", { onClick: function () { return setDeleteModal(true); } }, "\uC0AD\uC81C"))),
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold" }, postData.actualTitle),
                        react_1["default"].createElement("p", { className: "text-lg text-[#666666] pt-2.5" }))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC7A5\uC18C"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, postData.meetingSpot || "장소 없음")),
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC77C\uC2DC"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, postData.meetingTime || "")))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(NotionItem_1["default"], { content: postData.meetingInfo })),
                    postData.image && (postData === null || postData === void 0 ? void 0 : postData.image.length) > 0 ? (postData.image.map(function (URL, i) { return (react_1["default"].createElement("div", { className: "flex flex-wrap justify-center border-2 border-gray-200 my-2" },
                        react_1["default"].createElement("img", { className: "w-96 h-96", src: URL, alt: "\uAC8C\uC2DC\uAE00\uC0AC\uC9C4", id: "notionImg" }))); })) : (react_1["default"].createElement("p", { className: "my-10" }, "\uC0AC\uC9C4\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."))),
                react_1["default"].createElement("section", { className: "mt-11 flex flex-col gap-5" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", { className: "text-lg font-bold" },
                            "\uBA64\uBC84 ",
                            currentMember.length,
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
                        react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, postData.meetingSpot || "장소 없음")),
                    react_1["default"].createElement("div", null)),
                react_1["default"].createElement("p", null,
                    "\uBA64\uBC84 ",
                    currentMember.length,
                    " / ",
                    postData.meetingCapacity,
                    "\uBA85"),
                react_1["default"].createElement("p", null,
                    "\uCC38\uAC00\uC790: ",
                    currentMember.join(", ")),
                react_1["default"].createElement("div", { className: "mt-5 flex justify-between" },
                    react_1["default"].createElement("div", { className: "w-10/12" },
                        react_1["default"].createElement(Button_1["default"], { label: "\uCC38\uAC00 \uC2E0\uCCAD\uD558\uAE30", size: "full", color: "green", onClick: handleJoin })),
                    react_1["default"].createElement("div", { className: "flex gap-2.5" },
                        react_1["default"].createElement("div", { className: "w-8" },
                            react_1["default"].createElement("button", null,
                                react_1["default"].createElement("img", { src: favorite_svg_1["default"], alt: "\uC88B\uC544\uC694\uBC84\uD2BC" }))),
                        react_1["default"].createElement("div", { className: "w-8" },
                            react_1["default"].createElement(react_router_dom_1.Link, { to: "/notion/" + id + "/comments" },
                                react_1["default"].createElement("button", null,
                                    react_1["default"].createElement("img", { src: commentIcon_svg_1["default"], alt: "\uBA54\uC138\uC9C0\uBC84\uD2BC" }))))))))));
};
exports["default"] = NotionPage;
