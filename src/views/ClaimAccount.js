import React, { useState } from "react";
import axios from "axios";
import { API_ROOT } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";

export default function ClaimAccount() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotSuccess, setIsNotSuccess] = useState(false);

  const claimAccount = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsNotSuccess(false);

    try {
      const response = await axios.post(
        `${API_ROOT}/claimAccount`,
        JSON.stringify({
          email: email
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.result === true && !errorMessage) {
        setIsSuccess(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data);
    }
    setEmail("");
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="claim-account__wrapper">
      <h1 className="claim-account__header">Claim Account</h1>
      <form
        className="app__form"
        onSubmit={event => {
          event.preventDefault();
          claimAccount();
        }}
      >
        <label className="app__form__label">EMAIL</label>
        <input
          required
          className="app__form__input"
          type="email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        ></input>
        <button className="app__white-button--small">Submit</button>
      </form>
      {isSuccess ? (
        <p className="claim-account__message">
          Check your email for further instructions!
        </p>
      ) : null}
      {isNotSuccess ? (
        <p className="claim-account__message">
          The email you provided does not have an account with TruSat!
        </p>
      ) : null}
      {errorMessage ? (
        <p className="app__error-message">
          Something went wrong... {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
