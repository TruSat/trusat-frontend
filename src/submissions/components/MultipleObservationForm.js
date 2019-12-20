import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_ROOT } from "../../app/app-helpers";
import { checkAuthExpiry } from "../../auth/auth-helpers";
import { useAuthState } from "../../auth/auth-context";
import Spinner from "../../app/components/Spinner";
import CircleCheck from "../../assets/CircleCheck.svg";
import ReactGA from "react-ga";

export default function MultipleObservationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [pastedIODs, setPastedIODs] = useState(``);
  // server provides a count of accepted IODs - i.e. correct format and not duplicates
  const [successCount, setSuccessCount] = useState(null);
  // server provides these so we can render more specific error messages
  const [errorMessages, setErrorMessages] = useState([]);
  const { authExpiry } = useAuthState();
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);
    setSuccessCount(null);
    setErrorMessages([]);

    // check if jwt is valid and hasn't expired before submission
    await checkAuthExpiry(authExpiry);

    try {
      const result = await axios.post(
        `${API_ROOT}/submitObservation`,
        JSON.stringify({ multiple: pastedIODs })
      );
      setPastedIODs("");

      if (result.data.success !== 0) {
        setSuccessCount(result.data.success);
        ReactGA.event({
          category: "Submissions",
          action: "User clicked submit on MultipleObservationForm",
          label: "Submission Success"
        });
      } else if (result.data.error_messages.length !== 0) {
        setErrorMessages(result.data.error_messages);
        ReactGA.event({
          category: "Submissions",
          action: "User clicked submit on MultipleObservationForm",
          label: "Submission Failure"
        });
      }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {jwt === "none" ? (
        <p className="app__error-message">
          You need to be logged in to submit your observations.
        </p>
      ) : null}
      <form
        className="multiple-observation-form"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div style={{ display: "block" }}>
          <textarea
            required
            className="multiple-observation-form__textarea"
            placeholder={`Paste your observations in this field, one observation per line like so:
          
12345 98 123A   2007 G 20081122112233444 56 14 1122334+112233 39 S
12345 98 123A   2007 F 2008112211223344  56 25 1122   +1122   28 R+05  1
12345 98 123A   2007 P 200811221122334   27 35 11223  +112    27 S+070 10
12345 98 123LEO 2007 B 20081122112233    18 75 1122334+112222 36 V+110 1
12345 98 123UNK 2007 F 200811221122000   27                      B-005 05
12345 98 123UNK 2007 F 20081122112233444 28                      V+095 05
12345 98 123UNK 2007 F 200811221123400   27                      P-010 05  10000
                2007 O 20081122
                2007 C 200811231130`}
            value={pastedIODs}
            onChange={event => setPastedIODs(event.target.value)}
            rows="10"
            cols="80"
          />

          {/* Success message */}
          {successCount > 0 ? (
            <div className="app__success-message">
              <img
                className="multiple-observation-form__image"
                src={CircleCheck}
                alt="check"
              ></img>
              Thank you for your submission of {successCount}{" "}
              {successCount === 1 ? "observation" : "observations"}!
            </div>
          ) : null}

          {/* Failure messages */}
          {errorMessages.length > 0 ? (
            <Fragment>
              <p className="app__error-message">Something went wrong!</p>
              {errorMessages.map(message => {
                return <p className="app__error-message">{message}</p>;
              })}
            </Fragment>
          ) : null}
        </div>

        {isError ? (
          <p className="app__error-message">Something went wrong...</p>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <div className="multiple-observation-form__button-wrapper">
              <NavLink className="app__nav-link" to="/submit/single">
                <span className="submit__single-observation-nav-button app__hide-on-mobile app__hide-on-tablet">
                  Or enter individual observation
                </span>
              </NavLink>

              {jwt === "none" ? null : (
                <button
                  type="submit"
                  className="submit__submit-button"
                  style={pastedIODs ? { opacity: "1" } : { opacity: "0.5" }}
                >
                  SUBMIT
                </button>
              )}
            </div>
            {jwt === "none" ? null : (
              <p className="submit__submit-warning">
                Please keep in mind that this data will be automatically
                recorded into TruSat's catalog of orbital positions, and
                factored into orbital predictions for this object.
              </p>
            )}
          </Fragment>
        )}
      </form>
    </Fragment>
  );
}
