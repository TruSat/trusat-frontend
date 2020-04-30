import React from "react";

const data = {
  total_sat_count: 4282,
  total_obs_count: 134811,
  // Should be 10 recents obs
  recent_obs: [
    { sat_name: "1234", user_name: "space cadet1" },
    { sat_name: "1234", user_name: "space cadet2" },
    { sat_name: "1234", user_name: "space cadet3" },
    { sat_name: "1234", user_name: "space cadet4" },
    { sat_name: "1234", user_name: "space cadet5" },
    { sat_name: "1234", user_name: "space cadet6" },
    { sat_name: "1234", user_name: "space cadet7" },
    { sat_name: "1234", user_name: "space cadet8" },
    { sat_name: "1234", user_name: "space cadet9" },
    { sat_name: "1234", user_name: "space cadet10" },
  ],
  current_month_obs_count: 1000,
  record_month_obs_count: 3000,
};

export default function ActivityMonitor() {
  return (
    <div class="activity-monitor">
      <section>
        <h1>STATS</h1>
        <div>
          <p>{data.total_sat_count}</p>
          <p>SATELLITES</p>
        </div>
        <div>
          <p>{data.total_obs_count}</p>
          <p>OBSERVATIONS</p>
        </div>
      </section>
      <section>
        <h1>RECENT OBSERVATIONS</h1>
        {data.recent_obs.map((ob) => (
          <div>
            <p>{ob.sat_name}</p>
            <p>{ob.user_name}</p>
          </div>
        ))}
      </section>
      <section>COMMUNITY GOAL</section>
      <p>{data.current_month_obs_count} OBSERVATIONS IN *Insert Month name*</p>
      <div>GRAPHIC HERE</div>
      <p>1 MONTH RECORD: {data.record_month_obs_count}</p>
    </div>
  );
}
