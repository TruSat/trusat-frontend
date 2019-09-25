import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import { API_ROOT } from "../../app/helpers";
import Spinner from "../../app/components/Spinner";

const axiosWithCache = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [textFile, setTextFile] = useState(null);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      console.log(`fetching TLE data for txt file!`);

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
        onClick={fetchData}
      >
        Get data
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
