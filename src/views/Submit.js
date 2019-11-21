import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";
import SingleObservationForm from "../submissions/components/SingleObservationForm";
import { emails } from "../app/app-helpers";
import { useAuthState } from "../auth/auth-context";

export default function Submit() {
  const [showSingleObservationForm, setShowSingleObservationForm] = useState(
    false
  );
  const { jwt } = useAuthState();

  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      {showSingleObservationForm ? (
        <Fragment>
          <h2 className="submit__sub-header">
            Enter an individual observation
          </h2>
          <SingleObservationForm
            setShowSingleObservationForm={setShowSingleObservationForm}
          />
        </Fragment>
      ) : (
        <Fragment>
          <h2 className="submit__sub-header">Enter pre-formatted data</h2>
          <MultipleObservationForm
            setShowSingleObservationForm={setShowSingleObservationForm}
          />
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
      )}
    </div>
  );
}
