import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

function HowToParticipate({ match }) {
  const catalogFilter = match.params.catalogFilter;

  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__how-to-text">HOW TO PARTICIPATE</h2>
      <div className="catalog__button-wrapper">
        {catalogFilter === "priorities" || catalogFilter === "all" ? (
          <DownloadCatalogFilterTleButton />
        ) : null}

        <NavLink className="app__nav-link" to="/submit">
          <span className="catalog__button">Submit data</span>
        </NavLink>
      </div>

      <NavLink className="app__nav-link" to="/how">
        <p className="catalog__link-text">Follow tutorial for sat-tracking</p>
      </NavLink>
      <NavLink className="app__nav-link" to="/how">
        <p className="catalog__link-text">Improve how sats are prioritized</p>
      </NavLink>
    </div>
  );
}

export default withRouter(HowToParticipate);
