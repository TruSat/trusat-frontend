import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";
import HowToParticipate from "../catalog/components/HowToParticipate";

function Catalog({ match }) {
  // Used by TablePaginator component rendered under the CatalogTable
  const catalogFilter = match.params.catalogFilter;
  const [range, setRange] = useState({ start: 0, end: 10 });

  return (
    <div className="catalog__wrapper">
      <h1 className="catalog__header">Catalog</h1>
      <CatalogNavDropdown catalogFilter={catalogFilter} setRange={setRange} />
      <div className="catalog__nav-bar-how-to-wrapper">
        <CatalogNavBar catalogFilter={catalogFilter} setRange={setRange} />
        {/* Shown on desktop */}
        <div className="app__show-on-desktop">
          <HowToParticipate catalogFilter={catalogFilter} />
        </div>
      </div>

      <CatalogTable
        catalogFilter={catalogFilter}
        range={range}
        setRange={setRange}
      />
      {/* Shown on mobile */}
      <div className="app__show-on-mobile">
        <HowToParticipate catalogFilter={catalogFilter} />
      </div>
    </div>
  );
}

export default withRouter(Catalog);
