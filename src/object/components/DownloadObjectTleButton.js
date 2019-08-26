import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DownloadObjectTleButton({ noradNumber }) {
  const [tleString, setTleString] = useState("");

  useEffect(() => {
    console.log(`getting object ${noradNumber} TLE data!`);
    axios
      .get(`https://api.consensys.space:8080/tle/trusat_${noradNumber}.txt`)
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

  return (
    <a
      style={{
        border: "1px solid #5F5F5F",
        display: "inline-block",
        padding: "0.5em"
      }}
      href={downloadTles()}
      download={`trusat_${noradNumber}.txt`}
    >
      Get data
    </a>
  );
}
