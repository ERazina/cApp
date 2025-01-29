import React from "react";
import "./App.css";
import { Details } from "@components/Details";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
var List = React.lazy(function () { return import("./components/List/List"); });
function App() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Router, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(List, null) }),
                React.createElement(Route, { path: "/:ticker", element: React.createElement(Details, null) })))));
}
export default App;
