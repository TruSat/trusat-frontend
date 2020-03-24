import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import IconArrowUp from "../../assets/icon-arrow-up.svg";
import IconRocket from "../../assets/icon-rocket.svg";
import IconLock from "../../assets/icon-lock.svg";
import IconTrash from "../../assets/icon-trash.svg";

const celestrakCategories = [
  {
    groupTitle: "Featured",
    categories: [
      { title: "100 Brightest", path: "100_brightest" },
      { title: "Starlink", path: "starlink" },
      {
        title: "OneWeb",
        path: "one_web"
      },
      {
        title: "Active Sats",
        path: "active_sats"
      },
      {
        title: "Analyst sats",
        path: "analyst_sats"
      }
    ]
  },
  {
    groupTitle: "Debris",
    categories: [
      { title: "Indian ASAT Test", path: "indian_asat_test" },
      { title: "FENGYUN 1C", path: "gengyun_1c" },
      {
        title: "IRIDIUM 33",
        path: "iridium_33"
      },
      {
        title: "COSMOS 2251",
        path: "cosmos_2251"
      }
    ]
  },
  {
    groupTitle: "Weather & Earth Resources",
    categories: [
      { title: "Weather", path: "weather" },
      { title: "NOAA", path: "noaa" },
      {
        title: "GOES",
        path: "goes"
      },
      {
        title: "Earth Resources",
        path: "earth_resources"
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
        title: "Satellite System (TDRSS)",
        path: "tdrss"
      },
      {
        title: "ARGOS Data Collection",
        path: "argos"
      },
      {
        title: "System",
        path: "system"
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
    groupTitle: "Scientific",
    categories: [
      { title: "Space & Earth Science", path: "space_and_earth_science" },
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
    groupTitle: "Communications",
    categories: [
      { title: "Active Geosynchronous", path: "active_geosynchronous" },
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
    groupTitle: "Navigation",
    categories: [
      { title: "GPS Operational", path: "gps_operational" },
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
        title: "(WAAS/EGNOS/MSAS)",
        path: "waas_egnos_msas"
      },
      {
        title: "Navy Navigation Satellite",
        path: "navy_navigation"
      },
      {
        title: "System (NNSS)",
        path: "nnss_system"
      },
      {
        title: "Russian LEO Navigation",
        path: "russian_leo_navigation"
      }
    ]
  },
  {
    groupTitle: "Misc.",
    categories: [
      { title: "Miscellaneous Military", path: "misc_military" },
      { title: "Radar Calibration", path: "radar_calibration" },
      {
        title: "CubeSats",
        path: "cube_sats"
      },
      {
        title: "Other",
        path: "other"
      }
    ]
  }
];

function CatalogNavBar({ catalogFilter, setRange, setDataStart, history }) {
  const [showMore, setShowMore] = useState(true);

  const renderCelestrakCategories = () => {
    return celestrakCategories.map(group => (
      <div>
        <h1>{group.groupTitle}</h1>
        <div>
          {group.categories.map(category => (
            <NavLink to={`all/${category.path}`}>{category.title}</NavLink>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <section className="catalog-nav-bar__wrapper">
        <div
          className={
            catalogFilter === "priorities"
              ? "catalog-nav-bar__link--highlight"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => {
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "priorities"
            });
            history.push("/catalog/priorities");
          }}
        >
          <img className="catalog__icon" src={IconArrowUp} alt="icon"></img>
          <span className="catalog-filter-label">PRIORITIES</span>
        </div>

        <div
          className={
            catalogFilter === "latest"
              ? "catalog-nav-bar__link--highlight"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => {
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "latest"
            });
            history.push("/catalog/latest");
          }}
        >
          <img className="catalog__icon" src={IconRocket} alt="icon"></img>
          <span className="catalog-filter-label">LAUNCHES</span>
        </div>

        <div
          className={
            catalogFilter === "undisclosed"
              ? "catalog-nav-bar__link--highlight"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => {
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "undisclosed"
            });
            history.push("/catalog/undisclosed");
          }}
        >
          <img className="catalog__icon" src={IconLock} alt="icon"></img>
          <span className="catalog-filter-label">UNDISCLOSED</span>
        </div>

        <div
          className={
            catalogFilter === "debris"
              ? "catalog-nav-bar__link--highlight"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => {
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "debris"
            });
            history.push("/catalog/debris");
          }}
        >
          <img className="catalog__icon" src={IconTrash} alt="icon"></img>
          <span className="catalog-filter-label">DEBRIS</span>
        </div>

        <div
          className={
            "catalog-nav-bar__link--lowlight catalog-nav-bar__more-link"
          }
          onMouseEnter={() => setShowMore(true)}
          onMouseLeave={() => setShowMore(false)}
        >
          <span className="catalog-filter-label">MORE</span>
        </div>
      </section>
      {showMore ? (
        <section
          className="catalog-nav-bar__more-dropdown"
          onMouseEnter={() => setShowMore(true)}
          onMouseLeave={() => setShowMore(false)}
        >
          {renderCelestrakCategories()}
        </section>
      ) : null}
    </React.Fragment>
  );
}

export default withRouter(CatalogNavBar);
