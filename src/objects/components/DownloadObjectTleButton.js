import React, { useState, useEffect } from "react";
import axios from "axios";
import { useObjectsState } from "../objects-context";

export default function DownloadObjectTleButton() {
  const { noradNumber } = useObjectsState();
  const [tleString, setTleString] = useState("");

  useEffect(() => {
    axios
      .post(
        `https://api.consensys.space:8080/tle/object`,
        JSON.stringify({ norad_number: noradNumber })
      )
      .then(res => {
        setTleString(res.data);
      })
      .catch(err => console.log(err));
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
      className="object-observations__get-data-link "
      href={downloadTles()}
      download={`trusat_${noradNumber}.txt`}
    >
      Get data
    </a>
  ) : null;
}
