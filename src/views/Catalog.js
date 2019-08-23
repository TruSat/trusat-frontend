import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CatalogNavBar from "../catalog/CatalogNavBar";
import CatalogTable from "../catalog/CatalogTable";

export default function Catalog() {
  const [catalogFilter, setCatalogFilter] = useState("priorities");

  const downloadTles = () => {
    axios
      .get("https://www.celestrak.com/NORAD/elements/visual.txt")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

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
        onClick={downloadTles}
      >
        Get data
      </span>
      <CatalogNavBar
        catalogFilter={catalogFilter}
        setCatalogFilter={setCatalogFilter}
      />
      <CatalogTable catalogFilter={catalogFilter} />
    </React.Fragment>
  );
}
