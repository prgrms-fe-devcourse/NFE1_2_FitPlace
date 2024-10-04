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
var Popular_sports_1 = require("../components/Popular_sports");
var Health_post_1 = require("../components/Health_post");
var Search_bar_1 = require("../components/Search_bar");
var Header_1 = require("../components/Header");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var axios_1 = require("axios");
var Mainpage = function () {
    var userData = react_redux_1.useSelector(function (state) { return state.currentUser; });
    var _a = react_1.useState([]), channel = _a[0], setChannel = _a[1];
    var _b = react_1.useState([]), post = _b[0], setPost = _b[1];
    var Popular_Channel = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/channels")];
                case 1:
                    response = _a.sent();
                    setChannel(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var Popular_post = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/posts")];
                case 1:
                    response = _a.sent();
                    setPost(response.data);
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
        Popular_Channel();
        Popular_post();
    }, []);
    var Sort_Channel = channel;
    var Sort_Post = post
        .sort(function (a, b) { return b.likes.length - a.likes.length; })
        .slice(0, 6);
    react_1.useEffect(function () {
        console.log("post:", Sort_Post);
    }, [Sort_Post]);
    react_1.useEffect(function () {
        console.log("channel", Sort_Channel);
    }, [Sort_Channel]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/search" },
                react_1["default"].createElement("button", { className: "w-full" },
                    react_1["default"].createElement(Search_bar_1["default"], { placeholder: "\uAC80\uC0C9" }))),
            Sort_Channel.length > 0 && (react_1["default"].createElement("section", { className: "mt-11" },
                react_1["default"].createElement("p", { className: "font-bold mt-11 text-xl mb-3" }, "\uC778\uAE30\uC885\uBAA9"),
                react_1["default"].createElement("div", { className: "flex" },
                    react_1["default"].createElement(Popular_sports_1["default"], { name: Sort_Channel[0].name, description: Sort_Channel[0].description, postLength: Sort_Channel[0].posts.length }),
                    react_1["default"].createElement(Popular_sports_1["default"], { name: Sort_Channel[1].name, description: Sort_Channel[1].description, postLength: Sort_Channel[1].posts.length }),
                    react_1["default"].createElement(Popular_sports_1["default"], { name: Sort_Channel[2].name, description: Sort_Channel[2].description, postLength: Sort_Channel[2].posts.length })),
                react_1["default"].createElement("div", { className: "flex mx-24" },
                    react_1["default"].createElement(Popular_sports_1["default"], { name: Sort_Channel[3].name, description: Sort_Channel[3].description, postLength: Sort_Channel[3].posts.length }),
                    react_1["default"].createElement(Popular_sports_1["default"], { name: Sort_Channel[4].name, description: Sort_Channel[4].description, postLength: Sort_Channel[4].posts.length })))),
            react_1["default"].createElement("section", null,
                react_1["default"].createElement("p", { className: "font-bold mt-11 text-xl mb-3" }, "\uC778\uAE30 \uBAA8\uC784"),
                react_1["default"].createElement("div", { className: "h-1/2" }, Sort_Post.length > 0 &&
                    Sort_Post.map(function (post, index) {
                        var _a;
                        return (react_1["default"].createElement(Health_post_1["default"], { title: post.title, channel_name: (_a = post.channel) === null || _a === void 0 ? void 0 : _a.name, id: post._id, key: index }));
                    }))))));
};
exports["default"] = Mainpage;
