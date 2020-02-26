import React, { useState } from "react";
import { API_ROOT } from "../../app/app-helpers";
import axios from "axios";

export default function DownloadObservations() {
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  const download = async () => {
    setIsLoading(true);

    try {
      const result = await axios.post(
        `${API_ROOT}/getAllObservations`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      let csvFile = null;

      const fileToDownload = new Blob([result.data], {
        type: "text/csv"
      });

      // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
      if (csvFile !== null) {
        window.URL.revokeObjectURL(csvFile);
      }

      setCsvFile(window.URL.createObjectURL(fileToDownload));
    } catch (error) {
      setErrorMessage(error.response.data);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <span className="download-observations" onClick={download}>
        {isLoading ? `...Loading` : `Download my X Observations`}
      </span>
      {errorMessage ? <p>Something went wrong... {errorMessage}</p> : null}
      {csvFile ? (
        <a
          className="app__link"
          href={csvFile}
          download={`trusat_observations.csv`}
        >
          download
        </a>
      ) : null}
    </div>
  );
}
