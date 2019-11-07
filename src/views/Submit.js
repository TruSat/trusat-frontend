import React from "react";
import { NavLink } from "react-router-dom";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";
import SingleObservationForm from "../submissions/components/SingleObservationForm";
import { emails } from "../app/app-helpers";

export default function Submit() {
  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      {/* <h2 className="submit__sub-header">Submit preformatted data</h2>
      <MultipleObservationForm /> */}
      {/* <div>
        <p className="submit__text">
          Or submit observations to{" "}
          <a href={`mailto:${emails.submit}`} className="submit__link-text">
            {emails.submit}
          </a>
        </p>
        <NavLink to="/how">
          <p className="submit__link-text">Help</p>
        </NavLink>
      </div> */}
      <h2 className="submit__sub-header">Or enter an individual observation</h2>
      <SingleObservationForm />
    </div>
  );
}
