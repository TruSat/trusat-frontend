import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../auth/auth-context";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";

export default function Submit() {
  const { jwt } = useAuthState();

  const [pastedIODs, setPastedIODs] = useState(``);

  const handleSubmit = async () => {
    const arrayOfIODs = pastedIODs.split("\n");

    axios
      .post(
        `https://api.consensys.space:8080/submitObservation`,
        JSON.stringify({ jwt: jwt, multiple: arrayOfIODs, single: {} })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">Submit Observations</h1>
      <p className="submit__sub-header">Submit preformatted data</p>

      <div className="submit__form-button-wrapper">
        <MultipleObservationForm
          pastedIODs={pastedIODs}
          setPastedIODs={setPastedIODs}
        />
        <div>
          <div className="submit__button-wrapper">
            <NavLink className="app__nav-link" to="/catalog/priorities">
              <span className="app__black-button--small submit__cancel-button">
                CANCEL
              </span>
            </NavLink>
            &nbsp;
            <span className="app__white-button--small" onClick={handleSubmit}>
              SUBMIT
            </span>
          </div>
          <p className="submit__info-text">
            Submit multiple observations at once, in IOD, RDE and UK formats.
          </p>
          <NavLink to="/how">
            <p className="submit__link-text">Help</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
