import React from "react";
import { NavLink } from "react-router-dom";
import CatalogTable from "../catalog/CatalogTable";

export default function Catalog() {
  return (
    <React.Fragment>
      <NavLink to="/catalog/submit">Submit Observations</NavLink>
      <CatalogTable />
    </React.Fragment>
  );
}
