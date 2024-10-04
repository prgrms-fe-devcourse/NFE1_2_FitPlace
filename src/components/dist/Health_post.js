"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Health_post = function (_a) {
    var title = _a.title, channel_name = _a.channel_name, id = _a.id;
    var titleObject;
    // title이 JSON 형식인지 확인하는 함수
    var isValidJson = function (str) {
        if (typeof str !== "string")
            return false;
        try {
            JSON.parse(str);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    try {
        // title이 유효한 JSON인지 확인 후 파싱
        if (isValidJson(title)) {
            titleObject = JSON.parse(title);
            console.log("Parsing successful:", titleObject);
        }
        else {
            // title이 JSON이 아니면 그대로 사용
            titleObject = { title: title };
        }
    }
    catch (error) {
        console.error("JSON 파싱 오류:", error);
        titleObject = { title: title };
    }
    console.log("모임인원: ", title.meetingCapacity);
    return (react_1["default"].createElement(react_router_dom_1.Link, { to: "/notion/" + id },
        react_1["default"].createElement("button", { className: "bg-gray-100 h-32 w-full rounded-md shadow-lg mb-5 p-5 flex flex-col transition-transform duration-300 ease-in-out hover:bg-gray-200 hover:shadow-xl" },
            react_1["default"].createElement("p", { className: "font-bold text-lg mb-3" }, titleObject.title || "제목 없음"),
            react_1["default"].createElement("div", { className: "mb-2 text-sm flex" },
                titleObject.currentMember.length ===
                    titleObject.meetingCapacity ? (react_1["default"].createElement("p", { className: "text-rose-600\t font-bold" }, "\uBAA8\uC9D1 \uB9C8\uAC10")) : (react_1["default"].createElement("p", { className: "text-lime-400 font-bold" }, "\uBAA8\uC9D1 \uC911")),
                react_1["default"].createElement("span", { className: "mx-3 opacity-5" }, "|"),
                titleObject.meetingTime || "기간 없음"),
            react_1["default"].createElement("div", { className: "text-sm flex" },
                titleObject.meetingSpot || "장소 없음",
                react_1["default"].createElement("span", { className: "mx-3 opacity-5" }, "|"),
                titleObject.currentMember.length || 0,
                "\uBA85 /",
                " ",
                titleObject.meetingCapacity || 0,
                "\uBA85",
                react_1["default"].createElement("span", { className: "mx-3 opacity-5" }, "|"),
                channel_name || "기타"))));
};
exports["default"] = Health_post;
