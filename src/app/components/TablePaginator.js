import React from "react";

export default function TablePaginator({ tableDataLength, range, setRange }) {
  return (
    <div className="table-paginator">
      <div className="table-paginator__button-wrapper">
        <button
          onClick={() => {
            if (range.start !== 0) {
              setRange(currentRange => ({
                start: currentRange.start - 10,
                end: currentRange.end - 10
              }));
            }
          }}
        >
          <p className="table-paginator__button-text">{`< Previous`}</p>
        </button>
        <p className="table-paginator__middle-text">
          {range.start + 1}-
          {range.end > tableDataLength ? tableDataLength : range.end} of{" "}
          {tableDataLength}
        </p>
        <button
          onClick={() => {
            if (range.end < tableDataLength) {
              setRange(currentRange => ({
                start: currentRange.start + 10,
                end: currentRange.end + 10
              }));
            }
          }}
        >
          <p className="table-paginator__button-text">{`Next >`}</p>
        </button>
      </div>
    </div>
  );
}
