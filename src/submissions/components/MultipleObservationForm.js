import React, { useState, Fragment } from "react";
import axios from "axios";
import { API_ROOT } from "../../app/helpers";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt
} from "../../auth/helpers";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../auth/auth-context";
import Spinner from "../../app/components/Spinner";
import CircleCheck from "../../assets/CircleCheck.svg";
// import { useUserDispatch } from "../../user/user-context";

export default function MultipleObservationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [pastedIODs, setPastedIODs] = useState(`la
la
la
28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S`);
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

    const arrayOfIODs = pastedIODs.split("\n");

    try {
      const result = await axios.post(
        `${API_ROOT}/submitObservation`,
        JSON.stringify({ jwt: submissionJwt, multiple: arrayOfIODs })
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
          
28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S`}
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

// IODs
// 28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
// 28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
// 28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
// 28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
// 28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
// 28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S
