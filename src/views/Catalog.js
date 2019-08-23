import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import CatalogNavBar from "../catalog/CatalogNavBar";
import CatalogTable from "../catalog/CatalogTable";

export default function Catalog() {
  const [catalogFilter, setCatalogFilter] = useState("priorities");
  const [tleString, setTleString] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.consensys.space:8080/tle/trusat_${catalogFilter}.txt`)
      .then(res => {
        console.log(res.data);
        setTleString(res.data);
      })
      .catch(err => console.log(err));
  }, [catalogFilter]);

  const downloadTles = () => {
    let textFile = null;

    const data = new Blob([tleString], { type: "text/plain" });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
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
      <a
        style={{
          border: "1px solid #5F5F5F",
          display: "inline-block",
          padding: "0.5em"
        }}
        href={downloadTles()}
        download={`trusat_${catalogFilter}.txt`}
      >
        Get data
      </a>

      <CatalogNavBar
        catalogFilter={catalogFilter}
        setCatalogFilter={setCatalogFilter}
      />
      <CatalogTable catalogFilter={catalogFilter} />
    </React.Fragment>
  );
}
