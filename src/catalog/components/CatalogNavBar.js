import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import { useTrusatGetApi } from "../../app/app-helpers";
import IconArrowUp from "../../assets/icon-arrow-up.svg";
import IconRocket from "../../assets/icon-rocket.svg";
import IconLock from "../../assets/icon-lock.svg";
import IconTrash from "../../assets/icon-trash.svg";
import Spinner from "../../app/components/Spinner";
import FilterDescription from "./FilterDescription";

function CatalogNavBar({
  isLoadingCatalog,
  catalogFilter,
  objectCount,
  setRange,
  setDataStart,
  history,
  setTleCount,
}) {
  const [showMore, setShowMore] = useState(false);
  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch("/catalog/list");
  }, [data, doFetch]);

  // renders the celestrak categories received from API to the "more" dropdown
  const renderCelestrakCategories = () => {
    if (data.length !== 0) {
      return data.data.map((group) => (
        <div
          key={`${group.groupHeader.path}`}
          className="catalog-more-dropdown__group"
        >
          <h1
            className="catalog-more-dropdown__group-header"
            onClick={() => {
              setShowMore(false);
              setTleCount(0); // hides the download TLEs button until it is confirmed that TLEs are available
              setRange({ start: 0, end: 10 });
              setDataStart(0);
              history.push(`/catalog/${group.groupHeader.path}`);
            }}
          >
            {group.groupHeader.title}
          </h1>

          {group.groupCategories.map((category) => (
            <p
              key={`${category.path}`}
              onClick={() => {
                setShowMore(false);
                setTleCount(0);
                setRange({ start: 0, end: 10 });
                setDataStart(0);
                history.push(`/catalog/${category.path}`);
              }}
              className="catalog-more-dropdown__link"
            >
              {category.title}
            </p>
          ))}
        </div>
      ));
    }
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
            setTleCount(0);
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "priorities",
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
            setTleCount(0);
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "latest",
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
            setTleCount(0);
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "undisclosed",
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
            setTleCount(0);
            setRange({ start: 0, end: 10 });
            setDataStart(0);
            ReactGA.event({
              category: "Catalog",
              action: "User chose a filter",
              label: "debris",
            });
            history.push("/catalog/debris");
          }}
        >
          <img className="catalog__icon" src={IconTrash} alt="icon"></img>
          <span className="catalog-filter-label">DEBRIS</span>
        </div>

        <div
          className={
            showMore
              ? "catalog-more-dropdown__more-text"
              : "catalog-nav-bar__link--lowlight"
          }
          onClick={() => setShowMore(!showMore)}
        >
          <span className="catalog-filter-label">MORE</span>
        </div>
      </section>
      {showMore ? (
        <section className="catalog-more-dropdown">
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="app__error-message">
              Something went wrong loading the filter options... {errorMessage}
            </p>
          ) : (
            renderCelestrakCategories()
          )}
        </section>
      ) : null}

      {isLoadingCatalog ? null : (
        <FilterDescription
          catalogFilter={catalogFilter}
          celestrakCategories={data.data}
          objectCount={objectCount}
        />
      )}
    </React.Fragment>
  );
}

export default withRouter(CatalogNavBar);
