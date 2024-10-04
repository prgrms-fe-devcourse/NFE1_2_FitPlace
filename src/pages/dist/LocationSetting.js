"use strict";
exports.__esModule = true;
var react_1 = require("react");
var KakaoMap_1 = require("./KakaoMap");
var Header_1 = require("../components/Header");
var react_router_dom_1 = require("react-router-dom");
var LocationSetting = function () {
    var _a = react_1.useState(""), inputValue = _a[0], setInputValue = _a[1];
    var _b = react_1.useState(false), isMarkerFixed = _b[0], setIsMarkerFixed = _b[1];
    var _c = react_1.useState(true), isEditable = _c[0], setIsEditable = _c[1];
    var _d = react_1.useState({
        lat: 37.556135,
        lng: 126.972608
    }), currentPosition = _d[0], setCurrentPosition = _d[1];
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        var savedLocation = sessionStorage.getItem("selectedLocation");
        if (savedLocation) {
            var locationData = JSON.parse(savedLocation);
            setInputValue(locationData.address);
            setCurrentPosition({
                lat: locationData.lat,
                lng: locationData.lng
            });
            setIsMarkerFixed(true);
            setIsEditable(false);
        }
    }, []);
    var handleSave = function () {
        if (inputValue.trim() === "") {
            alert("장소를 입력해주세요.");
        }
        else {
            setIsMarkerFixed(true);
            setIsEditable(false);
            sessionStorage.setItem("selectedLocation", JSON.stringify({
                address: inputValue,
                lat: currentPosition.lat,
                lng: currentPosition.lng
            }));
            navigate("/notionAdd");
        }
    };
    var handleEdit = function () {
        setIsMarkerFixed(false);
        setIsEditable(true);
    };
    var handleMapCenterChange = function (lat, lng) {
        setCurrentPosition({ lat: lat, lng: lng });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement("div", { className: "w-140 min-h-screen mx-auto bg-white" },
            react_1["default"].createElement("div", { className: "pt-5 px-4 pb-2" },
                react_1["default"].createElement("h2", { className: "text-xl font-bold" }, "\uC7A5\uC18C\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.")),
            react_1["default"].createElement("div", { className: "p-4" },
                react_1["default"].createElement("input", { type: "text", placeholder: "\uC785\uB825\uD574\uC8FC\uC138\uC694.", className: "w-full p-4 bg-[#F6F6F6] text-[#666666] border border-gray-300 rounded-lg mb-6", value: inputValue, onChange: function (e) { return setInputValue(e.target.value); }, disabled: !isEditable }),
                react_1["default"].createElement("div", { className: "mb-8" },
                    react_1["default"].createElement(KakaoMap_1["default"], { isMarkerFixed: isMarkerFixed, location: currentPosition, onCenterChange: handleMapCenterChange })),
                isEditable ? (react_1["default"].createElement("button", { className: "w-full bg-[#AFE327] text-white p-4 rounded-lg", onClick: handleSave }, "\uC800\uC7A5")) : (react_1["default"].createElement("button", { className: "w-full bg-gray-400 text-white p-4 rounded-lg", onClick: handleEdit }, "\uC218\uC815\uD558\uAE30"))))));
};
exports["default"] = LocationSetting;
