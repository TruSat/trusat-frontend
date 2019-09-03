import React from "react";
import { withRouter } from "react-router-dom";

function CatalogNavBar({ catalogFilter, setCatalogFilter, setRange, history }) {
  return (
    <div className="catalog-nav-bar__wrapper">
      <span
        className={
          catalogFilter === "priorities"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          history.push("/catalog/priorities");
        }}
      >
        PRIORITIES
      </span>

      <span
        className={
          catalogFilter === "undisclosed"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
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
          setRange({ start: 0, end: 20 });
          history.push("/catalog/debris");
        }}
      >
        DEBRIS
      </span>

      <span
        className={
          catalogFilter === "latest"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          history.push("/catalog/latest");
        }}
      >
        LATEST
      </span>

      <span
        className={
          catalogFilter === "all"
            ? "catalog-nav-bar__link--highlight"
            : "catalog-nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          history.push("/catalog/all");
        }}
      >
        ALL
      </span>
    </div>
  );
}

export default withRouter(CatalogNavBar);
