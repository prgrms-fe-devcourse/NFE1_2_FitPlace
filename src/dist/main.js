"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_tsx_1 = require("./App.tsx");
require("./index.css");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var store_ts_1 = require("./data/store.ts");
var react_query_1 = require("react-query");
var queryClient = new react_query_1.QueryClient();
client_1["default"].createRoot(document.getElementById("root")).render(react_1["default"].createElement(react_redux_1.Provider, { store: store_ts_1["default"] },
    react_1["default"].createElement(react_query_1.QueryClientProvider, { client: queryClient },
        " ",
        react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
            react_1["default"].createElement(App_tsx_1["default"], null)))));
