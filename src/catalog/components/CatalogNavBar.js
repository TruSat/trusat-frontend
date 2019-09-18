import React from "react";
import { withRouter } from "react-router-dom";
import FilterDescription from "./FilterDescription";
import { useCatalogDispatch } from "../catalog-context";

function CatalogNavBar({ setRange, history, match }) {
  const catalogFilter = match.params.catalogFilter;
  const catalogDispatch = useCatalogDispatch();

  return (
    <section>
      <div className="catalog-nav-bar__wrapper">
        <span
          className={
            catalogFilter === "priorities"
              ? "catalog-nav-bar__link--highlight"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => {
            setRange({ start: 0, end: 10 });
            catalogDispatch({
              type: "SET_CATALOG_FILTER",
              payload: "priorities"
            });
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
            setRange({ start: 0, end: 10 });
            catalogDispatch({
              type: "SET_CATALOG_FILTER",
              payload: "undisclosed"
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
            catalogDispatch({ type: "SET_CATALOG_FILTER", payload: "debris" });
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
            setRange({ start: 0, end: 10 });
            catalogDispatch({ type: "SET_CATALOG_FILTER", payload: "latest" });
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
            setRange({ start: 0, end: 10 });
            catalogDispatch({ type: "SET_CATALOG_FILTER", payload: "all" });
            history.push("/catalog/all");
          }}
        >
          ALL
        </span>
      </div>
      <FilterDescription />
    </section>
  );
}

export default withRouter(CatalogNavBar);
