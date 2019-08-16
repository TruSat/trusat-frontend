import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CatalogNavBar from "../catalog/CatalogNavBar";
import CatalogTable from "../catalog/CatalogTable";

export default function Catalog() {
  const [catalogFilter, setCatalogFilter] = useState("priorities");
  console.log(`catalog filter = `, catalogFilter);

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
      <span
        style={{
          border: "1px solid #5F5F5F",
          display: "inline-block",
          padding: "0.5em"
        }}
      >
        Get data
      </span>
      <CatalogNavBar
        catalogFilter={catalogFilter}
        setCatalogFilter={setCatalogFilter}
      />
      {/* TODO - pass the catalog filter to the table for the api call */}
      <CatalogTable />
    </React.Fragment>
  );
}
