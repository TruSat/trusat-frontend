import React, { useState, Fragment } from "react";
import axios from "axios";
import { API_ROOT } from "../../app/helpers";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../../auth/auth-helpers";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../auth/auth-context";
import Spinner from "../../app/components/Spinner";
import CircleCheck from "../../assets/CircleCheck.svg";

export default function MultipleObservationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [pastedIODs, setPastedIODs] = useState(``);
  const [successCount, setSuccessCount] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const { jwt } = useAuthState();

  const getBurnerJwt = async () => {
    const wallet = createWallet();

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    return jwt;
  };

  const handleSubmit = async () => {
    setPastedIODs("");
    setIsLoading(true);

    let submissionJwt = "";

    if (jwt === "none") {
      submissionJwt = await getBurnerJwt();
    } else {
      submissionJwt = jwt;
    }
    // const arrayOfIODs = pastedIODs.split("\n");

    try {
      const result = await axios.post(
        `${API_ROOT}/submitObservation`,
        JSON.stringify({ jwt: submissionJwt, multiple: pastedIODs })
      );

      if (result.data.success !== 0) {
        setSuccessCount(result.data.success);
      } else if (result.data.error_messages.length !== 0) {
        setErrorMessages(result.data.error_messages);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
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
          // TODO - better placeholder text, and placeholder IODs that aren't user specific.
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

        {/* Failure message */}
        {errorMessages.length > 0 ? (
          <Fragment>
            <p className="app__error-message">Something went wrong!</p>
            {errorMessages.map(message => {
              return <p className="app__error-message">{message}</p>;
            })}
          </Fragment>
        ) : null}
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="multiple-observation-form__button-wrapper">
          <NavLink className="app__nav-link" to="/catalog/priorities">
            <span className="app__black-button--small multiple-observation-form__cancel-button">
              CANCEL
            </span>
          </NavLink>
          &nbsp;
          <button type="submit" className="app__white-button--small">
            SUBMIT
          </button>
        </div>
      )}
    </form>
  );
}
