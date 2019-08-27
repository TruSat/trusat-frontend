import React from "react";

export default function HistoryDayRows({ objectOrigin, dayData }) {
  return Object.keys(dayData).map((keyName, index) => {
    return dayData[keyName].map(observation => (
      <tr>
        <td>{keyName}</td>
        <td>{objectOrigin}</td>
        <td>{observation.user_location}</td>
        <td>{observation.username}</td>
        <td>{observation.observation_quality}</td>
        <td>{observation.observation_time_difference}</td>
        <td>{observation.observation_weight}</td>
      </tr>
    ));
  });
}
