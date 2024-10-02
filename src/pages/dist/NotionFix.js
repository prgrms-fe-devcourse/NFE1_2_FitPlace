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
var Button_1 = require("../components/Button");
var Header_1 = require("../components/Header");
var NotionCategory_1 = require("../components/NotionCategory");
var KakaoMap_1 = require("./KakaoMap");
var react_router_dom_1 = require("react-router-dom");
var react_router_dom_2 = require("react-router-dom");
var INITIAL_FORM_STATE = {
    title: "",
    channel: "",
    currentMember: 0,
    meetingCapacity: 0,
    meetingDate: "",
    meetingStartTime: "",
    meetingEndTime: "",
    isTimeFlexible: false,
    meetingSpot: "",
    images: [],
    meetingInfo: ""
};
var API_URL = "https://kdt.frontend.5th.programmers.co.kr:5009";
var CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
var UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
var NotionFix = function () {
    var id = react_router_dom_2.useParams().id;
    var _a = react_1.useState(INITIAL_FORM_STATE), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(null), selectedLocation = _b[0], setSelectedLocation = _b[1];
    var _c = react_1.useState([]), channels = _c[0], setChannels = _c[1];
    //이미지 업로드 부분(충돌 방지 주석)---------------------------------------------------------------
    var _d = react_1.useState(null), previewUrl = _d[0], setPreviewUrl = _d[1];
    var _e = react_1.useState([]), imageFiles = _e[0], setImageFiles = _e[1]; // 선택된 파일들
    var _f = react_1.useState([]), imageUrls = _f[0], setImageUrls = _f[1]; // 업로드된 이미지 URL들
    var handleFileChange = react_1.useCallback(function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var files, newFiles_2, newUrls_1, formData_1, _i, newFiles_1, file, response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    files = e.target.files;
                    if (!files) return [3 /*break*/, 8];
                    newFiles_2 = Array.from(files);
                    setImageFiles(function (prev) { return __spreadArrays(prev, newFiles_2); }); // 기존 파일에 추가
                    newUrls_1 = [];
                    formData_1 = new FormData();
                    _i = 0, newFiles_1 = newFiles_2;
                    _a.label = 1;
                case 1:
                    if (!(_i < newFiles_1.length)) return [3 /*break*/, 7];
                    file = newFiles_1[_i];
                    formData_1.append("file", file);
                    formData_1.append("upload_preset", UPLOAD_PRESET);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, fetch("https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/image/upload", {
                            method: "POST",
                            body: formData_1
                        })];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 4:
                    data = _a.sent();
                    newUrls_1.push(data.secure_url); // 업로드된 이미지 URL 추가
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("이미지 업로드 실패:", error_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    setImageUrls(function (prev) { return __spreadArrays(prev, newUrls_1); }); // 기존 URL에 추가
                    setFormData(function (prev) { return (__assign(__assign({}, prev), { images: __spreadArrays(prev.images, newUrls_1) })); }); // 폼 데이터에 이미지 URL 배열 저장
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    }); }, []);
    // 이미지 업로드 부분 여기까지---------------------------------------------------------------
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        fetchChannels();
        var savedLocation = sessionStorage.getItem("selectedLocation");
        if (savedLocation) {
            var locationData_1 = JSON.parse(savedLocation);
            setSelectedLocation(locationData_1);
            setFormData(function (prev) { return (__assign(__assign({}, prev), { meetingSpot: locationData_1.address })); });
        }
    }, []);
    var fetchChannels = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(API_URL + "/channels")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: " + response.status);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setChannels(data);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching channels:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleChange = react_1.useCallback(function (e) {
        var _a = e.target, name = _a.name, value = _a.value, type = _a.type;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = type === "number" ? parseInt(value, 10) : value, _a)));
        });
    }, []);
    var handleCategorySelect = react_1.useCallback(function (category) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { channel: category })); });
    }, []);
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var channelId, meetingTime, customJsonData, submitData, response, data, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    channelId = ((_a = channels.find(function (ch) { return ch.name === formData.channel; })) === null || _a === void 0 ? void 0 : _a._id) || "";
                    meetingTime = formData.isTimeFlexible
                        ? formData.meetingDate + ", \uC2DC\uAC04 \uBB34\uAD00"
                        : formData.meetingDate + " " + formData.meetingStartTime + " - " + formData.meetingEndTime;
                    customJsonData = {
                        title: formData.title,
                        currentMember: formData.currentMember,
                        meetingCapacity: formData.meetingCapacity,
                        meetingTime: meetingTime,
                        meetingSpot: formData.meetingSpot,
                        channel: formData.channel,
                        image: formData.images
                    };
                    submitData = new FormData();
                    submitData.append("title", JSON.stringify(customJsonData));
                    submitData.append("channelId", channelId);
                    submitData.append("postId", id);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(API_URL + "/posts/update", {
                            method: "PUT",
                            headers: {
                                Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZWRiYTRkN2M1NGYyMTI4ZTQ2Y2NlNSIsImVtYWlsIjoiYWRtaW5AcHJvZ3JhbW1lcnMuY28ua3IifSwiaWF0IjoxNzI3Mzk3NTY0fQ.ziDMvpbQF6K61P2POdELAiyLocTIMZ7IZGbe8ZiYlqg"
                            },
                            body: submitData
                        })];
                case 2:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error : " + response.status);
                    }
                    navigate("/notion/" + id);
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    console.log("Post", data);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    console.log(submitData);
                    console.error("Error: ", error_3 instanceof Error ? error_3.message : String(error_3));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleLocationClick = function () {
        navigate("/map");
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: "bg-white w-[640px] h-full" },
            react_1["default"].createElement("form", { className: "m-5" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "title", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC774\uB984"),
                    react_1["default"].createElement("input", { type: "text", id: "title", name: "title", value: formData.title, onChange: handleChange, placeholder: "\uBAA8\uC784 \uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "meetingCapacity", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC778\uC6D0"),
                    react_1["default"].createElement("input", { type: "number", id: "meetingCapacity", name: "meetingCapacity", value: formData.meetingCapacity, onChange: handleChange, placeholder: "\uBAA8\uC784 \uC778\uC6D0\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h3", { className: "font-bold text-xl mt-6" }, "\uC6B4\uB3D9 \uC885\uBAA9"),
                    react_1["default"].createElement("div", { className: "mt-2.5" },
                        react_1["default"].createElement(NotionCategory_1["default"], { onSelect: handleCategorySelect }))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "meetingDate", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uB0A0\uC9DC"),
                    react_1["default"].createElement("input", { type: "date", id: "meetingDate", name: "meetingDate", value: formData.meetingDate, onChange: handleChange, className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "isTimeFlexible", className: "flex items-center font-bold text-xl mt-6" },
                        react_1["default"].createElement("input", { type: "checkbox", id: "isTimeFlexible", name: "isTimeFlexible", checked: formData.isTimeFlexible, onChange: handleChange, className: "mr-2" }),
                        "\uC2DC\uAC04 \uBB34\uAD00")),
                !formData.isTimeFlexible && (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "meetingStartTime", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC2DC\uC791 \uC2DC\uAC04"),
                        react_1["default"].createElement("input", { type: "time", id: "meetingStartTime", name: "meetingStartTime", value: formData.meetingStartTime, onChange: handleChange, className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("label", { htmlFor: "meetingEndTime", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC885\uB8CC \uC2DC\uAC04"),
                        react_1["default"].createElement("input", { type: "time", id: "meetingEndTime", name: "meetingEndTime", value: formData.meetingEndTime, onChange: handleChange, className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "meetingSpot", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC7A5\uC18C"),
                    react_1["default"].createElement("div", { className: "cursor-pointer relative mt-2.5 border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] flex items-center px-3", onClick: handleLocationClick },
                        react_1["default"].createElement("span", null, (selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.address) || "모임 장소를 입력해주세요."))),
                selectedLocation && (react_1["default"].createElement("div", { className: "mt-4" },
                    react_1["default"].createElement(KakaoMap_1["default"], { isMarkerFixed: true, location: selectedLocation, style: { height: "300px" } }))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("label", { htmlFor: "meetingInfo", className: "flex font-bold text-xl mt-6" }, "\uBAA8\uC784 \uC124\uBA85"),
                    react_1["default"].createElement("input", { type: "text", id: "meetingInfo", name: "meetingInfo", value: formData.meetingInfo, onChange: handleChange, placeholder: "\uBAA8\uC784 \uC124\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", className: "border-2 border-solid border-[#e8e8e8] w-[600px] h-[45px] mt-2.5 text-lg pl-2.5" })),
                react_1["default"].createElement("div", { className: "mb-6" },
                    react_1["default"].createElement("p", { className: "font-bold text-xl mt-6" }, "\uC0AC\uC9C4 \uB4F1\uB85D"),
                    react_1["default"].createElement("div", { className: "flex flex-wrap" },
                        imageUrls.map(function (url, index) { return (react_1["default"].createElement("img", { key: index, src: url, alt: "uploaded-" + index, className: "w-[160px] h-[140px] mt-4" })); }),
                        react_1["default"].createElement("label", { htmlFor: "image", className: "w-[160px] h-[140px] border-2 border-solid rounded text-[#A7E30A] text-xl flex justify-center items-center relative mt-4" }, "+ \uC0AC\uC9C4 \uC5C5\uB85C\uB4DC"),
                        react_1["default"].createElement("input", { type: "file", id: "image", name: "image", accept: "image/*", onChange: handleFileChange, className: "absolute hidden" }))),
                imageUrls && imageUrls.length > 0 && (react_1["default"].createElement("div", { className: "flex flex-col items-center" },
                    react_1["default"].createElement("button", { className: "w-1/2 bg-gray-300 my-3 h-10 text-sm hover:bg-gray-400 hover:rounded-2xl transition-all", onClick: function () { return setImageUrls([]); } }, "\uC0AC\uC9C4 \uCD08\uAE30\uD654"))),
                react_1["default"].createElement(Button_1["default"], { label: "\uBAA8\uC784 \uC815\uBCF4 \uC218\uC815\uD558\uAE30", size: "full", color: "green", onClick: handleSubmit })))));
};
exports["default"] = NotionFix;
