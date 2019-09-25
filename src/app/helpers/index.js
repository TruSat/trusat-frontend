import React, { useState, useEffect } from "react";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import ReactTooltip from "react-tooltip";

export const API_ROOT = `https://api.consensys.space:8080`;

export const axiosWithCache = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  // cache will be enabled by default
  adapter: cacheAdapterEnhancer(axios.defaults.adapter)
});

export const useTrusatGetApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      console.log(`useTrusatGetApi is fetching data!`);

      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axiosWithCache(`${API_ROOT}${url}`);

        if (!didCancel) {
          setData(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };
    // Only fetch when url comes through
    if (url) {
      fetchData();
    }
    // Clean up function which prevents attempt to update state of unmounted component
    return () => {
      didCancel = true;
    };
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export const useTrusatPostApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(``);
  const [postData, setPostData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      console.log("useTrusatPostApi is posting data!");
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.post(`${API_ROOT}${url}`, postData);

        if (!didCancel) {
          setData(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
      setIsLoading(false);
    };
    // Only fetch when url and postData comes through
    if (url && postData) {
      fetchData();
    }
    // Clean up function which prevents attempt to update state of unmounted component
    return () => {
      didCancel = true;
    };
  }, [url, postData]);

  return [{ data, isLoading, isError }, setUrl, setPostData];
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
