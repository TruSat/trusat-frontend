import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";
import HowToParticipate from "../catalog/components/HowToParticipate";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";
import { NavLink } from "react-router-dom";

function Catalog({ match }) {
  const catalogFilter = match.params.catalogFilter;
  const [dataStart, setDataStart] = useState(0);
  // Used by TablePaginator component rendered under the CatalogTable
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  return (
    <div className="catalog__wrapper">
      <div className="catalog__header-wrapper">
        <h1 className="catalog__header">Catalog</h1>
        <div className="catalog__header-buttons-wrapper app__hide-on-mobile">
          <DownloadCatalogFilterTleButton
            catalogFilter={catalogFilter}
            showDownloadButton={showDownloadButton}
          />

          <NavLink className="app__nav-link" to="/submit">
            <span className="catalog__button catalog__get-data-button">
              Submit observations
            </span>
          </NavLink>
        </div>
      </div>

      <CatalogNavDropdown
        catalogFilter={catalogFilter}
        setRange={setRange}
        setDataStart={setDataStart}
      />

      <section className="catalog__nav-bar-how-to-wrapper">
        <div>
          <CatalogNavBar
            catalogFilter={catalogFilter}
            setRange={setRange}
            setDataStart={setDataStart}
          />
        </div>
        {/* Shown on desktop */}
        <div className="app__show-on-desktop">
          <HowToParticipate catalogFilter={catalogFilter} />
        </div>
      </section>

      <CatalogTable
        catalogFilter={catalogFilter}
        range={range}
        setRange={setRange}
        dataStart={dataStart}
        setDataStart={setDataStart}
        setShowDownloadButton={setShowDownloadButton}
      />
      {/* Shown on mobile */}
      <section className="app__show-on-mobile">
        <HowToParticipate catalogFilter={catalogFilter} />
      </section>
    </div>
  );
}

export default withRouter(Catalog);
