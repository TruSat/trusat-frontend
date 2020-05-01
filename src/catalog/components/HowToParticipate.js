import React from "react";
import { NavLink } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate({ catalogFilter }) {
  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__sub-header">WHAT IS THIS?</h2>
      <p className="catalog__sidebar-text">
        This catalog is an independent record of satellite behavior. It provides
        orbit predictions to help you spot satellites. Submit your own
        observations to automatically update the catalog.{` `}
        <a
          className="catalog__link"
          href="https://learn.trusat.org/docs/guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more.
        </a>
      </p>

      <div className="catalog__button-wrapper app__hide-on-desktop">
        {catalogFilter === "priorities" || catalogFilter === "all" ? (
          <DownloadCatalogFilterTleButton catalogFilter={catalogFilter} />
        ) : null}
        <NavLink className="app__nav-link" to="/submit">
          <span className="catalog__button catalog__get-data-button">
            Submit observations
          </span>
        </NavLink>
      </div>
    </div>
  );
}
