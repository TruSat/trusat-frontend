import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import FilterDescription from "../catalog/components/FilterDescription";
import CatalogTable from "../catalog/components/CatalogTable";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";
import HowToParticipate from "../catalog/components/HowToParticipate";

function Catalog({ match }) {
  const catalogFilter = match.params.catalogFilter;
  // Used by TablePaginator component rendered under the CatalogTable
  const [range, setRange] = useState({ start: 0, end: 10 });

  return (
    <div className="catalog__wrapper">
      <h1 className="catalog__header">Catalog</h1>

      <CatalogNavDropdown catalogFilter={catalogFilter} setRange={setRange} />

      <section className="catalog__nav-bar-how-to-wrapper">
        <div>
          <CatalogNavBar catalogFilter={catalogFilter} setRange={setRange} />
          <FilterDescription catalogFilter={catalogFilter} />
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
      />
      {/* Shown on mobile */}
      <section className="app__show-on-mobile">
        <HowToParticipate catalogFilter={catalogFilter} />
      </section>
    </div>
  );
}

export default withRouter(Catalog);
