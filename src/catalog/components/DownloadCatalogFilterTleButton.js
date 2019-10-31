import React, { useState, useEffect, Fragment } from "react";
import { API_ROOT, axiosWithCache } from "../../app/app-helpers";
import Spinner from "../../app/components/Spinner";
import ReactGA from "react-ga";

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [textFile, setTextFile] = useState(null);

  useEffect(() => {
    setTextFile(null);
  }, [catalogFilter]);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axiosWithCache(
        `${API_ROOT}/tle/trusat_${catalogFilter}.txt`
      );

      let textFile = null;

      const dataToDownload = new Blob([result.data], {
        type: "text/plain"
      });
      // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }
      setTextFile(window.URL.createObjectURL(dataToDownload));
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return isError ? (
    <p className="app__error-message">Something went wrong ...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <Fragment>
      <span
        className="catalog__button catalog__get-data-button"
        onClick={() => {
          ReactGA.event({
            category: "TLE usage",
            action: `Clicked download predictions button`,
            label: `Download TLEs from ${catalogFilter}`
          });
          fetchData();
        }}
      >
        Download predictions
      </span>

      {textFile ? (
        <a
          className="catalog__link"
          href={textFile}
          download={`trusat_${catalogFilter}.txt`}
        >
          download
        </a>
      ) : null}
    </Fragment>
  );
}
