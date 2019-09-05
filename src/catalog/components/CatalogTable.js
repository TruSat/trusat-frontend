import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../app/components/Spinner";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";
import ObjectBadge from "../../assets/ObjectBadge.svg";
import { renderFlag } from "../../app/helpers";

export default function CatalogTable({ catalogFilter, range, setRange }) {
  // const { jwt } = useAuthState();
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setShowTable(false);
    if (catalogFilter) {
      // TODO - ask Kenan should this be a post request, sending JWT?
      // Or are we avoiding persinalized catalog for now?
      axios
        .get(`https://api.consensys.space:8080/catalog/${catalogFilter}`)
        .then(result => {
          setTableData(result.data);
          console.log(result.data);
          setShowTable(true);
        })
        .catch(err => {
          console.log(err);
          setTableData([]);
        });
    }
  }, [catalogFilter, setTableData]);

  const renderCatalogTable = () => {
    const { start, end } = range;
    const rangeData = tableData.slice(start, end);

    return rangeData.map(obj => (
      <NavLink
        key={rangeData.indexOf(obj)}
        style={{
          color: "white",
          textDecoration: "none"
        }}
        to={`/object/${obj.object_norad_number}`}
      >
        <div className="table__row">
          <div className="table__badge-name-wrapper">
            <img
              style={{ marginLeft: "-35px" }}
              src={ObjectBadge}
              alt="Object Badge"
            ></img>
            {catalogFilter === "priorities" ? (
              <p>
                &nbsp;
                {tableData.indexOf(obj) + 1}
                &nbsp;
                {obj.object_name}
              </p>
            ) : (
              <p>&nbsp;{obj.object_name}</p>
            )}
          </div>

          <div className="table__center-wrapper">
            {renderFlag(obj.object_origin)}
            &nbsp;
            <p className="table__small-text">{obj.object_primary_purpose}</p>
          </div>

          <div className="table__center-wrapper">
            <p className="table__small-text">{obj.object_type}</p>
            &nbsp;
            <p className="table__small-text"> {obj.object_secondary_purpose}</p>
          </div>

          <div className="table__quality-wrapper">
            <p className="table__small-text">
              {obj.object_observation_quality}
            </p>
          </div>

          <div className="table__spotted-by-wrapper">
            <p className="table__small-text">
              {`last spotted `}
              {obj.time_last_tracked} {` by `}
              {obj.username_last_tracked}
            </p>
          </div>
        </div>
      </NavLink>
    ));
  };

  return showTable ? (
    <React.Fragment>
      <div className="table__wrapper">{renderCatalogTable()}</div>

      <div style={{ margin: "1em", textAlign: "center" }}>
        <p>
          {range.start + 1}-
          {range.end > tableData.length ? tableData.length : range.end} of{" "}
          {tableData.length}
        </p>
        <button
          onClick={() => {
            if (range.start !== 0) {
              setRange(currentRange => ({
                start: currentRange.start - 20,
                end: currentRange.end - 20
              }));
            }
          }}
        >
          Left
        </button>
        <button
          onClick={() => {
            if (range.end < tableData.length) {
              setRange(currentRange => ({
                start: currentRange.start + 20,
                end: currentRange.end + 20
              }));
            }
          }}
        >
          Right
        </button>
      </div>
    </React.Fragment>
  ) : (
    <Spinner />
  );
}

// GET request
// /catalog/priorities
// limit to 100
// sorted by priority
const priorities = [
  {
    object_norad_number: "12345", // This is not rendered but will be used to create the route for the "object view"
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_primary_purpose: "military",
    object_secondary_purpose: "communications",
    object_observation_quality: "66",
    time_last_tracked: "1565803593926", // timestamp
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_norad_number: "12345",
    object_name: "abrixas rocket",
    object_origin: "usa",
    object_type: "satelitte",
    object_primary_purpose: "military",
    object_secondary_purpose: "communications",
    object_observation_quality: "66",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_norad_number: "12345",
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_primary_purpose: "military",
    object_secondary_purpose: "communications",
    object_observation_quality: "66",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  }
];

// GET request
// /catalog/undisclosed
// Same JSON structure as above
// but only contains those objects that are not found in the public (government) dataset
// limit to 100
// Sorted by priority probably makes sense?
const undisclosed = [{}];

// GET request
// /catalog/debris
// Same JSON structure as above
// but only contains those items that are described as "debris" - the "harder to find"s.
// limit to 100
// Sorted by priority probably makes sensse?
const debris = [{}];

// GET request
// /catalog/latest
// Same JSON structure as above
// Perhaps only "new" objects added to the database, maybe in the last month?
// limit to 100
// Need to ask Mike/Chris what is best here. By Latest maybe we can sort by highest confidence?
const latest = [{}];

// GET request
// /catalog/all
// Same JSON structure as above
// Every item in the database
// limit to 100
// Not sure what is best way to sort this?
const all = [{}];
