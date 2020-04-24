import React from "react";
import { NavLink } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate({ catalogFilter }) {
  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__how-to-text">WHAT IS THIS?</h2>
      <p className="catalog__sidebar-text">
        This catalog is TruSat's first app. It shows active satellite trackers
        where satellites are going next, so trackers can add new observations.
        The dataset was seeded by{" "}
        <a
          className="catalog__link--lowlight"
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.satobs.org/seesat/seesatindex.html"
        >
          SeeSat
        </a>
        . Learn how to see sats{" "}
        <a
          className="app__nav-link catalog__link--lowlight"
          href="https://learn.trusat.org/docs/guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
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
      </div>
    </div>
  );
}
