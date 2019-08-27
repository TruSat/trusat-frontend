import React, { useState } from "react";
import HistoryDayRows from "./HistoryDayRows";

export default function MonthSelector({ objectOrigin, monthName, monthData }) {
  const [showMonth, setShowMonth] = useState(false);

  const renderDayRows = () => {
    return (
      <HistoryDayRows
        objectOrigin={objectOrigin}
        dayData={monthData[monthName]}
      />
    );
  };

  return (
    <div>
      <h1 onClick={() => setShowMonth(!showMonth)}>{monthName}</h1>
      {showMonth ? (
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th />
              <th />
              <th>USER</th>
              <th>QUALITY</th>
              <th>TIME DIFF</th>
              <th>WEIGHT</th>
            </tr>
          </thead>
          <tbody>{renderDayRows()}</tbody>
        </table>
      ) : null}
    </div>
  );
}
