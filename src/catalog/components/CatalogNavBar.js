import React from "react";
import { withRouter } from "react-router-dom";

function CatalogNavBar({ catalogFilter, setCatalogFilter, setRange, history }) {
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
          history.push("/catalog/priorities");
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
          history.push("/catalog/undisclosed");
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
          history.push("/catalog/debris");
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
          history.push("/catalog/latest");
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
          history.push("/catalog/all");
        }}
      >
        ALL
      </span>
    </div>
  );
}

export default withRouter(CatalogNavBar);
