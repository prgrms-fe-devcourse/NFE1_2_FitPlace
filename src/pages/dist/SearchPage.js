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
var Search_bar_1 = require("../components/Search_bar");
var SearchPost_1 = require("../components/SearchPost");
var SearchUser_1 = require("../components/SearchUser");
var Header_1 = require("../components/Header");
var Button_1 = require("../components/Button");
var axios_1 = require("axios");
var API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
function parsePost(post) {
    var parsedTitle = {};
    if (post.title && post.title.startsWith("{") && post.title.endsWith("}")) {
        try {
            parsedTitle = JSON.parse(post.title);
        }
        catch (error) {
            console.error("Error parsing post title:", error);
            // JSON 파싱에 실패했을 때 parsedTitle은 빈 객체로 유지
            parsedTitle = {};
        }
    }
    return {
        _id: post._id,
        title: parsedTitle.title || post.title || "",
        name: parsedTitle.name || "",
        currentMember: parsedTitle.currentMember || 0,
        meetingCapacity: parsedTitle.meetingCapacity || 0,
        isTimeFlexible: parsedTitle.isTimeFlexible || false,
        meetingTime: parsedTitle.meetingTime || "",
        meetingSpot: parsedTitle.meetingSpot || "",
        image: post.image,
        imagePublicId: post.imagePublicId,
        author: post.author,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        likes: post.likes,
        comments: post.comments
    };
}
var SearchPage = function () {
    var _a = react_1.useState(""), query = _a[0], setQuery = _a[1];
    var _b = react_1.useState([]), results = _b[0], setResults = _b[1];
    var searchCategory = ["포스트", "사용자"];
    var _c = react_1.useState(searchCategory[0]), activeButton = _c[0], setActiveButton = _c[1];
    var _d = react_1.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState([]), post = _e[0], setPost = _e[1];
    var _f = react_1.useState([]), channel = _f[0], setChannel = _f[1];
    var _g = react_1.useState(false), enter = _g[0], setEnter = _g[1];
    var _h = react_1.useState(null), error = _h[0], setError = _h[1];
    var getValue = function (newValue) {
        setQuery(newValue);
    };
    var selectCl = activeButton === "포스트" ? "all" : "users";
    var KeyDown = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, parsedResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(e.key === "Enter")) return [3 /*break*/, 6];
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, axios_1["default"].get(API_URL + "/search/" + selectCl + "/" + encodeURIComponent(query), {
                            headers: {
                                Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs"
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.data];
                case 3:
                    data = _a.sent();
                    parsedResults = data.map(function (item) {
                        return "email" in item ? item : parsePost(item);
                    });
                    setResults(parsedResults);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    setError("Failed to fetch search results");
                    console.error("Error searching:", error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleSearch = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, parsedResults, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!query.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, axios_1["default"].get(API_URL + "/search/" + selectCl + "/" + encodeURIComponent(query), {
                            headers: {
                                Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3NDA0OTkzfQ.EziIP1HOZoU6tUyfSm1T7xhrmYkf0L60ItKo6kSErhs"
                            }
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.data];
                case 3:
                    data = _a.sent();
                    parsedResults = data.map(function (item) {
                        return "email" in item ? item : parsePost(item);
                    });
                    setResults(parsedResults);
                    console.log(parsedResults);
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    setError("Failed to fetch search results");
                    console.error("Error searching:", error_2);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // const renderSearchResult = (result: SearchResult) => {
    //     // This is a ParsedPost
    //     return (
    //         <div key={result._id} className="post-result">
    //             <h3>{result.title}</h3>
    //             <p>Channel: {result.channel}</p>
    //             <p>
    //                 Members: {result.currentMember} / {result.meetingCapacity}
    //             </p>
    //             <p>Date: {result.meetingDate}</p>
    //             <p>
    //                 Time:{" "}
    //                 {result.isTimeFlexible
    //                     ? "Flexible"
    //                     : `${result.meetingStartTime} - ${result.meetingEndTime}`}
    //             </p>
    //             <p>Location: {result.meetingSpot}</p>
    //         </div>
    //     );
    // };
    var handleButtonClick = function (item) {
        setActiveButton(item);
    };
    console.log("searchPage:", results);
    return (React.createElement(React.Fragment, null,
        React.createElement(Header_1["default"], null),
        React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
            React.createElement("section", { className: "mb-10 flex relative" },
                React.createElement(Search_bar_1["default"], { value: query, getValue: getValue, handleKeydown: KeyDown })),
            loading && React.createElement("p", null, "Loading..."),
            error && React.createElement("p", { className: "error" }, error),
            React.createElement("div", { className: "mb-4 flex" }, searchCategory.map(function (category, index) { return (React.createElement(Button_1["default"], { key: index, label: category, color: activeButton === category ? "green" : "grey", size: "mid", margin: "btnMr", onClick: function () { return handleButtonClick(category); } })); })),
            loading && React.createElement("p", null, "Loading..."),
            error && React.createElement("p", { className: "error" }, error),
            activeButton === "포스트" ? (React.createElement(SearchPost_1["default"], { postList: results })) : (React.createElement(SearchUser_1["default"], null)))));
};
exports["default"] = SearchPage;
