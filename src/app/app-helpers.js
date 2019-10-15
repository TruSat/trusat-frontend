import React, { useState, useEffect } from "react";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import ReactTooltip from "react-tooltip";

export const deleteCookie = cookieName => {
  document.cookie = `${cookieName}= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export const API_ROOT =
  process.env.REACT_APP_API_ROOT || `https://api.consensys.space:8080`;

export const axiosWithCache = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  // cache will be enabled by default
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: true,
    cacheFlag: `useCache`
  })
});

export const useTrusatGetApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
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
      <div className="app__tool-tip-wrapper" data-tip={code}>
        <img
          className="catalog-table__small-text"
          src={`https://www.countryflags.io/${code}/flat/16.png`}
          alt={`${code} flag `}
        />
        <ReactTooltip type="info" />
      </div>
    );
  } else if (code.includes("/")) {
    const sharedCodes = code.split("/");

    return sharedCodes.map(sharedCode => {
      return (
        <div className="app__tool-tip-wrapper" data-tip={code}>
          <img
            key={sharedCode}
            className="catalog-table__small-text"
            src={`https://www.countryflags.io/${sharedCode}/flat/16.png`}
            alt={`${sharedCode} flag `}
          />
          <ReactTooltip type="info" />
        </div>
      );
    });
  }
};

export const shortenAddressToolTip = address => {
  return address ? (
    <div data-tip={address}>
      {`${address.substring(0, 5)}...`}
      <ReactTooltip type="info" />
    </div>
  ) : null;
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
  object: "satellites and debris in orbit",
  origin: "country of origin",
  purpose: "primary function of satellite",
  confidence: "degree of certainty in orbital prediction",
  last_seen_by: "observer with most recent submission",
  date: "date of observation",
  tracked_by: "submitter of observation",
  location: "location of observation",
  quality: "trustworthiness based on confidence factors",
  time_error:
    "the time-of-flight error from the observation to the point orthogonal to the predict track",
  position_error:
    "the angle in degrees that separates the observation from the predict",
  cross_track_error: "how far from the predict track the observation is",
  weight:
    "relative amount of influence this observation has over orbital prediction",
  user: "user who made observation"
};
