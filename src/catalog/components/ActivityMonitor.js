import React, { useEffect } from "react";
import { useTrusatGetApi } from "../../app/app-helpers";
import Spinner from "../../app/components/Spinner";
import Satellite from "../../assets/Satellite.svg";
import Eye from "../../assets/Eye.svg";
import ObjectBadge from "../../app/components/ObjectBadge";

const data = {
  total_sat_count: 4282,
  total_obs_count: 134811,
  // Should be 10 recents obs
  recent_obs: [
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet1",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet2",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet3",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet3",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet3",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet4",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet5",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet6",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet7",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet8",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet9",
      user_address: "0x123",
    },
    {
      sat_name: "satname",
      norad_number: "1234",
      user_name: "space cadet10",
      user_address: "0x123",
    },
  ],
  current_month_obs_count: 1000,
  record_month_obs_count: 3000,
};

export default function ActivityMonitor() {
  // const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  // useEffect(() => {
  //   if (data.length === 0) {
  //     doFetch("/catalogActivity");
  //   }

  //   console.log(data);
  // });

  return data ? (
    <div className="activity-monitor">
      <section className="activity-monitor__section activity-monitor__stats-section">
        <h2 className="catalog__sub-header">STATS</h2>
        <div className="activity-monitor__stats-wrapper">
          <div className="activity-monitor__stat-wrapper">
            <img src={Satellite} alt="sat" />
            <div>
              <p className="activity-monitor__stat-number">
                {data.total_sat_count}
              </p>
              <p className="activity-monitor__stat-title">SATELLITES</p>
            </div>
          </div>
          <div className="activity-monitor__stat-wrapper">
            <img src={Eye} alt="eye" />
            <div>
              <p className="activity-monitor__stat-number">
                {data.total_obs_count}
              </p>
              <p className="activity-monitor__stat-title">OBSERVATIONS</p>
            </div>
          </div>
        </div>
      </section>

      <section className="activity-monitor__section">
        <h2 className="catalog__sub-header">RECENT OBSERVATIONS</h2>
        {data.recent_obs.map((ob, postion) => (
          <div key={postion} className="activity-monitor__recent-obs-row">
            <ObjectBadge size="extra-small" noradNumber={ob.norad_number} />
            <p className="activity-monitor__recent-obs-sat-name">
              {ob.sat_name}
            </p>
            <p className="activity-monitor__recent-obs-user-name">
              {ob.user_name}
            </p>
          </div>
        ))}
      </section>

      <section className="activity-monitor__section">
        <h2 className="catalog__sub-header">COMMUNITY GOAL</h2>
        <div className="activity-monitor__community-stats-container">
          <p className="activity-monitor__current-month-number">
            {data.current_month_obs_count}
          </p>
          OBSERVATIONS IN {`APRIL`}
        </div>
        <div className="activity-monitor__community-graphic-wrapper">
          <div className="activity-monitor__community-graphic">
            <div
              // Sets width of orange graphic based on data it receives
              style={{
                height: "100%",
                background: "#EC7E5F",
                width: `${
                  (data.current_month_obs_count / data.record_month_obs_count) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="activity-monitor__community-stats-container activity-monitor__community-stats-container--bottom">
            1 MONTH RECORD:{" "}
            <p className="activity-monitor__one-month-record-number">
              {data.record_month_obs_count}
            </p>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Spinner />
  );
}
