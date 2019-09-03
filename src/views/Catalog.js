import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Astriagraph from "../app/components/Astriagraph";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";
import FilterDescription from "../catalog/components/FilterDescription";

export default function Catalog({ match }) {
  const catalogFilter = match.params.catalogFilter;
  const [range, setRange] = useState({ start: 0, end: 20 });

  return (
    <div className="catalog__wrapper">
      <Astriagraph />
      <h1 className="catalog__header">CATALOG</h1>
      <CatalogNavBar catalogFilter={catalogFilter} setRange={setRange} />
      <FilterDescription catalogFilter={catalogFilter} />
      <NavLink style={{ color: "white" }} to="/submit">
        <span
          style={{
            border: "1px solid #5F5F5F",
            display: "inline-block",
            padding: "0.5em"
          }}
        >
          Submit data
        </span>
      </NavLink>

      {catalogFilter === "priorities" || catalogFilter === "all" ? (
        <DownloadCatalogFilterTleButton catalogFilter={catalogFilter} />
      ) : null}

      <CatalogTable
        catalogFilter={catalogFilter}
        range={range}
        setRange={setRange}
      />
    </div>
  );
}
