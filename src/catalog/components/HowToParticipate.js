import React from "react";
import { NavLink } from "react-router-dom";
import { useCatalogState } from "../catalog-context";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate() {
  const { catalogFilter } = useCatalogState();

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
