import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function CatalogTable({ catalogFilter }) {
  console.log(catalogFilter);
  const { jwt } = useAuthState();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (catalogFilter) {
      // TODO - ask Kenan should this be a post request, sending JWT?
      // Or are we avoiding persinalized catalog for now?
      axios
        .get(
          `http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/catalog/${catalogFilter}`
        )
        .then(result => {
          console.log(result);
          setTableData(result.data);
        })
        .catch(err => {
          console.log(err);
          setTableData([]);
        });
    }
  }, [catalogFilter, setTableData]);

  const renderRows = () => {
    return tableData.map(priObj => (
      <tr key={tableData.indexOf(priObj)}>
        <td>{tableData.indexOf(priObj) + 1}</td>
        <td>{priObj.object_name}</td>
        <td>{priObj.object_origin}</td>
        <td>{priObj.object_type}</td>
        <td>{priObj.object_purpose}</td>
        <td>{priObj.time_last_tracked}</td>
        {/* TODO - this is currently returning email, should be username or eth address */}
        <td>{priObj.username_last_tracked}</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Priority</th>
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
