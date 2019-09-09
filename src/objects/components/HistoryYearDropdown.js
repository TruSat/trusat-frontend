import React, { useState } from "react";
import HistoryMonthDropdown from "./HistoryMonthDropdown";

export default function HistoryTable() {
  const [yearChosen, setYearChosen] = useState("");

  const years = [
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011"
  ];

  return (
    <section className="history-year-dropdown">
      {years.map(year => {
        return (
          <div key={year} className="history-year-dropdown__row">
            <h1
              onClick={() => {
                setYearChosen(year);
              }}
            >
              <p className="history-year-dropdown__year-text">{year}</p>
            </h1>
            {yearChosen === year ? (
              <HistoryMonthDropdown yearNumber={yearChosen} />
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
