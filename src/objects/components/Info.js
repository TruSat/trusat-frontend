import React from "react";
import { NavLink } from "react-router-dom";
import ObjectBadgeLarge from "../../assets/ObjectBadgeLarge.svg";
import { useObjectsState } from "../objects-context";
import { renderFlag } from "../../app/helpers";

export default function Info({ noradNumber }) {
  const { objectInfo } = useObjectsState();

  return (
    <React.Fragment>
      <section className="object-info__header-section-wrapper">
        <img
          className="object-info__badge"
          src={ObjectBadgeLarge}
          alt="object badge"
        ></img>
        <div>
          <h1 className="object-info__header">{objectInfo.object_name}</h1>
          <div className="object-info__origin-year-wrapper">
            {renderFlag(objectInfo.object_origin)}
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.object_purpose}
            </p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.object_secondary_purpose}
            </p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.year_launched}
            </p>
          </div>
        </div>

        <div>
          <p className="object-info__small-text">{noradNumber}</p>

          <div className="object-info__tracking-numbers-wrapper">
            <p className="object-info__small-text--grey">TRACKED BY</p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.number_users_tracked}
            </p>
            &nbsp;
            <p className="object-info__small-text--grey">VIA</p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.oservation_count}
            </p>
            &nbsp;
            <p className="object-info__small-text--grey">OBSERVATIONS</p>
          </div>

          <div className="object-info__last-seen-wrapper">
            <p className="object-info__small-text--grey">LAST SEEN</p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.time_last_tracked}
            </p>
            &nbsp;
            <p className="object-info__small-text--grey">BY</p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.username_last_tracked}
            </p>
          </div>

          <div className="object-info__quality-wrapper">
            <p className="object-info__small-text--grey">QUALITY</p>
            &nbsp;
            <p className="object-info__small-text">
              {objectInfo.observation_quality}
            </p>
          </div>
        </div>
      </section>

      <section className="object-info__background-section-wrapper">
        <h1>BACKGROUND</h1>
        <p>background = {objectInfo.object_background}</p>
        HOW TO SEE THIS SAT
        <NavLink className="app__nav-link" to="/how">
          Follow this tutorial
        </NavLink>
        <a href={`${objectInfo.heavens_above_url}`}>
          Deep link to Heavens Above
        </a>
      </section>
    </React.Fragment>
  );
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
const object_info = {
  object_name: "Name of Sat",
  object_origin: "russia",
  object_type: "satelitte",
  object_primary_purpose: "military",
  object_secondary_purpose: "communications",
  year_launched: "1987",
  number_users_tracked: "77", // number of users that have successfully tracked this object
  oservation_count: "12000", // total number of observations that were submitted to create a TLE for this object from the beginning of collection records
  time_last_tracked: "1550398277", // timestamp
  address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
  username_last_tracked: "Leo Barhorst",
  observation_quality: 77, // This is our object confidence "rating", may utilize user rank and individual observation_quality for example
  object_background:
    "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
  heavens_above_url: "https://filler.com"
};
