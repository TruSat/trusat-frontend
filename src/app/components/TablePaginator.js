import React from "react";

export default function TablePaginator({ tableDataLength, range, setRange }) {
  return (
    <div style={{ margin: "1em", textAlign: "center" }}>
      <p>
        {range.start + 1}-
        {range.end > tableDataLength ? tableDataLength : range.end} of{" "}
        {tableDataLength}
      </p>
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
        Left
      </button>
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
        Right
      </button>
    </div>
  );
}
