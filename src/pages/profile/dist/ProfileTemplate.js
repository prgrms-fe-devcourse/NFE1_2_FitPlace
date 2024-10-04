"use strict";
exports.__esModule = true;
<<<<<<< HEAD
var react_redux_1 = require("react-redux");
var ProfileWrap_1 = require("../../components/ProfileWrap");
var react_router_dom_1 = require("react-router-dom");
var react_1 = require("react");
var axios_1 = require("axios");
var useTypedSelector = react_redux_1.useSelector;
var ProfileTemplate = function () {
    var _a = react_1.useState(false), isMyProfile = _a[0], setIsMyProfile = _a[1];
    var id = react_router_dom_1.useParams().id;
    var userData = useTypedSelector(function (state) { return state.currentUser; });
    var _b = react_1.useState(null), otherUserData = _b[0], setOtherUserData = _b[1];
    var _c = react_1.useState(null), profileData = _c[0], setProfileData = _c[1];
    react_1.useEffect(function () {
        if (String(userData._id) === String(id)) {
            var parsingData = JSON.parse(userData.fullName);
            setIsMyProfile(true);
            setProfileData({
                fullName: parsingData.fullName,
                birth: parsingData.birth,
                userId: parsingData.userId,
                description: parsingData.description,
                location: parsingData.location
            });
        }
        else {
            axios_1["default"].get("https://kdt.frontend.5th.programmers.co.kr:5009/users/" + id)
                .then(function (res) {
                console.log(res);
                var resData = res.data;
                var parsingData = JSON.parse(resData.fullName);
                setOtherUserData(resData);
                setProfileData({
                    fullName: parsingData.fullName,
                    birth: parsingData.birth,
                    userId: parsingData.userId,
                    description: parsingData.description,
                    location: parsingData.location
                });
            })["catch"](function (err) { return console.error(err); });
        }
    }, [id, userData]);
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
        React.createElement("div", { className: "flex flex-col justify-center items-stretch" },
            React.createElement("div", { className: "flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                React.createElement("div", { id: "profileImg", className: "mx-auto" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: (profileData === null || profileData === void 0 ? void 0 : profileData.fullName) + "\uB2D8\uC758 \uD504\uB85C\uD544 \uC0AC\uC9C4" })),
                React.createElement("div", { className: "mt-2" },
                    React.createElement("p", { className: "text-3xl font-bold" }, profileData === null || profileData === void 0 ? void 0 : profileData.fullName)),
=======
var react_router_dom_1 = require("react-router-dom");
var ProfileWrap_1 = require("../../components/ProfileWrap");
var ProfileTemplate = function () {
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
        React.createElement(react_router_dom_1.Link, { to: './edit' }, "\uC784\uC2DC\uB9AC\uB3D9"),
        React.createElement("div", { className: "flex flex-col justify-center items-stretch" },
            React.createElement("div", { className: "flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                React.createElement("div", { id: "profileImg", className: "mx-auto" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uD504\uB85C\uD544 \uC0AC\uC9C4" })),
                React.createElement("div", { className: "mt-2" },
                    React.createElement("p", { className: "text-3xl font-bold" }, "\uB2C9\uB124\uC784")),
>>>>>>> b955e97a4a4b5aab4b1ceb59b55f81615d3c0755
                React.createElement("div", { className: "mt-6" },
                    React.createElement("p", { className: "text-base font-normal" },
                        React.createElement("span", { className: "font-bold" }, "0"),
                        "\uD68C \uC624\uB298\uC758 \uAC19\uC774 \uC6B4\uB3D9 \uC644\uB8CC!"))),
            React.createElement("div", { className: "profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6" },
<<<<<<< HEAD
                React.createElement(ProfileWrap_1["default"], { category: "\uC18C\uAC1C\uAE00", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.description) ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC9C0\uC5ED", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.location) ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC624\uB298\uC758 \uC77C\uC815", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.description) ? "오늘 할 일정이 없어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uD6C4\uAE30", description: !(profileData === null || profileData === void 0 ? void 0 : profileData.description) ? "아직 작성된 후기가 없어요" : "대충 있을때 이거넣을듯" }),
                isMyProfile
                    ?
                        // 차단 유저 목록
                        React.createElement(ProfileWrap_1["default"], { category: "\uCC28\uB2E8\uC720\uC800 \uBAA9\uB85D", description: userData.likes.length === 0 ? "아직 차단한 유저가 없어요" : "대충 있을때 이거넣을듯" })
                    : null))));
=======
                React.createElement(ProfileWrap_1["default"], { category: "\uC18C\uAC1C\uAE00", description: "\uD5EC\uC2A4, \uC218\uC601, \uBC30\uB4DC\uBBFC\uD134 \uC88B\uC544\uD569\uB2C8\uB2E4 3\uB300 550\uCE69\uB2C8\uB2E4 \uC5B8\uB354\uC544\uBA38 \uCC29\uC6A9\uC911\uC785\uB2C8\uB2E4 \uAC19\uC774 \uC6B4\uB3D9\uD558\uC2E4 \uBD84\uB4E4 \uC5F0\uB77D\uC8FC\uC138\uC694" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC9C0\uC5ED", description: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uAC15\uB0A8\uAD6C \uAC1C\uD3EC\uB3D9" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC624\uB298\uC758 \uC77C\uC815", description: "\uD568\uAED8 5:5 \uD48B\uC0B4\uD558\uC2E4\uBD84 \uAD6C\uD569\uB2C8\uB2E4" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uD6C4\uAE30", description: "\uCE5C\uC808\uD558\uC168\uC2B5\uB2C8\uB2E4" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uCC28\uB2E8\uC720\uC800 \uBAA9\uB85D", description: "\uACE0\uB798\uC0C1\uC5B4" })))));
>>>>>>> b955e97a4a4b5aab4b1ceb59b55f81615d3c0755
};
exports["default"] = ProfileTemplate;
