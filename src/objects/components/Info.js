import React from "react";
import { NavLink } from "react-router-dom";
import { useObjectsState } from "../objects-context";
import {
  renderFlag,
  toolTip,
  shortenAddressToolTip
} from "../../app/app-helpers";
import HowToSeeIt from "./HowToSeeIt";
import ObjectBadge from "../../app/components/ObjectBadge";

export default function Info() {
  const { noradNumber, objectInfo } = useObjectsState();

  return objectInfo.object_name ? (
    <React.Fragment>
      <section className="object-info__header-section-wrapper">
        <div className="object-info__badge-wrapper">
          <ObjectBadge noradNumber={noradNumber} width={100} />
        </div>

        <div>
          <h1 className="object-info__header">{objectInfo.object_name}</h1>
          <div className="object-info__header-info-wrapper">
            <div className="object-info__header-info-wrapper__group">
              <p className="object-info__small-text">
                {objectInfo.number_users_tracked}
              </p>
              &nbsp;
              <p className="object-info__small-text--grey">OBSERVERS</p>
              &nbsp;
            </div>
            <div className="object-info__header-info-wrapper__group">
              <p className="object-info__small-text">
                {objectInfo.observation_quality}
              </p>
              &nbsp;
              <p className="object-info__small-text--grey">CONFIDENCE</p>
            </div>
            <div className="object-info__header-info-wrapper__group object-info__header-info-wrapper__group--no-margin">
              <p className="object-info__small-text--grey">LAST SEEN</p>
              &nbsp;
              <p className="object-info__small-text">
                {objectInfo.time_last_tracked}
              </p>
              &nbsp;
            </div>
            <div className="object-info__header-info-wrapper__group">
              <p className="object-info__small-text--grey">BY</p>
              &nbsp;
              <div className="object-info__small-text">
                <NavLink
                  className="app__nav-link"
                  to={`/profile/${objectInfo.address_last_tracked}`}
                >
                  {objectInfo.username_last_tracked
                    ? toolTip(
                        objectInfo.username_last_tracked,
                        objectInfo.address_last_tracked
                      )
                    : shortenAddressToolTip(objectInfo.address_last_tracked)}
                </NavLink>
              </div>
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
              {renderFlag(objectInfo.object_origin)}
            </div>
            <div>
              <p className="object-info__info-label">LAUNCHED</p>
              <p className="object-info__large-text">
                {objectInfo.year_launched}
              </p>
            </div>
          </div>
          {objectInfo.object_purpose ? (
            <div className="object-info__purpose-wrapper">
              <p className="object-info__info-label">PURPOSE</p>
              <p className="object-info__large-text">
                {objectInfo.object_purpose}
                {objectInfo.object_secondary_purpose
                  ? `/${objectInfo.object_secondary_purpose}`
                  : null}
              </p>
            </div>
          ) : null}
        </div>
        <HowToSeeIt />
      </section>
    </React.Fragment>
  ) : null;
}
