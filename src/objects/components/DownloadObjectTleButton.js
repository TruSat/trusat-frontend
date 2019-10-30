import React, { useState, useEffect } from "react";
import { useTrusatGetApi } from "../../app/app-helpers";
import { useObjectsState } from "../objects-context";
import Spinner from "../../app/components/Spinner";
import ReactGA from "react-ga";

export default function DownloadObjectTleButton() {
  const { noradNumber } = useObjectsState();
  const [tleString, setTleString] = useState("");
  const [{ isLoading, isError, data }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    if (noradNumber && data.length === 0) {
      doFetch(`/tle/object?norad_number=${noradNumber}`);
    }

    setTleString(data);
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
  // only show download option if database has a TLE for this object
  return isLoading ? (
    <Spinner />
  ) : isError ? (
    <p className="app__error-message">Something went wrong...</p>
  ) : tleString ? (
    <a
      className="catalog__link"
      href={downloadTles()}
      download={`trusat_${noradNumber}.txt`}
    >
      <span
        className="catalog__button"
        onClick={() => {
          ReactGA.event({
            category: "TLEs",
            action: `User downloaded TLE for object ${noradNumber}`,
            label: "Single TLE download"
          });
        }}
      >
        Download prediction
      </span>
    </a>
  ) : null;
}
