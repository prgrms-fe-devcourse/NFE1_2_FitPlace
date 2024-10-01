"use strict";
exports.__esModule = true;
var react_redux_1 = require("react-redux");
var ProfileWrap_1 = require("../../components/ProfileWrap");
var ProfileTemplate = function () {
    var user = react_redux_1.useSelector(function (state) { return state; });
    console.log(user);
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3" },
        React.createElement("div", { className: "flex flex-col justify-center items-stretch" },
            React.createElement("div", { className: "flex flex-col justify-center items-stretch text-center pt-8 pb-6 bg-gray-100 hover:bg-gray-200 rounded-lg drop-shadow" },
                React.createElement("div", { id: "profileImg", className: "mx-auto" },
                    React.createElement("img", { src: "/src/assets/defaultProfileImg.svg", alt: "\uD504\uB85C\uD544 \uC0AC\uC9C4" })),
                React.createElement("div", { className: "mt-2" },
                    React.createElement("p", { className: "text-3xl font-bold" }, "\uB2C9\uB124\uC784")),
                React.createElement("div", { className: "mt-6" },
                    React.createElement("p", { className: "text-base font-normal" },
                        React.createElement("span", { className: "font-bold" }, "0"),
                        "\uD68C \uC624\uB298\uC758 \uAC19\uC774 \uC6B4\uB3D9 \uC644\uB8CC!"))),
            React.createElement("div", { className: "profile__bottom flex flex-col justify-center items-stretch gap-5 mt-6" },
                React.createElement(ProfileWrap_1["default"], { category: "\uC18C\uAC1C\uAE00", description: "\uD5EC\uC2A4, \uC218\uC601, \uBC30\uB4DC\uBBFC\uD134 \uC88B\uC544\uD569\uB2C8\uB2E4 3\uB300 550\uCE69\uB2C8\uB2E4 \uC5B8\uB354\uC544\uBA38 \uCC29\uC6A9\uC911\uC785\uB2C8\uB2E4 \uAC19\uC774 \uC6B4\uB3D9\uD558\uC2E4 \uBD84\uB4E4 \uC5F0\uB77D\uC8FC\uC138\uC694" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC9C0\uC5ED", description: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC \uAC15\uB0A8\uAD6C \uAC1C\uD3EC\uB3D9" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uC624\uB298\uC758 \uC77C\uC815", description: "\uD568\uAED8 5:5 \uD48B\uC0B4\uD558\uC2E4\uBD84 \uAD6C\uD569\uB2C8\uB2E4" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uD6C4\uAE30", description: "\uCE5C\uC808\uD558\uC168\uC2B5\uB2C8\uB2E4" }),
                React.createElement(ProfileWrap_1["default"], { category: "\uCC28\uB2E8\uC720\uC800 \uBAA9\uB85D", description: "\uACE0\uB798\uC0C1\uC5B4" })))));
};
exports["default"] = ProfileTemplate;
