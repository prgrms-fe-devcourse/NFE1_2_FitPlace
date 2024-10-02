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
var Button_1 = require("../../components/Button");
var axios_1 = require("axios");
var react_cookie_1 = require("react-cookie");
var ProfileImg = function () {
    var cookie = new react_cookie_1.Cookies();
    var _a = react_1.useState(''), imgUrl = _a[0], setImgUrl = _a[1];
    var _b = react_1.useState(''), myToken = _b[0], setMyToken = _b[1];
    react_1.useEffect(function () {
        setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
    }, [cookie]);
    var handleImgUpload = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var file, formData, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!e.target.files) return [3 /*break*/, 1];
                    return [2 /*return*/];
                case 1:
                    file = e.target.files[0];
                    formData = new FormData();
                    formData.append('file', file);
                    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
                    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1["default"].post("https://api.cloudinary.com/v1_1/" + import.meta.env.VITE_CLOUD_NAME + "/upload", formData)];
                case 3:
                    response = _a.sent();
                    setImgUrl(response.data.secure_url);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        imgUrlToBinary(imgUrl).then(function (binaryData) {
            console.log(imgUrl);
            console.log(binaryData);
            if (binaryData) {
                postBinaryImg(binaryData);
            }
        });
    }, [imgUrl]);
    var imgUrlToBinary = function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var response, blob_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].get(url, { responseType: 'blob' })];
                case 1:
                    response = _a.sent();
                    blob_1 = response.data;
                    return [2 /*return*/, new Promise(function (res, rej) {
                            var reader = new FileReader();
                            reader.onloadend = function () { return res(reader.result); };
                            reader.onerror = rej;
                            reader.readAsDataURL(blob_1);
                        })];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var postBinaryImg = function (binaryData) { return __awaiter(void 0, void 0, void 0, function () {
        var response, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1["default"].post('https://kdt.frontend.5th.programmers.co.kr:5009/users/upload-photo', {
                            isCover: false,
                            image: binaryData
                        }, {
                            headers: {
                                Authorization: "bearer " + myToken
                            }
                        })];
                case 1:
                    response = _a.sent();
                    console.log(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("form", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uD504\uB85C\uD544 \uC0AC\uC9C4\uC744 \uB4F1\uB85D\uD574\uC8FC\uC138\uC694."),
            React.createElement("p", { className: "font-normal text-sm mt-2" }, "\uCD5C\uB300 2\uC7A5\uAE4C\uC9C0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC5B4\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6" },
            React.createElement("ul", { className: "flex justify-start items-start flex-wrap gap-4" },
                React.createElement("li", { className: "w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uC608\uC2DC\uC774\uBBF8\uC9C0", className: "w-full h-full object-cover absolute" }),
                    React.createElement("p", { className: "absolute top-0 right-0 cursor-pointer" }, "\u274C")),
                React.createElement("li", { className: "w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uC608\uC2DC\uC774\uBBF8\uC9C0", className: "w-full h-full object-cover absolute" }),
                    React.createElement("p", { className: "absolute top-0 right-0 cursor-pointer" }, "\u274C")),
                React.createElement("li", { className: "bg-gray-100 hover:bg-gray-200 w-[calc(33.33333%_-_1rem)] relative rounded shadow after:block after:pb-100P" },
                    React.createElement("label", { htmlFor: "imgUploadInput", className: "w-full h-full absolute flex justify-center items-center cursor-pointer" },
                        React.createElement("p", { className: "text-greenColor font-bold text-xl" }, "+ \uC0AC\uC9C4 \uC5C5\uB85C\uB4DC")),
                    React.createElement("input", { type: "file", name: "", id: "imgUploadInput", className: "hidden", accept: "image/jpeg, image/png, image/webp", onChange: handleImgUpload })))),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green" }))));
};
exports["default"] = ProfileImg;
