import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ratesStore } from "@store/RatesStore";
import { useParams } from "react-router-dom";
import { GoBackButton } from "./GoBackButton";
import useHumanReadableNumber from "@hooks/HumanReadableNumber";
var Details = observer(function () {
    var formatNumbers = useHumanReadableNumber();
    var ticker = useParams().ticker;
    useEffect(function () {
        ratesStore.getDetails(ticker);
    }, [ticker]);
    if (!ratesStore.details)
        return;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "layout" },
            React.createElement("h2", null,
                "Details ",
                ticker,
                " to:"),
            React.createElement(GoBackButton, null),
            React.createElement("div", { className: "table-container" },
                React.createElement("table", { className: "styled-table" },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", { className: "cell ticker" }, "Pare"),
                            React.createElement("th", { className: "cell" }, "Ask"),
                            React.createElement("th", { className: "cell bid" }, "Bid"),
                            React.createElement("th", { className: "cell" }, "24h Diff"),
                            React.createElement("th", { className: "cell" }, "Rate"))),
                    React.createElement("tbody", null, Object.entries(ratesStore.details).map(function (_a) {
                        var currency = _a[0], data = _a[1];
                        return (React.createElement("tr", { key: currency, className: "row" },
                            React.createElement("td", { className: "mobile cell" },
                                ticker.toUpperCase(),
                                " / ",
                                currency.toUpperCase()),
                            React.createElement("td", { className: "mobile cell" }, data.bid.toFixed(2)),
                            React.createElement("td", { className: "mobile cell" }, data.ask.toFixed(2)),
                            React.createElement("td", { style: data.diff24h > 0
                                    ? { color: "green" }
                                    : data.diff24h < 0
                                        ? { color: "red" }
                                        : { color: "black" }, className: "mobile cell" },
                                React.createElement("span", { className: "mobile-show" }, "DIFF"),
                                formatNumbers(data.diff24h.toFixed(2))),
                            React.createElement("td", { className: "mobile-hidden" }, data.rate.toFixed(2))));
                    })))))));
});
export default Details;
