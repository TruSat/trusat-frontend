import React from "react";
import { NavLink } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate({ catalogFilter }) {
  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__how-to-text">TRACK SATELLITES</h2>
      <NavLink className="app__nav-link" to="/how">
        <p className="catalog__link-text">Learn how to track satellites</p>
      </NavLink>
      <div className="catalog__button-wrapper">
        {catalogFilter === "priorities" || catalogFilter === "all" ? (
          <DownloadCatalogFilterTleButton catalogFilter={catalogFilter} />
        ) : null}
      </div>
    </div>
  );
}
