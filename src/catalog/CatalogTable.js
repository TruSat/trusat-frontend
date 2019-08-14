import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../auth/auth-context";

export default function PriorityObjectsTable() {
  const { jwt } = useAuthState();
  const [priorityObjects, setPriorityObjects] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/mostRecent`
  //     )
  //     .then(result => {
  //       setPriorityObjects(result.data.community_observations);
  //     })
  //     .catch(err => console.log(err));
  // }, [setPriorityObjects]);

  const renderRows = () => {
    return data.map(priObj => (
      <tr key={data.indexOf(priObj)}>
        <td>{data.indexOf(priObj) + 1}</td>
        <td>{priObj.object_name}</td>
        <td>{priObj.object_origin}</td>
        <td>{priObj.object_type}</td>
        <td>{priObj.object_purpose}</td>
        <td>{priObj.time_last_tracked}</td>
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

const data = [
  {
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_purpose: "comms",
    time_last_tracked: "1565803593926", // timestamp
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_name: "abrixas rocket",
    object_origin: "usa",
    object_type: "satelitte",
    object_purpose: "military",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_purpose: "comms",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_name: "abrixas rocket",
    object_origin: "usa",
    object_type: "satelitte",
    object_purpose: "military",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_name: "sl-27",
    object_origin: "russia",
    object_type: "rocket body",
    object_purpose: "comms",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  },
  {
    object_name: "abrixas rocket",
    object_origin: "usa",
    object_type: "satelitte",
    object_purpose: "military",
    time_last_tracked: "1565803593926",
    address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
    username_last_tracked: "username"
  }
];
