import React from "react";
import ObjectBadgeLarge from "../../assets/ObjectBadgeLarge.svg";
import { useObjectsState } from "../objects-context";
import { renderFlag, shortenAddress } from "../../app/helpers";
import HowToSeeIt from "./HowToSeeIt";

export default function Info() {
  const { noradNumber, objectInfo } = useObjectsState();

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
          <div className="object-info__header-info-wrapper">
            <div className="object-info__header-info-wrapper--with-margin">
              <p className="object-info__small-text">
                {objectInfo.number_users_tracked}
              </p>
              &nbsp;
              <p className="object-info__small-text--grey">OBSERVERS</p>
              &nbsp;
              <p className="object-info__small-text">
                {objectInfo.observation_quality}
              </p>
              &nbsp;
              <p className="object-info__small-text--grey">CONFIDENCE</p>
            </div>
            <div className="object-info__header-info-wrapper--with-margin">
              <p className="object-info__small-text--grey">LAST SEEN</p>
              &nbsp;
              <p className="object-info__small-text">
                {objectInfo.time_last_tracked}
              </p>
              &nbsp;
              <p className="object-info__small-text--grey">BY</p>
              &nbsp;
              <p className="object-info__small-text">
                {objectInfo.username_last_tracked
                  ? objectInfo.username_last_tracked
                  : shortenAddress(objectInfo.username_last_tracked)}
              </p>
            </div>

            <div className="object-info__header-info-wrapper object-info__norad-number-wrapper">
              <p className="object-info__small-text--grey">NORAD#</p>
              &nbsp;
              <p className="object-info__small-text">{noradNumber}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="object-info__background-section-wrapper">
        <div className="object-info__background-wrapper">
          <h2 className="object-info__section-title">BACKGROUND</h2>
          <div className="object-info__origin-launched-wrapper">
            <div className="object-info__origin-wrapper">
              <p className="object-info__info-label">ORIGIN</p>
              <p>{renderFlag(objectInfo.object_origin)}</p>
            </div>
            <div className="object-info__launched-wrapper">
              <p className="object-info__info-label">LAUNCHED</p>
              <p>{objectInfo.year_launched}</p>
            </div>
          </div>
          {objectInfo.object_background ? (
            <div className="object-info__purpose-wrapper">
              <p className="object-info__info-label">PURPOSE</p>
              <p>{objectInfo.object_background}</p>
            </div>
          ) : null}
        </div>
        <HowToSeeIt />
      </section>
    </React.Fragment>
  );
}

// POST REQUEST
// /objectInfo
// receives Norad Number and returns an object.
// const object_info = {
//   object_name: "Name of Sat",
//   object_origin: "russia",
//   object_type: "satelitte",
//   object_primary_purpose: "military",
//   object_secondary_purpose: "communications",
//   year_launched: "1987",
//   number_users_tracked: "77", // number of users that have successfully tracked this object
//   oservation_count: "12000", // total number of observations that were submitted to create a TLE for this object from the beginning of collection records
//   time_last_tracked: "1550398277", // timestamp
//   address_last_tracked: "0x1863a72A0244D603Dcd00CeD99b94d517207716a",
//   username_last_tracked: "Leo Barhorst",
//   observation_quality: 77, // This is our object confidence "rating", may utilize user rank and individual observation_quality for example
//   object_background:
//     "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
//   heavens_above_url: "https://filler.com"
// };
