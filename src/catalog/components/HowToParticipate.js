import React from "react";
import { NavLink } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate({ catalogFilter }) {
  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__how-to-text">WHAT IS THIS?</h2>
      <p className="catalog__sidebar-text">
          This is an independent record of orbit predictions to help you spot satellites.{" "} 
          <NavLink
              className="app__nav-link catalog__link--lowlight"
              to="/submit"
            >
              Submit
            </NavLink>
            {" "}your own observations to update the catalog.{" "}
        <a
          className="app__nav-link catalog__link--lowlight"
          href="https://learn.trusat.org/docs/start-here.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
        .
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
        <div className="app__nav-link">
            <a
          className="catalog__button catalog__get-data-button"
          href="https://keeptrack.space/?trusat"
          target="_blank"
          rel="noopener noreferrer"
        >
          See orbits
        </a>
          </div>
      </div>
    </div>
  );
}
