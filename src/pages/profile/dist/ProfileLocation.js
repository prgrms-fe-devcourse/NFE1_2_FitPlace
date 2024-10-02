"use strict";
exports.__esModule = true;
var location_1 = require("../../data/location");
var Button_1 = require("../../components/Button");
var react_1 = require("react");
var react_cookie_1 = require("react-cookie");
var react_redux_1 = require("react-redux");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var useTypedSelector = react_redux_1.useSelector;
var ProfileLocation = function () {
    var cookie = new react_cookie_1.Cookies();
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState(0), locaNum = _a[0], setLocaNum = _a[1];
    var _b = react_1.useState(null), cityNum = _b[0], setCityNum = _b[1];
    var _c = react_1.useState(''), myToken = _c[0], setMyToken = _c[1];
    var _d = react_1.useState(''), locaValue = _d[0], setLocaValue = _d[1];
    var _e = react_1.useState(''), cityValue = _e[0], setCityValue = _e[1];
    var myInfo = useTypedSelector(function (state) { return state.currentUser; });
    var _f = react_1.useState(null), myDetailData = _f[0], setMyDetailData = _f[1];
    react_1.useEffect(function () {
        try {
            setMyDetailData(JSON.parse(myInfo.fullName));
        }
        catch (err) {
            alert('잘못된 접근 입니다.');
            navigate('/login');
        }
    }, [myInfo]);
    // 도, 광역시 선택시 시군구 스크롤 최상단으로
    var myRef = react_1.useRef(null);
    var scrollTop = function () {
        if (myRef.current) {
            myRef.current.scrollTop = 0;
        }
    };
    react_1.useEffect(function () {
        setMyToken(cookie.get("token").replace(/bearer\s+/g, ""));
    }, [cookie]);
    var handleEdit = function () {
        var putData = {
            fullName: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.fullName,
            description: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.description,
            birth: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.birth,
            location: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.location,
            userId: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.userId,
            image: myDetailData === null || myDetailData === void 0 ? void 0 : myDetailData.image
        };
        putData.location = locaValue + ' ' + cityValue;
        var submitData = { fullName: JSON.stringify(putData) };
        if (!cityValue || cityValue.length === 0 || cityValue === '') {
            return alert('시군구를 선택하세요');
        }
        else {
            axios_1["default"].put("https://kdt.frontend.5th.programmers.co.kr:5009/settings/update-user", submitData, {
                headers: {
                    Authorization: "bearer " + myToken,
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                if (res.status === 200) {
                    alert('수정이 완료되었습니다');
                    navigate('/');
                }
                else {
                    return null;
                }
            })["catch"](function (err) {
                if (err.status === 401) {
                    alert('올바르지 않은 사용자 입니다.');
                    navigate('/');
                }
                else if (err.status === 404) {
                    alert('올바르지 않은 경로의 접근입니다.');
                    navigate('/');
                }
            });
        }
    };
    return (React.createElement("div", { className: "w-140 min-h-screen bg-white p-3 flex flex-col justify-start relative" },
        React.createElement("div", { className: "edit__head-top" },
            React.createElement("p", { className: "font-bold text-xl" }, "\uC0B4\uACE0 \uC788\uB294 \uC9C0\uC5ED\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694.")),
        React.createElement("div", { className: "edit__head-btm mt-6 h-[calc(68vh)] bg-gray-100" },
            React.createElement("ul", { className: "flex justify-center items-start h-full" },
                React.createElement("li", { className: "w-full text-center text-xl text-locationColor h-full overflow-scroll", style: { scrollbarWidth: "none" } }, location_1.locationList.map(function (province, idx) {
                    return (React.createElement("div", { key: idx, className: "cursor-pointer py-3 hover:bg-gray-200 " + (locaNum === idx ? "text-greenColor font-bold" : null), onClick: function () {
                            setLocaNum(idx);
                            setCityNum(null);
                            scrollTop();
                            setLocaValue(province.name);
                            setCityValue('');
                        } },
                        React.createElement("span", null, province.name)));
                })),
                React.createElement("ul", { className: "w-full text-center text-xl text-locationColor h-full overflow-scroll", style: { scrollbarWidth: "none" }, ref: myRef }, location_1.locationList[locaNum].subArea.map(function (city, idx) {
                    return (React.createElement("div", { key: idx, className: "cursor-pointer py-3 hover:bg-gray-200 " + (cityNum === idx ? "text-greenColor font-bold" : null) + " relative", onClick: function () {
                            setCityNum(idx);
                            setCityValue(city);
                        } },
                        React.createElement("span", null, city),
                        cityNum === idx ? React.createElement("span", null,
                            React.createElement("img", { src: "/src/assets/check.svg", alt: "\uC120\uD0DD\uB418\uC5C8\uC2B5\uB2C8\uB2E4", className: "absolute bottom-1/2 right-12 translate-y-1/2" })) : null));
                })))),
        React.createElement("div", { className: "text-center absolute bottom-8 w-[calc(100%_-_1.5rem)]" },
            React.createElement(Button_1["default"], { label: "\uC800\uC7A5", size: "full", color: "green", onClick: handleEdit }))));
};
exports["default"] = ProfileLocation;
