import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROOT } from "../../app/helpers";
import { useObjectsState } from "../objects-context";

export default function DownloadObjectTleButton() {
  const { noradNumber } = useObjectsState();
  const [tleString, setTleString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${API_ROOT}/tle/object?norad_number=${noradNumber}`)
        .then(res => {
          setTleString(res.data);
        })
        .catch(err => console.log(err));
    };

    fetchData();
  }, [noradNumber]);

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
  return tleString ? (
    <a
      className="catalog__link"
      href={downloadTles()}
      download={`trusat_${noradNumber}.txt`}
    >
      <span className="catalog__button catalog__get-data-button">Get data</span>
    </a>
  ) : null;
}
