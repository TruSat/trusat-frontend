import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../app/components/Spinner";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function CatalogTable({ catalogFilter }) {
  const { jwt } = useAuthState();
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
          // console.log(result);
          setTableData(result.data);
          setShowTable(true);
        })
        .catch(err => {
          console.log(err);
          setTableData([]);
        });
    }
  }, [catalogFilter, setTableData]);

  const renderRows = () => {
    return tableData.map(obj => (
      <tr key={tableData.indexOf(obj)}>
        {catalogFilter === "priorities" ? (
          <td>{tableData.indexOf(obj) + 1}</td>
        ) : null}
        <td>
          <NavLink to={`/object/${obj.object_norad_number}`}>
            {obj.object_name}
          </NavLink>
        </td>
        <td>{obj.object_origin}</td>
        <td>{obj.object_type}</td>
        <td>{obj.object_purpose}</td>
        <td>{obj.time_last_tracked}</td>
        <td>{obj.username_last_tracked}</td>
      </tr>
    ));
  };

  return showTable ? (
    <table>
      <thead>
        <tr>
          {catalogFilter === "priorities" ? <th>Priority</th> : null}

          <th>Name</th>
          <th>Origin</th>
          <th>Type</th>
          <th>Purpose</th>
          <th>Last Time Tracked</th>
          <th>Last User to Track</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
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
    object_purpose: "comms",
    time_last_tracked: "1565803593926", // timestamp
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_norad_number: "12345",
    object_name: "abrixas rocket",
    object_origin: "usa",
    object_type: "satelitte",
    object_purpose: "military",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_norad_number: "12345",
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_purpose: "comms",
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
