import React, { useState, Fragment } from "react";
import axios from "axios";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";
import { API_ROOT } from "../../app/helpers";

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const { prioritiesTleData, allTleData } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [blobData, setBlobData] = useState("");
  const [textFile, setTextFile] = useState(null);

  const fetchData = async () => {
    let didCancel = false;

    try {
      const result = await axios(`${API_ROOT}/tle/trusat_${catalogFilter}.txt`);

      if (!didCancel) {
        catalogDispatch({
          type: `SET_${catalogFilter.toUpperCase()}_TLE_DATA`,
          payload: result.data
        });
        return result.data;
      }
    } catch (error) {
      if (!didCancel) {
        setIsError(true);
      }
    }
  };

  const downloadTles = async () => {
    console.log(`hello`);

    const blobData = await fetchData();

    let textFile = null;

    const dataToDownload = new Blob([blobData], { type: "text/plain" });
    // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(dataToDownload);

    setTextFile(textFile);
  };

  return catalogFilter === "priorities" || catalogFilter === "all" ? (
    <Fragment>
      <span
        onClick={() => downloadTles()}
        className="catalog__button catalog__get-data-button"
      >
        Get data
      </span>
      {textFile ? (
        <a
          className="catalog__link"
          href={textFile}
          download={`trusat_${catalogFilter}.txt`}
        >
          Download
        </a>
      ) : null}
    </Fragment>
  ) : null;
}
