import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Astriagraph from "../app/components/Astriagraph";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";
import FilterDescription from "../catalog/components/FilterDescription";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";

export default function Catalog({ match }) {
  const catalogFilter = match.params.catalogFilter;
  const [range, setRange] = useState({ start: 0, end: 20 });

  return (
    <div className="catalog__wrapper">
      <Astriagraph />
      <h1 className="catalog__header">CATALOG</h1>
      <CatalogNavDropdown />
      <CatalogNavBar catalogFilter={catalogFilter} setRange={setRange} />
      <section className="catalog__content-wrapper">
        <div className="catalog__description-table-wrapper">
          <FilterDescription catalogFilter={catalogFilter} />
          <CatalogTable
            catalogFilter={catalogFilter}
            range={range}
            setRange={setRange}
          />
        </div>
        <div className="catalog__button-link-wrapper">
          {catalogFilter === "priorities" || catalogFilter === "all" ? (
            <DownloadCatalogFilterTleButton catalogFilter={catalogFilter} />
          ) : null}

          <NavLink style={{ color: "white" }} to="/submit">
            <span className="catalog__button">Submit data</span>
          </NavLink>

          <div className="catalog__link-text-wrapper"></div>
          <NavLink className="catalog__link-text" to="/how">
            How can I see these stats?
          </NavLink>
          <NavLink className="catalog__link-text" to="/how">
            How are sats prioritized?
          </NavLink>
        </div>
      </section>
    </div>
  );
}
