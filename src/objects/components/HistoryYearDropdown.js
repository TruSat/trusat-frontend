import React, { useState, useEffect } from "react";
import { useTrusatGetApi } from "../../app/app-helpers";
import HistoryMonthTable from "./HistoryMonthTable";
import { useObjectsState } from "../../objects/objects-context";
import Spinner from "../../app/components/Spinner";

export default function HistoryYearDropdown() {
  const { noradNumber, yearLaunched } = useObjectsState();
  const [yearChosen, setYearChosen] = useState(null);
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();
  // Used to render the rows of years from present year to the year of launch
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (noradNumber && yearChosen) {
      doFetch(`/object/history?year=${yearChosen}&norad_number=${noradNumber}`);
    }
    if (yearChosen === null) {
      setYearChosen(currentYear);
    }
  }, [noradNumber, yearLaunched, yearChosen, doFetch, data, currentYear]);

  const renderMonthTables = () => {
    return Object.keys(data)
      .filter((monthKey) => data[monthKey])
      .map((monthKey) => (
        <HistoryMonthTable
          key={monthKey}
          monthName={monthKey}
          monthData={data[monthKey]}
        />
      ));
  };

  const yearRows = [];

  for (let i = currentYear; i >= yearLaunched && i >= 1998; i--) {
    yearRows.push(
      <div key={i} className="history-year-dropdown__row">
        <h1
          onClick={() => {
            if (i !== yearChosen) {
              setYearChosen(i);
            } else {
              setYearChosen("");
            }
          }}
        >
          <p
            className={
              i === yearChosen
                ? "history-year-dropdown__year-text--highlight"
                : "history-year-dropdown__year-text"
            }
          >
            {i}
          </p>
        </h1>
        {yearChosen === i ? renderMonthTables() : null}
      </div>
    );
  }

  return isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <section className="history-year-dropdown">{yearRows}</section>
  );
}
