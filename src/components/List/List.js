import React, { Suspense } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ratesStore } from "@store/RatesStore";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loadingJSON from "@assets/loading.json";
import useHumanReadableNumber from "@hooks/HumanReadableNumber";
import "./List.scss";
var List = observer(function () {
    var navigate = useNavigate();
    var formatNumbers = useHumanReadableNumber();
    var loadingOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingJSON,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    var loading = React.createElement(Lottie, { options: loadingOptions, height: 300, width: 300 });
    var handleRowClick = function (currency) {
        navigate("/".concat(currency));
    };
    useEffect(function () {
        if (!ratesStore.isLoading) {
            ratesStore.fetchRates();
        }
    }, []);
    if (ratesStore.isLoading)
        return React.createElement(Suspense, { fallback: loading });
    else if (ratesStore.error)
        return React.createElement("div", null,
            "Error is: ",
            ratesStore.error);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "layout" },
            React.createElement("h2", { className: "header" }, "Rates Data"),
            React.createElement("div", { className: "table-container" },
                React.createElement("table", { className: "styled-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "cell ticker" }, "Pare"),
                            React.createElement("th", { className: "cell" }, "Ask"),
                            React.createElement("th", { className: "cell bid" }, "Bid"),
                            React.createElement("th", { className: "cell" }, "24h Diff"),
                            React.createElement("th", { className: "cell" }, "Rate"))),
                    React.createElement("tbody", null, Object.entries(ratesStore.rates).map(function (_a) {
                        var currency = _a[0], assetRates = _a[1];
                        return (React.createElement(React.Fragment, { key: currency }, Object.entries(assetRates).map(function (_a) {
                            var asset = _a[0], rateDetails = _a[1];
                            return (React.createElement("tr", { className: "row", key: asset, onClick: function () { return handleRowClick(currency); } },
                                React.createElement("td", { className: "cell ticker" },
                                    currency.toUpperCase(),
                                    " / ",
                                    asset.toUpperCase()),
                                React.createElement("td", { className: "mobile cell" },
                                    React.createElement("span", { className: "mobile-show" }, "ASK"),
                                    rateDetails.ask.toFixed(2)),
                                React.createElement("td", { className: "mobile cell" },
                                    React.createElement("span", { className: "mobile-show" }, "BID"),
                                    rateDetails.bid.toFixed(2)),
                                React.createElement("td", { style: rateDetails.diff24h > 0
                                        ? { color: "green" }
                                        : rateDetails.diff24h < 0
                                            ? { color: "red" }
                                            : { color: "black" }, className: "mobile cell" },
                                    React.createElement("span", { className: "mobile-show" }, "DIFF"),
                                    formatNumbers(rateDetails.diff24h.toFixed(2))),
                                React.createElement("td", { className: "mobile-hidden" }, rateDetails.rate.toFixed(2))));
                        })));
                    })))))));
});
export default List;
