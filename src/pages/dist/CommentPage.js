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
var CommentItem_1 = require("../components/CommentItem");
var Button_1 = require("../components/Button");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var react_cookie_1 = require("react-cookie");
var CommentPage = function () {
    var _a;
    var id = react_router_dom_1.useParams().id;
    var _b = react_1.useState(), Post = _b[0], setPost = _b[1];
    var _c = react_1.useState(""), Input_value = _c[0], setInput_value = _c[1];
    var _d = react_1.useState(""), ParsingData = _d[0], setParsingData = _d[1];
    var cookies = react_cookie_1.useCookies(["token"])[0];
    var token = cookies.token;
    var CommentLoading = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/posts/" + id)];
                case 1:
                    response = _a.sent();
                    setPost(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (Post) {
            try {
                var parsedTitle = JSON.parse(Post.title);
                setParsingData(parsedTitle);
            }
            catch (error) { }
        }
    }, [Post]);
    var Input_comment = function (e) {
        setInput_value(e.target.value);
    };
    var Register_comment = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post("https://kdt.frontend.5th.programmers.co.kr:5009/comments/create", {
                            comment: Input_value,
                            postId: id
                        }, {
                            headers: {
                                Authorization: "" + token
                            }
                        })];
                case 1:
                    _a.sent();
                    setInput_value("");
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        CommentLoading();
    }, [Post]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "relative bg-white w-140 mx-auto min-h-screen flex flex-col" },
            react_1["default"].createElement("div", { className: "flex-grow p-3" },
                ParsingData.currentMember === ParsingData.meetingCapacity ? (react_1["default"].createElement("div", { className: "text-sm text-rose-600 mb-1 font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("div", { className: "text-sm text-[#AFE327] mb-1 font-bold" }, "\uBAA8\uC9D1\uC911")),
                react_1["default"].createElement("div", { className: "text-xl font-bold mb-4" }, ParsingData.title || "제목 없음"),
                react_1["default"].createElement("div", { className: "text-sm text-gray-600 mb-8" }, ((_a = Post === null || Post === void 0 ? void 0 : Post.channel) === null || _a === void 0 ? void 0 : _a.name) || "채널 이름 없음"),
                react_1["default"].createElement("div", { className: "flex-grow overflow-y-auto max-h-78vh" }, Post ? (Post.comments.map(function (item, idx) { return (react_1["default"].createElement("div", { key: idx, className: "bg-gray-100 w-full rounded-md shadow-lg mb-5 p-4 flex flex-col" },
                    react_1["default"].createElement(CommentItem_1["default"], { item: item }))); })) : (react_1["default"].createElement("div", null, "\uB313\uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."))),
                react_1["default"].createElement("div", { className: "absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6" },
                    react_1["default"].createElement("div", { className: "flex w-full" },
                        react_1["default"].createElement("textarea", { placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694", className: "flex-1 border rounded-[4px] mr-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden", onChange: function (e) { return Input_comment(e); }, value: Input_value }),
                        react_1["default"].createElement(Button_1["default"], { label: "\uB4F1\uB85D", size: "small", onClick: function () { return Register_comment(); } })))))));
};
exports["default"] = CommentPage;
