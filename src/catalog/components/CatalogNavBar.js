import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";

function CatalogNavBar({ setRange, history }) {
  const { catalogFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  const updateTableData = () => {
    catalogDispatch({ type: "SET_SHOW_TABLE", payload: false });

    axios
      .get(`https://api.consensys.space:8080/catalog/${catalogFilter}`)
      .then(result => {
        catalogDispatch({ type: "SET_TABLE_DATA", payload: result.data });
        catalogDispatch({ type: "SET_SHOW_TABLE", payload: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          catalogDispatch({
            type: "SET_CATALOG_FILTER",
            payload: "priorities"
          });
          updateTableData();
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
          catalogDispatch({
            type: "SET_CATALOG_FILTER",
            payload: "undisclosed"
          });
          updateTableData();
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
          catalogDispatch({
            type: "SET_CATALOG_FILTER",
            payload: "debris"
          });
          updateTableData();
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
          catalogDispatch({
            type: "SET_CATALOG_FILTER",
            payload: "latest"
          });
          updateTableData();
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
          catalogDispatch({
            type: "SET_CATALOG_FILTER",
            payload: "all"
          });
          updateTableData();
          history.push("/catalog/all");
        }}
      >
        ALL
      </span>
    </div>
  );
}

export default withRouter(CatalogNavBar);
