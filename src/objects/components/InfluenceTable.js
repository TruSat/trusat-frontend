import React, { useState, useEffect } from "react";
import axios from "axios";
// import { renderFlag } from "../../app/helpers";
import { useObjectsState } from "../objects-context";
import { shortenAddress } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";
import Spinner from "../../app/components/Spinner";

export default function InfluenceTable() {
  const { noradNumber } = useObjectsState();
  const [tableData, setTableData] = useState([]);
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (noradNumber) {
      setIsLoading(true);

      axios
        .post(
          `https://api.consensys.space:8080/object/influence`,
          JSON.stringify({ norad_number: noradNumber })
        )
        .then(result => {
          setTableData(result.data);
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [noradNumber]);

  const renderInfluenceRows = () => {
    const { start, end } = range;
    const rangeData = tableData.slice(start, end);

    return rangeData.map(obj => {
      return (
        <tr key={tableData.indexOf(obj)} className="table__body-row">
          <td className="table__table-data">{obj.observation_time}</td>
          <td className="table__table-data app__hide-on-mobile">
            {obj.username ? obj.username : shortenAddress(obj.user_address)}
          </td>
          <td className="table__table-data">
            <div style={{ display: "flex" }}>
              {/* TO DO - allow user to pick a country code so we can render flags */}
              {/* {renderFlag(objectOrigin)}
              &nbsp; */}
              {obj.user_location ? obj.user_location : "undisclosed"}
            </div>
          </td>

          <td className="table__table-data">{obj.observation_quality}</td>
          <td className="table__table-data">
            {obj.observation_time_difference.substring(0, 4)}
          </td>
          <td className="table__weight-data">
            {obj.observation_weight.substring(0, 4)}
          </td>
        </tr>
      );
    });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <table className="table object-influence-table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-text object-inluence-table__table-header-text">
              DATE
            </th>
            <th className="table__header-text app__hide-on-mobile">
              TRACKED BY
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              LOCATION
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">QUALITY</p>
              <p className="app__hide-on-desktop">QUAL..</p>
            </th>
            <th className="table__header-text object-inluence-table__table-header-text">
              <p className="app__hide-on-mobile">TIME DIFF</p>
              <p className="app__hide-on-desktop">DIFF..</p>
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">WEIGHT</p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody className="table__body">{renderInfluenceRows()}</tbody>
      </table>

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

// POST request
// /objectInfluence
// receives Norad Number and returns and array of objects
// Lists the most influential users who have helped to create the LATEST TLE with an accurate sighting
// Weight should add up to 100%
// sorted by most influence
// const object_influence = [
//   {
//     observation_time: "1550398277",
//     username: "Leo Barhorst",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a", // always needed as a fallback in event the user has not not created a username
//     user_location: "Brooklyn, USA", // only available if the user has made it publicly available
//     observation_quality: "34", // quality/accuracy of the individual observastion
//     observation_time_difference: "1.42", // this will be a positive or negative number in seconds
//     observation_weight: "33" // a percentage value
//   },
//   {
//     observation_time: "1550398277",
//     username: "Jim Smith",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "Los Angeles, USA",
//     observation_quality: "45",
//     observation_time_difference: "1.42",
//     observation_weight: "33"
//   },
//   {
//     observation_time: "1550398277",
//     username: "Joe Bloggs",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "London, UK",
//     observation_quality: "20",
//     observation_time_difference: "1.42",
//     observation_weight: "33"
//   }
// ];
