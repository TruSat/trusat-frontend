import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

export const useTrusatApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log(`fetching data!`);
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    // only fetch when url comes through
    if (url) {
      fetchData();
    }
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export const renderFlag = code => {
  if (!code) {
    return <p className="table__small-text">unknown</p>;
  } else if (!code.includes("/")) {
    return (
      <img
        className="catalog-table__small-text"
        src={`https://www.countryflags.io/${code}/flat/16.png`}
        alt={`${code} flag `}
      />
    );
  } else if (code.includes("/")) {
    const sharedCodes = code.split("/");

    return sharedCodes.map(sharedCode => {
      return (
        <img
          key={sharedCode}
          className="catalog-table__small-text"
          src={`https://www.countryflags.io/${sharedCode}/flat/16.png`}
          alt={`${sharedCode} flag `}
        />
      );
    });
  }
};

export const shortenAddressToolTip = address => {
  return (
    <div data-tip={address}>
      {`${address.substring(0, 5)}...`}
      <ReactTooltip type="info" />
    </div>
  );
};

export const toolTip = (displayText, toolTipText) => {
  return (
    <div className="app__tool-tip-wrapper" data-tip={toolTipText}>
      {displayText}
      <ReactTooltip type="info" />
    </div>
  );
};

export const toolTipCopy = {
  object: "copy about object",
  origin: "copy about origin",
  purpose: "copy about purpose",
  confidence: "copy about confidence",
  last_seen_by: "copy about last seen by",
  date: "copy about date",
  tracked_by: "copy about tracked by",
  location: "copy about location",
  quality: "copy about quality",
  time_diff: "copy about time diff",
  weight: "copy about weight",
  user: "copy about user"
};
