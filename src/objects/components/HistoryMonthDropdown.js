import React, { useState } from "react";
import HistoryMonthTable from "./HistoryMonthTable";

export default function HistoryMonthDropdown({
  noradNumber,
  objectOrigin,
  yearNumber
}) {
  const [monthChosen, setMonthChosen] = useState("");

  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", nunber: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 }
  ];

  return (
    <section style={{ display: "flex", flexDirection: "column" }}>
      {months.map(month => {
        return (
          <div key={month.name} style={{ border: "1px solid blue" }}>
            <h1
              onClick={() => {
                setMonthChosen(month.name);
              }}
            >
              {month.name}
            </h1>
            {monthChosen === month.name ? (
              <HistoryMonthTable
                noradNumber={noradNumber}
                objectOrigin={objectOrigin}
                yearNumber={yearNumber}
                monthNumber={month.number}
              />
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
