import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";

export default function Catalog() {
  const [catalogFilter, setCatalogFilter] = useState("priorities");

  return (
    <React.Fragment>
      <NavLink style={{ color: "white" }} to="/catalog/submit">
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

      <CatalogNavBar
        catalogFilter={catalogFilter}
        setCatalogFilter={setCatalogFilter}
      />
      <CatalogTable catalogFilter={catalogFilter} />
    </React.Fragment>
  );
}
