import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";
import FilterDescription from "../catalog/components/FilterDescription";
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

  const [range, setRange] = useState({ start: 0, end: 20 });

  return (
    <div className="catalog__wrapper">
      <h1 className="catalog__header">Catalog</h1>
      <CatalogNavDropdown />
      <div className="catalog__nav-bar-how-to-wrapper">
        <CatalogNavBar setRange={setRange} />
        <HowToParticipate />
      </div>

      <CatalogTable range={range} setRange={setRange} />
    </div>
  );
}
