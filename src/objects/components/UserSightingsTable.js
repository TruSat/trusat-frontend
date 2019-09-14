import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";
import { useUserState } from "../../user/user-context";
import { useObjectsState } from "../objects-context";
import { renderFlag } from "../../app/helpers/";
import { shortenAddress } from "../../app/helpers";
import TablePaginator from "../../app/components/TablePaginator";

export default function UserSightingsTable() {
  const { jwt } = useAuthState();
  const { userAddress } = useUserState();
  const { noradNumber, objectOrigin } = useObjectsState();
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [range, setRange] = useState({ start: 0, end: 10 });

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/object/userSightings`,
        JSON.stringify({
          norad_number: noradNumber,
          jwt: jwt,
          // address: userAddress
          // leos address for testing
          address: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312"
        })
      )
      .then(result => {
        setTableData(result.data);
        setShowTable(true);
      })
      .catch(err => console.log(err));
  }, [jwt, userAddress, noradNumber]);

  const renderUserSightingsRows = () => {
    const { start, end } = range;
    const rangeData = tableData.slice(start, end);

    return rangeData.map(obj => {
      return (
        <tr key={tableData.indexOf(obj)} className="table__body-row">
          <td className="table__table-data">{obj.observation_time}</td>
          <td className="table__table-data app__hide-on-mobile">
            {renderFlag(objectOrigin)}
          </td>
          <td className="table__table-data">
            {obj.user_location ? obj.user_location : "undisclosed"}
          </td>
          <td className="table__table-data app__hide-on-mobile">
            {obj.username ? obj.username : shortenAddress(obj.user_address)}
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

  return showTable ? (
    <React.Fragment>
      <table className="table">
        <thead className="table__header">
          <tr className="table__header-row">
            <th className="table__header-text">DATE</th>
            <th className="app__hide-on-mobile"></th>
            <th className="table__header-text">LOCATION</th>
            <th className="table__header-text app__hide-on-mobile">USER</th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">QUALITY</p>
              <p className="app__hide-on-desktop">QUAL..</p>
            </th>
            <th className="table__header-text">
              <p className="app__hide-on-mobile">TIME DIFF</p>
              <p className="app__hide-on-desktop">DIFF..</p>
            </th>
            <th className="table__header-weight-text">
              <p className="app__hide-on-mobile">WEIGHT</p>
              <p className="app__hide-on-desktop">WT.</p>
            </th>
          </tr>
        </thead>
        <tbody>{renderUserSightingsRows()}</tbody>
      </table>

      {tableData.length > 10 ? (
        <TablePaginator
          tableDataLength={tableData.length}
          range={range}
          setRange={setRange}
        />
      ) : null}
    </React.Fragment>
  ) : null;
}

// POST request
// /objectUserSightings
// receives Norad Number and JWT and returns and array of objects
// sorted by most recent
// const user_sightings = [
//   {
//     observation_time: "1550398277",
//     username: "Leo Barhorst",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "Brooklyn, USA",
//     observation_quality: "34",
//     observation_time_difference: "1.42",
//     observation_weight: "10" // The users most recent observations will in theory have a higher observation_weight %
//   },
//   {
//     observation_time: "1550398277",
//     username: "Leo Barhorst",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "Brooklyn, USA",
//     observation_quality: "34",
//     observation_time_difference: "1.42",
//     observation_weight: "1"
//   },
//   {
//     observation_time: "1550398277",
//     username: "Leo Barhorst",
//     user_address: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//     user_location: "Brooklyn, USA",
//     observation_quality: "34",
//     observation_time_difference: "1.42",
//     observation_weight: "0"
//   }
// ];
