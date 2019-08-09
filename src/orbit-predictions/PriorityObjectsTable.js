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
        <td>{priObj.last_tracked}</td>
        <td>{priObj.object_type}</td>
        <td>{priObj.date_launched}</td>
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Object</th>
          <th>Last Tracked</th>
          <th>Type</th>
          <th>Launched</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
}

const data = [
  {
    object_name: "sl-27",
    object_type: "comms",
    last_tracked: "8.01pm",
    date_launched: "apr 4"
  },
  {
    object_name: "abrixas rocket",
    object_type: "military",
    last_tracked: "7.35pm",
    date_launched: "feb 2"
  },
  {
    object_name: "mayak",
    object_type: "classified",
    last_tracked: "12w ago",
    date_launched: "dec 1992"
  },
  {
    object_name: "sl-27",
    object_type: "comms",
    last_tracked: "8.01pm",
    date_launched: "apr 4"
  },
  {
    object_name: "abrixas rocket",
    object_type: "military",
    last_tracked: "7.35pm",
    date_launched: "feb 2"
  },
  {
    object_name: "mayak",
    object_type: "classified",
    last_tracked: "12w ago",
    date_launched: "dec 1992"
  }
];
