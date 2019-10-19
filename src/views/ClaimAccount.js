import React, { useState, useEffect } from "react";
import { useTrusatPostApi } from "../app/app-helpers";
import Spinner from "../app/components/Spinner";

export default function ClaimAccount() {
  const [email, setEmail] = useState("");
  const [{ isLoading, isError, data }, doPost, withData] = useTrusatPostApi();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNotSuccess, setIsNotSuccess] = useState(false);

  useEffect(() => {
    // tell user to check their email
    if (data.result === true && !isError) {
      setIsSuccess(true);
    }
    // tell user TruSat does not have anything on file for that email address
    if (data.result === false && !isError) {
      setIsNotSuccess(true);
    }
  }, [data, isError]);

  const claimAccount = async () => {
    setIsSuccess(false);
    setIsNotSuccess(false);

    await doPost(`/claimAccount`);
    await withData(
      JSON.stringify({
        email: email
      })
    );
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
      {isNotSuccess ? (
        <p className="claim-account__message">
          The email you provided does not have an account with TruSat!
        </p>
      ) : null}
      {isError ? (
        <p className="app__error-message">Something went wrong...</p>
      ) : null}
    </div>
  );
}
