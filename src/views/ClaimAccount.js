import React, { useState } from "react";
import axios from "axios";
import { API_ROOT } from "../app/helpers";
import Spinner from "../app/components/Spinner";

export default function ClaimAccount() {
  const [email, setEmail] = useState("john.gribbin@consensys.net");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const claimAccount = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      await axios.post(
        `${API_ROOT}/claimAccount`,
        JSON.stringify({
          email: email
        })
      );
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
    setEmail("");
  };
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="claim-account__wrapper">
      <h1 className="claim-account__header">Claim Account</h1>
      <form
        className="email-form"
        onSubmit={event => {
          event.preventDefault();
          claimAccount();
        }}
      >
        <label className="email-form__label">EMAIL</label>
        <input
          required
          className="email-form__input"
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
      {isError ? (
        <p className="app__error-message">Something went wrong...</p>
      ) : null}
    </div>
  );
}
