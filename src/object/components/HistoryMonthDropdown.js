import React, { useState } from "react";
import HistoryMonthTable from "./HistoryMonthTable";

export default function HistoryMonthWrapper({ objectOrigin, monthData }) {
  const renderMonthChoices = () => {
    return Object.keys(monthData).map((keyName, index) => (
      <HistoryMonthTable
        objectOrigin={objectOrigin}
        monthName={keyName}
        monthData={monthData}
      />
    ));
  };

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      {monthData ? renderMonthChoices() : null}
    </section>
  );
}
