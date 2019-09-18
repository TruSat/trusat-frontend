import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Spinner from "../../app/components/Spinner";
import axios from "axios";
import ObjectBadge from "../../assets/ObjectBadge.svg";
import { renderFlag, toolTip, shortenAddressToolTip } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";

function CatalogTable({ match, range, setRange }) {
  const catalogFilter = match.params.catalogFilter;
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await axios
        .get(`https://api.consensys.space:8080/catalog/${catalogFilter}`)
        .then(result => {
          setTableData(result.data);
          setIsLoading(false);
        })
        .catch(err => {
          console.log(err);
          setTableData([]);
          setIsLoading(false);
        });
    };

    if (catalogFilter) {
      fetchData();
    }
  }, [catalogFilter, setTableData]);

  const renderCatalogRows = () => {
    const { start, end } = range;
    const rangeData = tableData.slice(start, end);

    return rangeData.map(obj => (
      <tr
        key={tableData.indexOf(obj)}
        className="table__body-row catalog-table__body-row"
      >
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/object/${obj.object_norad_number}`}
          >
            <div className="catalog-table__object-data-wrapper">
              {catalogFilter === "priorities" ? (
                <p>
                  {tableData.indexOf(obj) + 1}
                  &nbsp;
                </p>
              ) : null}
              <img
                className="table__object-badge"
                src={ObjectBadge}
                alt="Object Badge"
              ></img>
              {toolTip(obj.object_name, obj.object_norad_number)}
            </div>
          </NavLink>
        </td>
        <td className="table__table-data">{renderFlag(obj.object_origin)}</td>

        <td className="table__table-data app__hide-on-mobile">
          {obj.object_primary_purpose}&nbsp;{obj.object_secondary_purpose}
        </td>
        <td className="table__table-data app__hide-on-mobile">
          {obj.object_observation_quality}%
        </td>
        <td className="table__weight-data">
          <NavLink
            className="app__nav-link"
            to={`/profile/${obj.address_last_tracked}`}
          >
            {obj.username
              ? toolTip(obj.username_last_tracked, obj.address_last_tracked)
              : shortenAddressToolTip(obj.address_last_tracked)}
          </NavLink>
        </td>
      </tr>
    ));
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div>
        <table className="table">
          <thead className="table__header">
            <tr className="table__header-row">
              <th className="table__header-text">OBJECT</th>
              <th className="table__header-text">ORIGIN</th>
              <th className="table__header-text app__hide-on-mobile">
                PURPOSE
              </th>
              <th className="table__header-text app__hide-on-mobile">
                CONFIDENCE
              </th>
              <th className="table__header-text">LAST SEEN BY</th>
            </tr>
          </thead>
          <tbody className="table__body">{renderCatalogRows()}</tbody>
        </table>
      </div>

      {tableData.length > 10 ? (
        <TablePaginator
          tableDataLength={tableData.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </React.Fragment>
  );
}

// GET request
// /catalog/priorities
// limit to 100
// sorted by priority
// const priorities = [
//   {
//     object_norad_number: "12345", // This is not rendered but will be used to create the route for the "object view"
//     object_name: "sl-27",
//     object_origin: "russia",
//     object_type: "rocket body",
//     object_primary_purpose: "military",
//     object_secondary_purpose: "communications",
//     object_observation_quality: "66",
//     time_last_tracked: "1565803593926", // timestamp
//     address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     username_last_tracked: "username"
//   },
//   {
//     object_norad_number: "12345",
//     object_name: "abrixas rocket",
//     object_origin: "usa",
//     object_type: "satelitte",
//     object_primary_purpose: "military",
//     object_secondary_purpose: "communications",
//     object_observation_quality: "66",
//     time_last_tracked: "1565803593926",
//     address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     username_last_tracked: "username"
//   },
//   {
//     object_norad_number: "12345",
//     object_name: "sl-27",
//     object_origin: "russia",
//     object_type: "rocket body",
//     object_primary_purpose: "military",
//     object_secondary_purpose: "communications",
//     object_observation_quality: "66",
//     time_last_tracked: "1565803593926",
//     address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     username_last_tracked: "username"
//   }
// ];

// GET request
// /catalog/undisclosed
// Same JSON structure as above
// but only contains those objects that are not found in the public (government) dataset
// limit to 100
// Sorted by priority probably makes sense?
// const undisclosed = [{}];

// GET request
// /catalog/debris
// Same JSON structure as above
// but only contains those items that are described as "debris" - the "harder to find"s.
// limit to 100
// Sorted by priority probably makes sensse?
// const debris = [{}];

// GET request
// /catalog/latest
// Same JSON structure as above
// Perhaps only "new" objects added to the database, maybe in the last month?
// limit to 100
// Need to ask Mike/Chris what is best here. By Latest maybe we can sort by highest confidence?
// const latest = [{}];

// GET request
// /catalog/all
// Same JSON structure as above
// Every item in the database
// limit to 100
// Not sure what is best way to sort this?
// const all = [{}];

export default withRouter(CatalogTable);
