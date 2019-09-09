import React, { useState } from "react";
import HistoryMonthTable from "./HistoryMonthTable";

export default function HistoryMonthDropdown({
  noradNumber,
  objectOrigin,
  yearNumber
}) {
  const [monthChosen, setMonthChosen] = useState("April");

  const months = [
    { name: "JAN", number: 1 },
    { name: "FEB", number: 2 },
    { name: "MAR", number: 3 },
    { name: "APR", number: 4 },
    { name: "MAY", number: 5 },
    { name: "JUN", number: 6 },
    { name: "JUL", number: 7 },
    { name: "AUG", number: 8 },
    { name: "SEP", number: 9 },
    { name: "OCT", number: 10 },
    { name: "NOV", number: 11 },
    { name: "DEC", number: 12 }
  ];

  return (
    <section className="history-month-dropdown">
      {months.map(month => {
        return (
          <div key={month.name} className="history-month-dropdown__row">
            <h1
              onClick={() => {
                setMonthChosen(month.name);
              }}
            >
              <p className="history-month-dropdown__month-text">{month.name}</p>
            </h1>
            {monthChosen === month.name ? (
              <HistoryMonthTable
                noradNumber={noradNumber}
                objectOrigin={objectOrigin}
                yearNumber={yearNumber}
                monthName={month.name}
                monthNumber={month.number}
              />
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
