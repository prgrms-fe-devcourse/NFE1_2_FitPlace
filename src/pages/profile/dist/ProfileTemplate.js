"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var ProfileWrap_1 = require("../../components/ProfileWrap");
var useTypedSelector = react_redux_1.useSelector;
var ProfileTemplate = function () {
    var userData = useTypedSelector(function (state) { return state.currentUser; });
    var profileData = JSON.parse(userData.fullName);
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
        React.createElement("div", { className: "flex flex-col justify-center items-stretch" },
            React.createElement("div", { className: "flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                React.createElement("div", { id: "profileImg", className: "mx-auto" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: profileData.fullName + "\uB2D8\uC758 \uD504\uB85C\uD544 \uC0AC\uC9C4" })),
                React.createElement("div", { className: "mt-2" },
                    React.createElement("p", { className: "text-3xl font-bold" }, profileData.fullName)),
                React.createElement("div", { className: "mt-6" },
                    React.createElement("p", { className: "text-base font-normal" },
                        React.createElement("span", { className: "font-bold" }, "0"),
                        "\uD68C \uC624\uB298\uC758 \uAC19\uC774 \uC6B4\uB3D9 \uC644\uB8CC!"))),
            React.createElement("div", { className: "profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6" },
                React.createElement(ProfileWrap_1["default"], { category: "\uC18C\uAC1C\uAE00", description: !profileData.description ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC9C0\uC5ED", description: !profileData.location ? "아직 작성하지 않았어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC624\uB298\uC758 \uC77C\uC815", description: !profileData.description ? "오늘 할 일정이 없어요" : "대충 있을때 이거 넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uD6C4\uAE30", description: !profileData.description ? "아직 작성된 후기가 없어요" : "대충 있을때 이거넣을듯" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uCC28\uB2E8\uC720\uC800 \uBAA9\uB85D", description: userData.likes.length === 0 ? "아직 차단한 유저가 없어요" : "대충 있을때 이거넣을듯" })))));
};
exports["default"] = ProfileTemplate;
