import React from "react";
import { NavLink } from "react-router-dom";
import DownloadCatalogFilterTleButton from "./DownloadCatalogFilterTleButton";

export default function HowToParticipate({ catalogFilter }) {
  return (
    <div className="catalog__how-to-wrapper">
      <h2 className="catalog__how-to-text">WHAT IS THIS?</h2>
        <p className="catalog__sidebar-text">
          This catalog is TruSat's first app. It shows active satellite trackers where satellites are going next, so trackers can capture new observations. It was seeded with data from {" "}
          <a
                className="catalog__link--lowlight"
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.satobs.org/seesat/seesatindex.html"
              >
                SeeSat
              </a>.{" "}Learn how to see sats {" "}
          <NavLink className="app__nav-link catalog__link--lowlight" to="/how">
            here
          </NavLink>.
        </p>
     
      <div className="catalog__button-wrapper app__hide-on-desktop">
        {catalogFilter === "priorities" || catalogFilter === "all" ? (
          <DownloadCatalogFilterTleButton catalogFilter={catalogFilter} />
        ) : null}
      </div>
    </div>
  );
}
