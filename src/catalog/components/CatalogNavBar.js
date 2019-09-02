import React from "react";

export default function CatalogNavBar({
  catalogFilter,
  setCatalogFilter,
  setRange
}) {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", margin: "1em" }}
    >
      <span
        className={
          catalogFilter === "priorities"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          setCatalogFilter("priorities");
        }}
      >
        PRIORITIES
      </span>
      <span
        className={
          catalogFilter === "undisclosed"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          setCatalogFilter("undisclosed");
        }}
      >
        UNDISCLOSED
      </span>
      <span
        className={
          catalogFilter === "debris"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          setCatalogFilter("debris");
        }}
      >
        DEBRIS
      </span>
      <span
        className={
          catalogFilter === "latest"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          setCatalogFilter("latest");
        }}
      >
        LATEST
      </span>
      <span
        className={
          catalogFilter === "all"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        onClick={() => {
          setRange({ start: 0, end: 20 });
          setCatalogFilter("all");
        }}
      >
        ALL
      </span>
    </div>
  );
}
