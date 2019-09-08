import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../auth/auth-context";
import MultipleObservationForm from "../submissions/components/MultipleObservationForm";

export default function Submit() {
  const { jwt } = useAuthState();

  const [
    pastedIODs,
    setPastedIODs
  ] = useState(`28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S`);

  const handleSubmit = async () => {
    const arrayOfIODs = pastedIODs.split("\n");

    axios
      .post(
        `https://api.consensys.space:8080/submitObservation`,
        // iod - will be a single iod
        // iods - will be a bunch of iods that will need to be parsed on backend
        JSON.stringify({ jwt: jwt, multiple: arrayOfIODs, single: {} })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="submit__wrapper">
      <h1 className="submit__header">SUBMIT OBSERVATIONS</h1>
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
