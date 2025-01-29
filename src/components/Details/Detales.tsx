import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ratesStore } from "@store/RatesStore";
import { useParams } from "react-router-dom";
import { GoBackButton } from "./GoBackButton";
import useHumanReadableNumber from "@hooks/HumanReadableNumber";


const Details = observer(() => {
  const formatNumbers = useHumanReadableNumber();
  const { ticker } = useParams();
  useEffect(() => {
    ratesStore.getDetails(ticker);
  }, [ticker]);

  if (!ratesStore.details) return;
  return (
    <>
      <div className="layout">
        <h2>Details {ticker} to:</h2>
        <GoBackButton />
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
              {Object.entries(ratesStore.details).map(([currency, data]) => (
                <tr key={currency} className="row">
                  <td className="mobile cell">
                    {ticker.toUpperCase()} / {currency.toUpperCase()}
                  </td>
                  <td className="mobile cell">{data.bid.toFixed(2)}</td>
                  <td className="mobile cell">{data.ask.toFixed(2)}</td>
                  <td
                          style={
                            data.diff24h > 0
                              ? { color: "green" }
                              : data.diff24h < 0
                              ? { color: "red" }
                              : { color: "black" }
                          }
                          className="mobile cell"
                        >
                          <span className="mobile-show">DIFF</span>
                          {formatNumbers(data.diff24h.toFixed(2))}
                        </td>
                  <td className="mobile-hidden">{data.rate.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

export default Details;
