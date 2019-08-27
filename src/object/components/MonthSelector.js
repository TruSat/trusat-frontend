import React, { useState } from "react";

export default function MonthSelector({ monthName, monthData }) {
  console.log(monthData);

  const [showMonth, setShowMonth] = useState(false);

  const renderDayTables = () => {
    return <p>day tables here!</p>;
  };

  return (
    <div>
      <h1 onClick={() => setShowMonth(!showMonth)}>{monthName}</h1>
      {showMonth ? renderDayTables() : null}
    </div>
  );
}
