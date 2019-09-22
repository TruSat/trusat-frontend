import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../../app/components/Spinner";
import ObjectBadge from "../../assets/ObjectBadge.svg";
import {
  renderFlag,
  toolTip,
  shortenAddressToolTip,
  toolTipCopy
} from "../../app/helpers";
import { useTrusatGetApi } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";
import { useObjectsDispatch } from "../../objects/objects-context";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";
import axios from "axios";

export default function CatalogTable({
  catalogFilter,
  match,
  range,
  setRange
}) {
  const objectsDispatch = useObjectsDispatch();
  const {
    prioritiesData,
    undisclosedData,
    debrisData,
    latestData,
    allData
  } = useCatalogState();
  console.log(`catalog filter = `, catalogFilter);
  console.log(`priorities data = `, prioritiesData);
  console.log(`undisclosed data = `, undisclosedData);
  console.log(`debris data = `, debrisData);
  console.log(`latest data = `, latestData);
  console.log(`all data = `, allData);
  const catalogDispatch = useCatalogDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      console.log(`fetching data!`);

      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(
          `https://api.consensys.space:8080/catalog/${catalogFilter}`
        );

        if (!didCancel) {
          setTableData(result.data);

          catalogDispatch({
            type: `SET_${catalogFilter.toUpperCase()}_DATA`,
            payload: result.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };

    if (catalogFilter === "priorities" && prioritiesData.length !== 0) {
      setTableData(prioritiesData);
    } else if (
      catalogFilter === "undisclosed" &&
      undisclosedData.length !== 0
    ) {
      setTableData(undisclosedData);
    } else if (catalogFilter === "debris" && debrisData.length !== 0) {
      setTableData(debrisData);
    } else if (catalogFilter === "latest" && latestData.length !== 0) {
      setTableData(latestData);
    } else if (catalogFilter === "all" && allData.length !== 0) {
      setTableData(allData);
    } else {
      fetchData();
    }

    // Clean up function which prevents attempt to update state of unmounted component
    return () => {
      didCancel = true;
    };
  }, [
    catalogFilter,
    prioritiesData,
    undisclosedData,
    debrisData,
    latestData,
    allData,
    catalogDispatch
  ]);

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
            // pass through the purpose to the object view as placeholder until more info is scraped on objects
            onClick={() => {
              obj.object_primary_purpose
                ? objectsDispatch({
                    type: "SET_OBJECT_BACKGROUND",
                    payload: `${obj.object_primary_purpose}${
                      obj.object_secondary_purpose
                        ? `/${obj.object_secondary_purpose}`
                        : ""
                    }`
                  })
                : objectsDispatch({
                    type: "SET_OBJECT_BACKGROUND",
                    payload: `unknown`
                  });
            }}
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
              &nbsp;
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
        <td className="table__table-data">
          <NavLink
            className="app__nav-link"
            to={`/profile/${obj.address_last_tracked}`}
          >
            {obj.username_last_tracked
              ? toolTip(obj.username_last_tracked, obj.address_last_tracked)
              : shortenAddressToolTip(obj.address_last_tracked)}
          </NavLink>
        </td>
      </tr>
    ));
  };

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {isError && (
            <p className="app__error-message">Something went wrong ...</p>
          )}

          <table className="table">
            <thead className="table__header">
              <tr className="table__header-row">
                <th className="table__header-text">
                  {toolTip("OBJECT", toolTipCopy.object)}
                </th>
                <th className="table__header-text">
                  {toolTip("ORIGIN", toolTipCopy.origin)}
                </th>
                <th className="table__header-text app__hide-on-mobile">
                  {toolTip("PURPOSE", toolTipCopy.purpose)}
                </th>
                <th className="table__header-text app__hide-on-mobile">
                  {toolTip("CONFIDENCE", toolTipCopy.confidence)}
                </th>
                <th className="table__header-text">
                  {toolTip("LAST SEEN BY", toolTipCopy.last_seen_by)}
                </th>
              </tr>
            </thead>
            <tbody className="table__body">{renderCatalogRows()}</tbody>
          </table>
          {tableData.length > 10 ? (
            <TablePaginator
              tableDataLength={tableData.length}
              range={range}
              setRange={setRange}
            />
          ) : null}
        </Fragment>
      )}
    </Fragment>
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

// switch (catalogFilter) {
//   case "priorities":
//     if (prioritiesData && prioritiesData.length !== 0) {
//       setTableData(prioritiesData);
//     } else {
//       doFetch(`https://api.consensys.space:8080/catalog/priorities`);

//       setTableData(data);

//       catalogDispatch({
//         type: `SET_PRIORITIES_DATA`,
//         payload: data
//       });
//     }
//     break;
//   case "undisclosed":
//     if (undisclosedData && undisclosedData.length !== 0) {
//       setTableData(undisclosedData);
//     } else {
//       doFetch(`https://api.consensys.space:8080/catalog/undisclosed`);

//       setTableData(data);

//       catalogDispatch({
//         type: `SET_UNDISCLOSED_DATA`,
//         payload: data
//       });
//     }
//     break;
//   case "debris":
//     if (debrisData && debrisData.length !== 0) {
//       setTableData(debrisData);
//     } else {
//       doFetch(`https://api.consensys.space:8080/catalog/debris`);

//       setTableData(data);

//       catalogDispatch({
//         type: `SET_DEBRIS_DATA`,
//         payload: data
//       });
//     }
//     break;
//   case "latest":
//     if (latestData && latestData.length !== 0) {
//       setTableData(latestData);
//     } else {
//       doFetch(`https://api.consensys.space:8080/catalog/latest`);

//       setTableData(data);

//       catalogDispatch({
//         type: `SET_LATEST_DATA`,
//         payload: data
//       });
//     }
//     break;
//   case "all":
//     if (allData && allData.length !== 0) {
//       setTableData(allData);
//     } else {
//       doFetch(`https://api.consensys.space:8080/catalog/all`);

//       setTableData(data);

//       catalogDispatch({
//         type: `SET_ALL_DATA`,
//         payload: data
//       });
//     }
//     break;
//   default: {
//     throw new Error(`Unhandle catalogFilter type: ${catalogFilter}`);
//   }
// }
