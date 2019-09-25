import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from "axios-extensions";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";
import { API_ROOT } from "../../app/helpers";
import Spinner from "../../app/components/Spinner";

const axiosWithCache = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export default function DownloadCatalogFilterTleButton({ catalogFilter }) {
  const { prioritiesTleData, allTleData } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [textFile, setTextFile] = useState(null);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        console.log(`fetching TLE data for txt file!`);

        const result = await axiosWithCache(
          `${API_ROOT}/tle/trusat_${catalogFilter}.txt`
        );

        if (!didCancel) {
          const textFile = await createTextFile(result.data);
          setTextFile(textFile);
          catalogDispatch({
            type: `SET_${catalogFilter.toUpperCase()}_TLE_DATA`,
            payload: result.data
          });
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };

    const getBlobDataAndCreateTextFile = async () => {
      if (
        catalogFilter === "priorities" &&
        prioritiesTleData &&
        prioritiesTleData.length !== 0
      ) {
        const textFile = await createTextFile(prioritiesTleData);
        setTextFile(textFile);
      } else if (
        catalogFilter === "all" &&
        allTleData & (allTleData.length !== 0)
      ) {
        const textFile = await createTextFile(allTleData);
        setTextFile(textFile);
      } else {
        fetchData();
      }
    };

    getBlobDataAndCreateTextFile();
    // Clean up function which prevents attempt to update state of unmounted component
    return () => {
      didCancel = true;
    };
  }, [catalogFilter, prioritiesTleData, allTleData, catalogDispatch]);

  const createTextFile = async fetchedBlobData => {
    let textFile = null;

    const dataToDownload = new Blob([fetchedBlobData], { type: "text/plain" });
    // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    return (textFile = window.URL.createObjectURL(dataToDownload));
  };

  return isError ? (
    <p className="app__error-message">Something went wrong ...</p>
  ) : isLoading ? (
    <Spinner />
  ) : (
    <a
      className="catalog__link"
      href={textFile}
      download={`trusat_${catalogFilter}.txt`}
    >
      <span className="catalog__button catalog__get-data-button">Get data</span>
    </a>
  );
}
