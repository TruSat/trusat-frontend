import React, { Fragment, useEffect } from "react";
import { useTrusatGetApi } from "../../app/helpers";
import Spinner from "../../app/components/Spinner";

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (catalogFilter === "priorities" || catalogFilter === "all") {
      // TODO - stop api being hit twice
      console.log(`fetching txt data`);
      doFetch(
        `https://api.consensys.space:8080/tle/trusat_${catalogFilter}.txt`
      );
    }
  }, [catalogFilter, doFetch]);

  const downloadTles = () => {
    let textFile = null;

    const dataToDownload = new Blob([data], { type: "text/plain" });

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
