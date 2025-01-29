import React, { useEffect } from "react";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import { ratesStore } from "@store/RatesStore";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Ask",
//     dataIndex: "ask",
//     key: "ask",
//   },
//   {
//     title: "Bid",
//     dataIndex: "bid",
//     key: "bid",
//   },
//   {
//     title: "diff24h",
//     dataIndex: "diff24h",
//     key: "diff24h",
//   },
//   {
//     title: "Rate",
//     dataIndex: "rate",
//     key: "rate",
//   },
// ];

const StyledTable = observer(() => {
  useEffect(() => {
    if (Object.keys(ratesStore.rates).length === 0 && !ratesStore.isLoading) {
      ratesStore.fetchRates();
    }
  }, []);

  const dataSource = Object.entries(ratesStore.rates).map(
    ([key, value], index) => ({
      key: index,
      name: key,
      ...value,
    })
  );

  const columns = Object.keys(ratesStore.rates || {}).map(key => ({
    title: key.toUpperCase(),
    dataIndex: key,
    key,
  }));

  console.log(columns)

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={ratesStore.isLoading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
    />
  );
});

export default StyledTable;
