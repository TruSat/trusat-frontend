import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { useTrusatGetApi } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";
import CatalogNavBar from "../catalog/components/CatalogNavBar";
import CatalogTable from "../catalog/components/CatalogTable";
import CatalogNavDropdown from "../catalog/components/CatalogNavDropdown";
import HowToParticipate from "../catalog/components/HowToParticipate";
import DownloadCatalogFilterTleButton from "../catalog/components/DownloadCatalogFilterTleButton";
import ActivityMonitor from "../catalog/components/ActivityMonitor";
import { NavLink } from "react-router-dom";

function Catalog({ match }) {
  const catalogFilter = match.params.catalogFilter;
  const [dataStart, setDataStart] = useState(0);
  // Used by TablePaginator component rendered under the CatalogTable
  const [range, setRange] = useState({ start: 0, end: 10 });

  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();
  const [objects, setObjects] = useState([]);
  const [objectCount, setObjectCount] = useState(0);
  const [tleCount, setTleCount] = useState(0);

  useEffect(() => {
    doFetch(`/catalog/${catalogFilter}/${dataStart}`);

    if (Object.keys(data).length !== 0) {
      const { objects, object_count, tle_count } = data;

      setObjects(objects);
      setObjectCount(object_count);
      setTleCount(tle_count);
    }
  }, [catalogFilter, dataStart, doFetch, data]);

  return (
    <div className="catalog__wrapper">
      <div className="catalog__header-wrapper">
        <h1 className="catalog__header">Catalog</h1>
        {/* Grid spacing */}
        <span className="app__show-on-desktop" />
        <div className="catalog__header-buttons-wrapper app__show-on-desktop">
          {/* show the download button after it is confirmed tles are available for download */}
          {isLoading ? null : (
            <DownloadCatalogFilterTleButton
              catalogFilter={catalogFilter}
              tleCount={tleCount}
            />
          )}

          <NavLink className="app__nav-link" to="/submit">
            <span className="catalog__button catalog__get-data-button">
              Submit observations
            </span>
          </NavLink>

          <span className="app__nav-link">
            <a
          className="catalog__button catalog__get-data-button"
          href="https://keeptrack.space/?trusat"
          target="_blank"
          rel="noopener noreferrer"
        >
          See orbits
        </a>
          </span>
        </div>
      </div>

      {/* Shown on mobile  */}
      <section className="app__show-on-mobile">
        <HowToParticipate catalogFilter={catalogFilter} />
        {/* Mobile Navigation of Catalog */}
        <CatalogNavDropdown
          catalogFilter={catalogFilter}
          setRange={setRange}
          setDataStart={setDataStart}
        />
      </section>

      <section className="catalog__nav-bar-how-to-wrapper">
        <div>
          {/* Desktop navigation of Catalog */}
          <CatalogNavBar
            isLoadingCatalog={isLoading}
            catalogFilter={catalogFilter}
            setRange={setRange}
            dataStart={dataStart}
            setDataStart={setDataStart}
            objectCount={objectCount}
            setTleCount={setTleCount}
          />
        </div>
        {/* Grid spacing */}
        <span />
        {/* Shown on desktop */}
        <div className="app__show-on-desktop">
          <HowToParticipate catalogFilter={catalogFilter} />
        </div>
      </section>

      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {errorMessage ? (
            <p className="app__error-message">
              Something went wrong... {errorMessage}
            </p>
          ) : (
            <div className="catalog__table-activity-wrapper">
              <CatalogTable
                catalogFilter={catalogFilter}
                catalogObjects={objects}
                isLoading={isLoading}
                errorMessage={errorMessage}
                range={range}
                setRange={setRange}
                dataStart={dataStart}
                setDataStart={setDataStart}
              />
              {/* Grid spacing */}
              <span className="app__show-on-desktop" />
              <ActivityMonitor />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default withRouter(Catalog);
