import React, { Fragment } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";
import SingleObservationForm from "../submissions/components/SingleObservationForm";
import { emails } from "../app/app-helpers";

export default function Submit() {
  const { url } = useRouteMatch();

  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      {/* Render multiple submission form */}
      {url === "/submit" || url === "/submit/multiple" ? (
        <Fragment>
          <div className="submit__sub-header-wrapper">
            <h2>Enter pre-formatted data</h2>
            <NavLink
              className="app__nav-link submit__link-text"
              to="/settings/stations"
            >
              Add a station location
            </NavLink>
          </div>

          <MultipleObservationForm />
          <div>
            <p className="submit__text">
              Or submit observations to{" "}
              <a href={`mailto:${emails.submit}`} className="submit__link-text">
                {emails.submit}
              </a>
            </p>
            <NavLink className="app__nav-link" to="/how">
              <p className="submit__link-text">Help</p>
            </NavLink>
          </div>
        </Fragment>
      ) : // Render single submission form
      url === "/submit/single" ? (
        <Fragment>
          <div className="submit__sub-header-wrapper">
            <h2>Enter an individual observation</h2>
            <NavLink
              className="app__nav-link submit__link-text"
              to="/settings/stations"
            >
              Add a station location
            </NavLink>
          </div>
          <SingleObservationForm />
        </Fragment>
      ) : (
        <h3 className="app__error-message">
          <code>{url}</code> is not a route in TruSat. Please check that you
          entered the correct URL
        </h3>
      )}
    </div>
  );
}
