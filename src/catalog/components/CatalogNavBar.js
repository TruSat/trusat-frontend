import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";

function CatalogNavBar({ catalogFilter, setRange, history }) {
  return (
    <div className="catalog-nav-bar__wrapper">
      <span
        className={
          catalogFilter === "priorities"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          ReactGA.event({
            category: "Catalog",
            action: "User selected priorities filter"
          });
          history.push("/catalog/priorities");
        }}
      >
        PRIORITIES
      </span>

      <span
        className={
          catalogFilter === "latest"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          ReactGA.event({
            category: "Catalog",
            action: "User selected latest filter"
          });
          history.push("/catalog/latest");
        }}
      >
        LAUNCHES
      </span>

      <span
        className={
          catalogFilter === "undisclosed"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          ReactGA.event({
            category: "Catalog",
            action: "User selected undisclosed filter"
          });
          history.push("/catalog/undisclosed");
        }}
      >
        UNDISCLOSED
      </span>

      <span
        className={
          catalogFilter === "debris"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          ReactGA.event({
            category: "Catalog",
            action: "User selected debris filter"
          });
          history.push("/catalog/debris");
        }}
      >
        DEBRIS
      </span>

      <span
        className={
          catalogFilter === "all"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 10 });
          ReactGA.event({
            category: "Catalog",
            action: "User selected all filter"
          });
          history.push("/catalog/all");
        }}
      >
        ALL
      </span>
    </div>
  );
}

export default withRouter(CatalogNavBar);
