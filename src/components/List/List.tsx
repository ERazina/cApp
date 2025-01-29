import React, { Suspense } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ratesStore } from "@store/RatesStore";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loadingJSON from "@assets/loading.json";
import useHumanReadableNumber from "@hooks/HumanReadableNumber";
import "./List.scss";

const List = observer(() => {
  const navigate = useNavigate();
  const formatNumbers = useHumanReadableNumber();
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingJSON,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const loading = <Lottie options={loadingOptions} height={300} width={300} />;

  const handleRowClick = (currency: string) => {
    navigate(`/${currency}`);
  };

  useEffect(() => {
    if (!ratesStore.isLoading) {
      ratesStore.fetchRates();
    }
  }, []);

  if (ratesStore.isLoading) return <Suspense fallback={loading} />;
  else if (ratesStore.error) return <div>Error is: {ratesStore.error}</div>;

  return (
    <>
      <div className="layout">
        <h2 className="header">Rates Data</h2>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th className="cell ticker">Pare</th>
                <th className="cell">Ask</th>
                <th className="cell bid">Bid</th>
                <th className="cell">24h Diff</th>
                <th className="cell">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ratesStore.rates).map(
                ([currency, assetRates]) => (
                  <React.Fragment key={currency}>
                    {Object.entries(assetRates).map(([asset, rateDetails]) => (
                      <tr
                        className="row"
                        key={asset}
                        onClick={() => handleRowClick(currency)}
                      >
                        <td className="cell ticker">
                          {currency.toUpperCase()} / {asset.toUpperCase()}
                        </td>
                        <td className="mobile cell">
                          <span className="mobile-show">ASK</span>
                          {rateDetails.ask.toFixed(2)}
                        </td>
                        <td className="mobile cell">
                          <span className="mobile-show">BID</span>
                          {rateDetails.bid.toFixed(2)}
                        </td>
                        <td
                          style={
                            rateDetails.diff24h > 0
                              ? { color: "green" }
                              : rateDetails.diff24h < 0
                              ? { color: "red" }
                              : { color: "black" }
                          }
                          className="mobile cell"
                        >
                          <span className="mobile-show">DIFF</span>
                          {formatNumbers(rateDetails.diff24h.toFixed(2))}
                        </td>
                        <td className="mobile-hidden">
                          {rateDetails.rate.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

export default List;
