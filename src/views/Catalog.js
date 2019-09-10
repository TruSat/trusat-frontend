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
      <CatalogNavBar setRange={setRange} />
      <section className="catalog__content-wrapper">
        <div className="catalog__description-table-wrapper">
          <FilterDescription />
          <CatalogTable range={range} setRange={setRange} />
        </div>
        <div className="catalog__button-link-wrapper">
          <h2 className="catalog__how-to-text">HOW TO PARTICIPATE</h2>
          <div className="catalog__button-wrapper">
            {catalogFilter === "priorities" || catalogFilter === "all" ? (
              <DownloadCatalogFilterTleButton />
            ) : null}

            <NavLink className="app__nav-link" to="/submit">
              <span className="catalog__button">Submit data</span>
            </NavLink>
          </div>

          <NavLink className="app__nav-link" to="/how">
            <p className="catalog__link-text">
              Follow tutorial for sat-tracking
            </p>
          </NavLink>
          <NavLink className="app__nav-link" to="/how">
            <p className="catalog__link-text">
              Improve how sats are prioritized
            </p>
          </NavLink>
        </div>
      </section>
    </div>
  );
}
