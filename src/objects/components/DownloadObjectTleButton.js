import React, { useState, useEffect } from "react";
import { useTrusatGetApi } from "../../app/helpers";
import { useObjectsState } from "../objects-context";
import Spinner from "../../app/components/Spinner";

export default function DownloadObjectTleButton() {
  const { noradNumber } = useObjectsState();
  const [tleString, setTleString] = useState("");
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch(`/tle/object?norad_number=${noradNumber}`);

    if (data) {
      setTleString(data);
    }
  }, [noradNumber, doFetch, data]);

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

  // only show download option if system can find a TLE for this object
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : (
    <a
      className="catalog__link"
      href={downloadTles()}
      download={`trusat_${noradNumber}.txt`}
    >
      <span className="catalog__button catalog__get-data-button">Get data</span>
    </a>
  );
}
