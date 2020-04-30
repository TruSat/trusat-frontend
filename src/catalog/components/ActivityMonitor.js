import React from "react";

const data = {
  total_sat_count: 4282,
  total_obs_count: 134811,
  // Should be 10 recents obs
  recent_obs: [{ sat_name: "", user_name: "" }],
  current_month_obs_count: 1000,
  record_month_obs_count: 3000,
};

export default function ActivityMonitor() {
  return (
    <div class="activity-monitor">
      <section>
        <h1>STATS</h1>
        <div>
          <p>{data.sat_count}</p>
          <p>SATELLITES</p>
        </div>
        <div>
          <p>{data.obs_count_all_time}</p>
          <p>OBSERVATIONS</p>
        </div>
      </section>
    </div>
  );
}
