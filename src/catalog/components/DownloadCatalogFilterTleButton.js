import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCatalogState } from "../catalog-context";

export default function DownloadCatalogFilterTleButton() {
  const { catalogFilter } = useCatalogState();
  const [tleString, setTleString] = useState("");

  useEffect(() => {
    if (catalogFilter === "priorities" || catalogFilter === "all") {
      axios
        .get(`https://api.consensys.space:8080/tle/trusat_${catalogFilter}.txt`)
        .then(res => {
          setTleString(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [catalogFilter]);

  const downloadTles = () => {
    let textFile = null;

    const data = new Blob([tleString], { type: "text/plain" });

    // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  return (
    // only give option to download if user chooses "priorities" or "all" as a catalog filter
    tleString ? (
      <a
        className="catalog__link"
        href={downloadTles()}
        download={`trusat_${catalogFilter}.txt`}
      >
        <span className="catalog__button">Get data</span>
      </a>
    ) : null
  );
}
