import React from "react";
import { NavLink } from "react-router-dom";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";

export default function Submit() {
  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      <p className="submit__sub-header">Submit preformatted data</p>
      <MultipleObservationForm />

      <NavLink to="/how">
        <p className="submit__link-text">Help</p>
      </NavLink>
    </div>
  );
}
