import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROOT } from "../../app/helpers";
import HistoryMonthTable from "./HistoryMonthTable";
import { useObjectsState } from "../../objects/objects-context";

export default function HistoryYearDropdown() {
  const { noradNumber } = useObjectsState();
  const [yearChosen, setYearChosen] = useState("2019");
  const [objectYearHistory, setObjectYearHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const result = await axios.post(
          `${API_ROOT}/object/history`,
          JSON.stringify({
            norad_number: noradNumber,
            year: yearChosen
          })
        );
        console.log(result.data);
        setObjectYearHistory(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (noradNumber) {
      fetchData();
    }
  }, [yearChosen, noradNumber]);

  const renderMonthTables = () => {
    return Object.keys(objectYearHistory).map((monthKey, index) => {
      if (objectYearHistory[monthKey].length !== 0) {
        return (
          <HistoryMonthTable
            key={monthKey}
            monthName={monthKey}
            monthHistory={objectYearHistory[monthKey]}
          />
        );
      }
    });

    // <HistoryMonthTable monthHistory={monthHistory} />
  };

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
                if (year !== yearChosen) {
                  setYearChosen(year);
                } else {
                  setYearChosen("");
                }
              }}
            >
              <p
                className={
                  year === yearChosen
                    ? "history-year-dropdown__year-text--highlight"
                    : "history-year-dropdown__year-text"
                }
              >
                {year}
              </p>
            </h1>
            {yearChosen === year ? renderMonthTables() : null}
          </div>
        );
      })}
    </section>
  );
}
