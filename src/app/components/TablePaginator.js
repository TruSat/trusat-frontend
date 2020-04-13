import React, { Fragment } from "react";

export default function TablePaginator({
  tableDataLength,
  range,
  setRange,
  dataStart,
  setDataStart
}) {
  return (
    <div className="table-paginator">
      <div className="table-paginator__button-wrapper">
        {/* Left nav button */}
        <button
          onClick={() => {
            if (range.start !== 0) {
              setRange(currentRange => ({
                start: currentRange.start - 10,
                end: currentRange.end - 10
              }));
            }

            if (setDataStart && dataStart !== 0 && range.start === 0) {
              setDataStart(dataStart - 200);
            }
          }}
        >
          <p className="table-paginator__button-text">
            {(dataStart === 0 || dataStart === undefined) && range.start === 0
              ? null
              : dataStart !== 0 && range.start === 0
              ? "<< Load Previous"
              : "< Previous"}
          </p>
        </button>
        {/* Middle text to signify position of data being displayed */}
        <p className="table-paginator__middle-text">
          {dataStart
            ? `${dataStart + range.start} - ${
                range.end > tableDataLength
                  ? tableDataLength
                  : `${dataStart + range.end}`
              } of${" "}
          ${dataStart + tableDataLength}`
            : `${range.start + 1}-
          ${range.end > tableDataLength ? tableDataLength : range.end} of${" "}
          ${tableDataLength}`}
        </p>
        {/* Right nav button */}
        <button
          onClick={() => {
            if (range.end < tableDataLength) {
              setRange(currentRange => ({
                start: currentRange.start + 10,
                end: currentRange.end + 10
              }));
            }

            if (setDataStart && range.end >= tableDataLength) {
              setDataStart(dataStart + 200);
              setRange({
                start: 0,
                end: 10
              });
            }
          }}
        >
          {/* Change out "next" text when at end of the data currently being viewed */}
          {range.end >= tableDataLength ? (
            dataStart === undefined ? null : (
              <Fragment>
                {/* Give user option to load more data if current dataset is 200 in length */}
                {tableDataLength === 200 ? (
                  <p className="table-paginator__button-text">
                    Load Next 200 >>
                  </p>
                ) : null}
              </Fragment>
            )
          ) : (
            <p className="table-paginator__button-text">Next ></p>
          )}
        </button>
      </div>
    </div>
  );
}
