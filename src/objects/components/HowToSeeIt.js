import React from "react";
import { NavLink } from "react-router-dom";
import { useObjectsState } from "../objects-context";

export default function HowToSeeIt() {
  const { objectInfo } = useObjectsState();

  return (
    <div className="object-info__how-to-wrapper">
      <h2 className="object-info__section-title">HOW TO SEE IT</h2>
      <NavLink className="app__nav-link" to="/how">
        <p className="object-info__link-text">Follow this tutorial</p>
      </NavLink>
      {objectInfo.heavens_above_url ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={objectInfo.heavens_above_url}
        >
          <p className="object-info__link-text">More info at Heavens Above</p>
        </a>
      ) : null}
    </div>
  );
}
