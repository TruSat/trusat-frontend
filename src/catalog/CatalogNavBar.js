import React from "react";

export default function CatalogNavBar({ catalogFilter, setCatalogFilter }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", margin: "1em" }}
    >
      <span
        className={
          catalogFilter === "priority"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => setCatalogFilter("priority")}
      >
        PRIORITIES
      </span>
      <span
        className={
          catalogFilter === "undisclosed"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => setCatalogFilter("undisclosed")}
      >
        UNDISCLOSED
      </span>
      <span
        className={
          catalogFilter === "debris"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => setCatalogFilter("debris")}
      >
        DEBRIS
      </span>
      <span
        className={
          catalogFilter === "latest"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => setCatalogFilter("latest")}
      >
        LATEST
      </span>
      <span
        className={
          catalogFilter === "all"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => setCatalogFilter("all")}
      >
        ALL
      </span>
    </div>
  );
}
