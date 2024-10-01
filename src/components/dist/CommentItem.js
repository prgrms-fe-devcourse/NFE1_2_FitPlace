"use strict";
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
var defaultProfileImg_svg_1 = require("../assets/defaultProfileImg.svg");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var react_cookie_1 = require("react-cookie");
var CommentItem = function (_a) {
    var item = _a.item;
    var _b = react_1.useState(false), showOptions = _b[0], setShowOptions = _b[1];
    var timerRef = react_1.useRef(null);
    var id = react_router_dom_1.useParams().id;
    var cookies = react_cookie_1.useCookies(["token"])[0];
    var token = cookies.token;
    // const toggleOptions = () => {
    //   setShowOptions(true);
    //   if (timerRef.current !== null) {
    //     clearTimeout(timerRef.current);
    //   }
    //   timerRef.current = window.setTimeout(() => {
    //     setShowOptions(false);
    //     timerRef.current = null;
    //   }, 5000);
    // };
    // const handleEdit = async () => {
    //   // 수정 로직
    // };
    var parsingObject;
    try {
        // 이중 파싱: 이스케이프된 문자열을 먼저 일반 문자열로 변환 후 JSON 파싱
        parsingObject = JSON.parse(item.author.fullName);
        console.log("parsing", parsingObject);
    }
    catch (error) {
        console.error("JSON 파싱 오류:", error);
        parsingObject = {};
    }
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isConfirmed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
                    if (!isConfirmed) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"]["delete"]("https://kdt.frontend.5th.programmers.co.kr:5009/comments/delete", {
                            data: {
                                id: item._id
                            },
                            headers: {
                                Authorization: "" + token
                            }
                        })];
                case 2:
                    _a.sent();
                    console.log("댓글 삭제 성공");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    alert("삭제 할 수 없는 댓글입니다.");
                    console.log("댓글 삭제 에러", error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    console.log("삭제가 취소되었습니다.");
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        return function () {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    return (react_1["default"].createElement("div", { className: "relative flex items-start w-full" },
        react_1["default"].createElement("div", { className: "w-10 mr-4 flex-shrink-0" },
            react_1["default"].createElement("img", { src: defaultProfileImg_svg_1["default"], alt: "user-icon", className: "w-full h-full object-cover rounded-full overflow-hidden" })),
        react_1["default"].createElement("div", { className: "flex-grow" },
            react_1["default"].createElement("div", { className: "text-sm mb-2 font-bold" }, parsingObject.fullName),
            react_1["default"].createElement("div", { className: "text-base" }, item.comment)),
        item.author.fullName && (react_1["default"].createElement("div", { className: "absolute top-0 right-0" },
            react_1["default"].createElement("div", { className: "flex items-center" },
                react_1["default"].createElement("div", { className: "cursor-pointer text-red-400 hover:underline text-sm", onClick: function () { return handleDelete(); } }, "\uC0AD\uC81C"))))));
};
exports["default"] = CommentItem;
