import React from "react";

export default function HistoryDayTable(objectOrigin, dayData) {
  const [showMonth, setShowMonth] = useState(false);

  return dayData.map(day => {
    return (
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th />
            <th />
            <th>USER</th>
            <th>QUAlITY</th>
            <th>TIME DIFF</th>
            <th>WEIGHT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{day.observation_time}</td>
            <td>{objectOrigin}</td>
            <td>{day.user_location}</td>
            <td>{day.username}</td>
            <td>{day.observation_quality}</td>
            <td>{day.observation_time_difference}</td>
            <td>{day.observation_weight}</td>
          </tr>
        </tbody>
      </table>
    );
  });
}
