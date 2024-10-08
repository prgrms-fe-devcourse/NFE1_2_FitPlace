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
var react_router_dom_1 = require("react-router-dom");
var favorite_svg_1 = require("../assets/favorite.svg");
var commentIcon_svg_1 = require("../assets/commentIcon.svg");
var NotionItem_1 = require("../components/NotionItem");
var Button_1 = require("../components/Button");
var Header_1 = require("../components/Header");
var KakaoMap_1 = require("./KakaoMap"); // KakaoMap 컴포넌트 불러오기
var react_router_dom_2 = require("react-router-dom");
var react_router_dom_3 = require("react-router-dom");
var axios_1 = require("axios");
var react_redux_1 = require("react-redux");
var react_cookie_1 = require("react-cookie");
var NotionPage = function () {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(""), user = _b[0], setUser = _b[1];
    var token = react_redux_1.useSelector(function (state) { return state.userToken; });
    var cookies = new react_cookie_1.Cookies();
    var _c = react_1.useState(cookies.get("token") || token), myToken = _c[0], setMyToken = _c[1]; // 쿠키 또는 Redux에서 토큰 가져옴
    var _d = react_1.useState([]), currentMember = _d[0], setCurrentMember = _d[1];
    var navigate = react_router_dom_1.useNavigate();
    var id = react_router_dom_3.useParams().id;
    var postId = id;
    var modalBackground = react_1.useRef();
    var _e = react_1.useState(false), deleteModal = _e[0], setDeleteModal = _e[1];
    var _f = react_1.useState(null), PrevData = _f[0], setPrevData = _f[1]; //파싱하기 전의 데이터
    var _g = react_1.useState(null), postData = _g[0], setPostData = _g[1];
    var _h = react_1.useState(null), location = _h[0], setLocation = _h[1];
    var parsePostData = function (post) {
        try {
            var parsedTitle = JSON.parse(post.title);
            var _a = parsedTitle.meetingSpot.split(","), address = _a[0], lat = _a[1], lng = _a[2];
            setLocation({
                address: address,
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            });
            return __assign(__assign({}, post), { title: parsedTitle.title, meetingCapacity: parseInt(parsedTitle.meetingCapacity, 10), currentMember: parsedTitle.currentMember, channel: parsedTitle.channel, meetingDate: parsedTitle.meetingDate, meetingTime: parsedTitle.meetingTime, isTimeFlexible: parsedTitle.isTimeFlexible, meetingInfo: parsedTitle.meetingInfo, meetingSpot: parsedTitle.meetingSpot, image: parsedTitle.image });
        }
        catch (error) {
            console.error("Error parsing post title:", error);
            return post;
        }
    };
    // 사용자 정보를 가져오는 함수
    var fetchUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, fullName, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!myToken) {
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/auth-user", {
                            headers: {
                                Authorization: "" + myToken
                            }
                        })];
                case 2:
                    response = _a.sent();
                    fullName = response.data.fullName;
                    if (fullName) {
                        setUser(fullName); // 상태에 사용자 이름 저장
                        localStorage.setItem("userFullName", fullName); // 로컬스토리지에 이름 저장
                        console.log(myToken);
                    }
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("사용자 정보를 가져오는 중 오류 발생", err_1);
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchPostData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, parsedData, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/posts/" + postId, {
                            headers: {}
                        })];
                case 1:
                    response = _b.sent();
                    if (response.status !== 200) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    data = response.data;
                    parsedData = parsePostData(data);
                    setPostData(parsedData);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    if (axios_1["default"].isAxiosError(error_1)) {
                        console.error("Error fetching post data:", ((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) || error_1.message);
                    }
                    else {
                        console.error("Unknown error fetching post data:", error_1);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    // 페이지 로드 시 로컬스토리지에서 사용자 이름을 가져옴
    react_1.useEffect(function () {
        var storedUser = localStorage.getItem("userFullName");
        if (storedUser) {
            setUser(storedUser); // 로컬스토리지에 저장된 이름을 상태로 설정
            console.log("stored", storedUser);
        }
        else {
            fetchUser(); // 저장된 이름이 없으면 사용자 정보 fetch
        }
    }, [token]);
    react_1.useEffect(function () {
        fetchPostData(); // 'id' 변경 시에만 실행
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
                                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Mzk3NTY0fQ.ziDMvpbQF6K61P2POdELAiyLocTIMZ7IZGbe8ZiYlqg"
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
    // 참가신청 모집마감 시작-------------------------------------------
    var channelId = PrevData === null || PrevData === void 0 ? void 0 : PrevData.channel._id;
    var handleJoin = function () {
        if (!token) {
            console.error("토큰이 없습니다. 로그인이 필요합니다.");
            navigate("/login");
            return;
        }
        console.log(postData.currentMember);
        if (postData.currentMember && !postData.currentMember.includes(user)) {
            // 여기에 서버로 업데이트된 정보를 보내는 API 호출 추가
            setCurrentMember(__spreadArrays(postData.currentMember, [user]));
            console.log(user);
            handleCurrentMember(__spreadArrays(postData.currentMember, [user]));
            renderButton();
        }
        else if (currentMember.includes(user)) {
            alert("이미 참가 신청하셨습니다.");
        }
        else if (!user) {
            alert("로그인해주세요");
        }
    };
    var handleLeave = function () {
        if (postData.currentMember.includes(user)) {
            var updatedMembers = postData.currentMember.filter(function (member) { return member !== user; });
            setCurrentMember(updatedMembers);
            handleCurrentMember(updatedMembers);
            renderButton();
        }
        else {
            alert("참가 신청을 하지 않았습니다.");
        }
    };
    var updatePostData = function (updatedTitleString) { return __awaiter(void 0, void 0, void 0, function () {
        var reqBody, response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log(updatedTitleString);
                    reqBody = {
                        postId: postId,
                        title: updatedTitleString,
                        channelId: channelId,
                        image: null,
                        imageToDeletePublicId: null
                    };
                    return [4 /*yield*/, axios_1["default"].put("https://kdt.frontend.5th.programmers.co.kr:5009/posts/update", reqBody, {
                            headers: {
                                Authorization: "" + (myToken || token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log("서버 업데이트 성공");
                    // 업데이트 성공 후 포스트 데이터를 다시 가져옵니다.
                    return [4 /*yield*/, fetchPostData()];
                case 2:
                    // 업데이트 성공 후 포스트 데이터를 다시 가져옵니다.
                    _a.sent();
                    return [2 /*return*/, response.data];
                case 3:
                    error_3 = _a.sent();
                    if (axios_1["default"].isAxiosError(error_3)) {
                        console.error("서버 업데이트 중 오류 발생:"
                        // error.response?.data || error.message
                        );
                    }
                    else {
                        console.error("서버 업데이트 중 알 수 없는 오류 발생:", error_3);
                    }
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleCurrentMember = function (members) { return __awaiter(void 0, void 0, void 0, function () {
        var updatedData, updatedTitleString, updatedPost, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    postData.currentMember = members;
                    updatedData = {
                        title: postData.title,
                        meetingCapacity: postData.meetingCapacity,
                        currentMember: postData.currentMember,
                        channel: postData.channel,
                        meetingTime: postData.meetingTime,
                        isTimeFlexible: postData.isTimeFlexible,
                        meetingSpot: postData.meetingSpot,
                        image: postData.image,
                        meetingInfo: postData.meetingInfo
                    };
                    updatedTitleString = JSON.stringify(updatedData);
                    console.log("업데이트한 타이틀스트링", updatedTitleString);
                    return [4 /*yield*/, updatePostData(updatedTitleString)];
                case 1:
                    updatedPost = _a.sent();
                    if (updatedPost)
                        console.log("업데이트된 게시물", updatedPost);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("게시물 업데이트 실패:", error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var renderButton = function () {
        console.log(postData.currentMember);
        if (postData.currentMember.length > 0 &&
            postData.currentMember.length === postData.meetingCapacity) {
            return (react_1["default"].createElement(Button_1["default"], { label: "\uBAA8\uC9D1 \uB9C8\uAC10", size: "full", color: "grey", disabled: true }));
        }
        else if (postData.currentMember &&
            postData.currentMember.includes(user)) {
            return (react_1["default"].createElement(Button_1["default"], { label: "\uCC38\uAC00 \uCDE8\uC18C", size: "full", color: "line", disabled: false, onClick: handleLeave }));
        }
        else if (postData.currentMember &&
            !postData.currentMember.includes(user)) {
            return (react_1["default"].createElement(Button_1["default"], { label: "\uCC38\uAC00 \uC2E0\uCCAD\uD558\uAE30", size: "full", color: "green", onClick: handleJoin }));
        }
    };
    // 참가신청 버튼완료 ------------------------------------------------------------
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
                            postData.currentMember.length === postData.meetingCapacity ? (react_1["default"].createElement("p", { className: "text-sm text-rose-600 font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("p", { className: "text-sm text-[#AFE327] font-bold" }, "\uBAA8\uC9D1 \uC911")),
                            react_1["default"].createElement("div", { className: "text-xs text-[#898989] flex gap-2" },
                                react_1["default"].createElement(react_router_dom_2.Link, { to: "/notionFix/" + id },
                                    react_1["default"].createElement("button", null, "\uC218\uC815")),
                                "|",
                                react_1["default"].createElement("button", { onClick: function () { return setDeleteModal(true); } }, "\uC0AD\uC81C"))),
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold" }, postData.title),
                        react_1["default"].createElement("p", { className: "text-lg text-[#666666] pt-2.5" }))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-3" },
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC7A5\uC18C"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e] mt-1" }, (location === null || location === void 0 ? void 0 : location.address) || "장소 없음")),
                        react_1["default"].createElement("div", { className: "flex gap-5" },
                            react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC77C\uC2DC"),
                            react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e] mt-1" }, postData.meetingTime || "시간 무관")),
                        react_1["default"].createElement("section", { className: "flex  gap-5" },
                            react_1["default"].createElement("div", { className: "flex gap-5" },
                                react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uCC38\uAC00 \uC2E0\uCCAD\uC790 "),
                                react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e] mt-1" },
                                    postData.currentMember.length > 0
                                        ? postData.currentMember.length
                                        : 0,
                                    " ",
                                    "/ ",
                                    postData.meetingCapacity,
                                    "\uBA85")),
                            react_1["default"].createElement("div", { className: "flex gap-10 " }, postData.currentMember &&
                                (postData === null || postData === void 0 ? void 0 : postData.currentMember.length) > 0 ? (
                            // postData.currentMember.map((item, idx) => (
                            //   <CurrentMemberItem key={idx} userName={item} />
                            // ))
                            react_1["default"].createElement("div", null)) : (react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e] mt-1" }, "\uC544\uC9C1 \uCC38\uAC00\uC790\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.")))))),
                react_1["default"].createElement("section", { className: "mt-7" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(NotionItem_1["default"], { content: postData.meetingInfo })),
                    postData.image && postData.image.length > 0 ? (postData.image.map(function (URL, i) { return (react_1["default"].createElement("div", { className: "flex flex-wrap justify-center border-2 border-gray-200 my-2", key: i },
                        react_1["default"].createElement("img", { className: "w-96 h-96", src: URL, alt: "\uAC8C\uC2DC\uAE00\uC0AC\uC9C4", id: "notionImg" }))); })) : (react_1["default"].createElement("p", { className: "my-10" }, "\uC0AC\uC9C4\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."))),
                react_1["default"].createElement("section", { className: "mt-14" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-4" },
                        react_1["default"].createElement("p", { className: "text-lg font-bold" }, "\uC6B4\uB3D9\uC7A5\uC18C"),
                        react_1["default"].createElement("p", { className: "text-sm text-[#7e7e7e]" }, (location === null || location === void 0 ? void 0 : location.address) || "장소 없음")),
                    location && (react_1["default"].createElement("div", { className: "mt-4" },
                        react_1["default"].createElement(KakaoMap_1["default"], { isMarkerFixed: true, location: {
                                lat: location.lat,
                                lng: location.lng
                            }, style: { height: "300px" } })))),
                react_1["default"].createElement("div", { className: "mt-5 flex justify-between" },
                    react_1["default"].createElement("div", { className: "w-10/12" }, renderButton()),
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
