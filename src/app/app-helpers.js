import React, { useState, useEffect } from "react";
import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
import ReactTooltip from "react-tooltip";
import ReactGA from "react-ga";
import QuestionMark from "../assets/QuestionMark.svg";

export const setCookies = () => {
  const REACT_APP_GOOGLE_TRACKING_ID =
    process.env.REACT_APP_GOOGLE_TRACKING_ID || null;

  ReactGA.initialize(REACT_APP_GOOGLE_TRACKING_ID);
};

export const deleteCookie = cookieName => {
  document.cookie = `${cookieName}= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};

export const deleteCookies = () => {
  deleteCookie("_ga");
  deleteCookie("_gat");
  deleteCookie("_gid");
};

export const API_ROOT =
  process.env.REACT_APP_API_ROOT || `https://devvymcdevface.trusat.org`;

export const axiosWithCache = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  // cache will be enabled by default
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: true,
    cacheFlag: `useCache`
  }),
  withCredentials: true
});

export const useTrusatGetApi = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setErrorMessage(``);
      setIsLoading(true);

      try {
        const result = await axiosWithCache(`${API_ROOT}${url}`);

        if (!didCancel) {
          setData(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          console.log(error);
          //setErrorMessage(error.response.data);
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

  return [{ data, isLoading, errorMessage }, setUrl];
};

export const renderFlag = code => {
  if (!code) {
    return null;
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

export const QuestionMarkToolTip = ({ toolTipText }) => {
  return (
    <div className="app__tool-tip-wrapper" data-tip={toolTipText}>
      <img src={QuestionMark} alt={"question mark"}></img>
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
  user: "user who made observation",
  observation_station:
    "These are unique numbers used to pinpoint where you make observations from and they are issued to Test Pilots.",
  station_location: `Station codes are used to help identify the location of your observations. If you need to add one, use the 'Add new location' option from the dropdown.`,
  clouded_out:
    "Check this if you want to indicate an attempt to observe that was prevented by adverse weather.",
  observer_unavailable:
    "Favorable weather, but observer not available to make satellite observations.",
  time_of_observation:
    "The UTC time you saw the satellite at the position specified below",
  time_uncertainty:
    "The margin of uncertainty, as a measure of time, for your estimated time of observation",
  sky_conditions_excellent: `No Moon/clouds, great seeing, minimal air/light pollution.`,
  sky_conditions_good: `No Moon/clouds, conditions could be better, but not much.`,
  sky_conditions_fair: `Young/old Moon, some air/light pollution making fainter stars invisible.`,
  sky_conditions_poor: `Gibbous Moon, haze, more air/light pollution making more stars invisible.`,
  sky_conditions_bad: `Bright Moon, air/light pollution, some clouds; difficult.`,
  sky_conditions_terrible: `Bright Moon, air/light pollution, looking through clouds.`,
  position_format:
    "Different software may provide you with different formats for reporting position. This form supports the most common types.",
  epoch_code:
    "The year to which all of the time-based fields in the observation refer.",
  right_ascension:
    "The angular distance of a point east of the First Point of Aries, measured along the celestial equator and expressed in hours, minutes, and seconds.",
  declination:
    "The angular distance of a body north or south of the celestial equator. North declination is considered positive and south, negative.",
  azimuth:
    "The angular distance measured towards the east, from north, along the astronomical horizon to the intersection of the great circle passing through the point and the astronomical zenith with the astronomical horizon.",
  elevation:
    "The angular distance measured positive toward the astronomical zenith from the astronomical horizon along the great circle passing through the point and the astronomical zenith.",
  position_uncertainty:
    "The margin of uncertainty,associated with the format code for your positional measurements.",
  visibility:
    "These are the standard optical behavior codes. Leave blank if there’s no data to note.",
  brightness:
    "A measure of the brightness of a celestial object. The lower the value, the brighter the object. The scale is logarithmic.",
  brightness_uncertainty:
    "The margin of uncertainty for your brightness estimates",
  flash_period:
    "The time between flashes, indicating the speed of a satellite’s rotation as its varying surfaces reflect more or less light.",
  iod:
    "IOD (Interactive Orbit Determination) is a standard format to abbreviate the observation data above into a machine-readable format.",
  station_name:
    "A title for this location to differentiate it from your other observation locations",
  latitude:
    "Your location's angular distance north or south of the equator (using WGS84 standard)",
  longitude:
    "Your location's angular distance east or west of the meridian at Greenwich, England (using WGS84 standard)",

  elevation_station:
    "Your location's vertical distance above or below sea level",
  notes:
    "An optional field to describe this location in more detail, for your own private reference"
};

export const emails = {
  support: "help@beta.trusat.org",
  submit: "submit@beta.trusat.org",
  remove: "remove@beta.trusat.org"
};

export const celestrakCategories = {
  data: [
    {
      groupHeader: { title: "Featured", path: "featured" },
      groupCategories: [
        { title: "100 Brightest", path: "visual" },
        { title: "Starlink", path: "starlink" },
        {
          title: "OneWeb",
          path: "one_web"
        },
        {
          title: "Active Sats",
          path: "active"
        },
        {
          title: "Analyst sats",
          path: "analyst"
        }
      ]
    },
    {
      groupHeader: {
        title: "Weather & Earth Resources",
        path: "weather-earth"
      },
      groupCategories: [
        { title: "Weather", path: "weather" },
        { title: "NOAA", path: "noaa" },
        {
          title: "GOES",
          path: "goes"
        },
        {
          title: "Earth Resources",
          path: "resource"
        },
        {
          title: "Search & Rescue (SARSAT)",
          path: "sarsat"
        },
        {
          title: "Disaster Monitoring",
          path: "disaster_monitoring"
        },
        {
          title: "Tracking and Data Relay",
          path: "tracking_and_data_relay"
        },
        {
          title: "Tracking and Data Relay Satellite System (TDRSS)",
          path: "tdrss"
        },
        {
          title: "ARGOS Data Collection",
          path: "argos"
        },
        {
          title: "System",
          path: "system_weather_and_earth_resources"
        },
        {
          title: "Planet",
          path: "planet"
        },
        {
          title: "Spire",
          path: "spire"
        }
      ]
    },
    {
      groupHeader: { title: "Communications", path: "communications" },
      groupCategories: [
        { title: "Geosynchronous", path: "geo" },
        { title: "GEO Protected Zone", path: "geo_protected_zone" },
        {
          title: "GEO Protected Zone Plus",
          path: "geo_protected_zone_plus"
        },
        {
          title: "Intelsat",
          path: "intelsat"
        },
        {
          title: "SES",
          path: "ses"
        },
        {
          title: "Iridium",
          path: "iridium"
        },
        {
          title: "Iridium Next",
          path: "iridium_next"
        },
        {
          title: "Orbcomm",
          path: "orbcomm"
        },
        {
          title: "Globalstar",
          path: "globalstar"
        },
        {
          title: "Amateur Radio",
          path: "amateur_radio"
        },
        {
          title: "Experimental",
          path: "experimental"
        },
        {
          title: "Other Comm",
          path: "other_comm"
        },
        {
          title: "SatNOGS",
          path: "satnogs"
        },
        {
          title: "Gorizant",
          path: "gorizant"
        },
        {
          title: "Raduga",
          path: "raduga"
        },
        {
          title: "Molniya",
          path: "molniya"
        }
      ]
    },
    {
      groupHeader: { title: "Navigation", path: "navigation" },
      groupCategories: [
        { title: "GPS Operational", path: "gps-ops" },
        { title: "GLONASS Operational", path: "glonass_operational" },
        {
          title: "Galileo",
          path: "galileo"
        },
        {
          title: "Beidou",
          path: "beidou"
        },
        {
          title: "Satellite-Based Augmentation",
          path: "satellite_based_augmentation"
        },
        {
          title: "System",
          path: "system_navigation"
        },
        {
          title: "Satellite-Based Augmentation System (WAAS/EGNOS/MSAS)",
          path: "sbas"
        },
        {
          title: "Navy Navigation Satellite Systems (NNSS)",
          path: "nnss"
        },
        {
          title: "System (NNSS)",
          path: "nnss_system"
        },
        {
          title: "Russian LEO Navigation",
          path: "musson"
        }
      ]
    },
    {
      groupHeader: { title: "Debris", path: "debris" },
      groupCategories: [
        { title: "Indian ASAT Test", path: "indian_asat_test" },
        { title: "FENGYUN 1C", path: "1999-025" },
        {
          title: "IRIDIUM 33",
          path: "iridium_33"
        },
        {
          title: "COSMOS 2251",
          path: "cosmos_2251"
        },
        {
          title: "BREEZE-M R/B Breakup (2012-044C)",
          path: "2012-044"
        }
      ]
    },
    {
      groupHeader: { title: "Scientific", path: "scientific" },
      groupCategories: [
        { title: "Space & Earth Science", path: "science" },
        { title: "Geodetic", path: "geodetic" },
        {
          title: "Engineering",
          path: "engineering"
        },
        {
          title: "Education",
          path: "education"
        }
      ]
    },
    {
      groupHeader: { title: "Misc.", path: "misc" },
      groupCategories: [
        { title: "Miscellaneous Military", path: "military" },
        { title: "Radar Calibration", path: "radar_calibration" },
        {
          title: "CubeSats",
          path: "cubesat"
        },
        {
          title: "Last 30 Days' Launches",
          path: "tle-new"
        },
        {
          title: "Space Stations",
          path: "stations"
        },
        {
          title: "Other",
          path: "other"
        }
      ]
    }
  ]
};
