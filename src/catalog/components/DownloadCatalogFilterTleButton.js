import React, { Fragment, useState, useEffect } from "react";
import { useTrusatGetApi } from "../../app/helpers";
import Spinner from "../../app/components/Spinner";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();
  const { prioritiesTleData, allTleData } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [blobData, setBlobData] = useState("");

  useEffect(() => {
    if (catalogFilter === "priorities" && prioritiesTleData.length !== 0) {
      setBlobData(prioritiesTleData);
    } else if (catalogFilter === "all" && allTleData.length !== 0) {
      setBlobData(allTleData);
    } else {
      doFetch(
        `https://api.consensys.space:8080/tle/trusat_${catalogFilter}.txt`
      );

      setBlobData(data);

      catalogDispatch({
        type: `SET_${catalogFilter.toUpperCase()}_TLE_DATA`,
        payload: data
      });
    }
  }, [
    catalogFilter,
    doFetch,
    data,
    prioritiesTleData,
    allTleData,
    catalogDispatch
  ]);

  const downloadTles = () => {
    let textFile = null;

    const dataToDownload = new Blob([blobData], { type: "text/plain" });
    // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(dataToDownload);

    return textFile;
  };

  return (
    <Fragment>
      {isLoading && !isError ? (
        <Spinner />
      ) : (
        <Fragment>
          {isError ? (
            <p className="app__error-message">Something went wrong ...</p>
          ) : (
            <a
              className="catalog__link"
              href={downloadTles()}
              download={`trusat_${catalogFilter}.txt`}
            >
              <span className="catalog__button catalog__get-data-button">
                Get data
              </span>
            </a>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
