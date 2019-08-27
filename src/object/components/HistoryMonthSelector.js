import React, { useState } from "react";
import MonthSelector from "./MonthSelector";

export default function HistoryMonthWrapper({ monthData }) {
  const renderMonthChoices = () => {
    return Object.keys(monthData).map((keyName, index) => (
      <MonthSelector monthName={keyName} monthData={monthData} />
    ));
  };

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      {monthData ? renderMonthChoices() : null}
    </section>
  );
}
