import React from "react";
import { NavLink } from "react-router-dom";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";
import { emails } from "../app/app-helpers";

export default function Submit() {
  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      <p className="submit__sub-header">Submit preformatted data</p>
      <MultipleObservationForm />
      <div>
        <p className="submit__text">
          Or submit observations to{" "}
          <a href={`mailto:${emails.submit}`} className="submit__link-text">
            {emails.submit}
          </a>
        </p>
        <NavLink to="/how">
          <p className="submit__link-text">Help</p>
        </NavLink>
      </div>
    </div>
  );
}
