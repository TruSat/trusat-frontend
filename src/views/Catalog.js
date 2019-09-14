import React, { useState } from "react";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";
import {
  useCatalogState,
  useCatalogDispatch
} from "../catalog/catalog-context";
import HowToParticipate from "../catalog/components/HowToParticipate";

export default function Catalog({ match }) {
  const { catalogFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  if (match.params.catalogFilter !== catalogFilter) {
    catalogDispatch({
      type: "SET_CATALOG_FILTER",
      payload: match.params.catalogFilter
    });
  }

  // Used by TablePaginator component rendered under the CatalogTable
  const [range, setRange] = useState({ start: 0, end: 10 });

  return (
    <div className="catalog__wrapper">
      <h1 className="catalog__header">Catalog</h1>
      <CatalogNavDropdown setRange={setRange} />
      <div className="catalog__nav-bar-how-to-wrapper">
        <CatalogNavBar setRange={setRange} />
        {/* Shown on desktop */}
        <div className="app__show-on-desktop">
          <HowToParticipate />
        </div>
      </div>

      <CatalogTable range={range} setRange={setRange} />
      {/* Shown on mobile */}
      <div className="app__show-on-mobile">
        <HowToParticipate />
      </div>
    </div>
  );
}
