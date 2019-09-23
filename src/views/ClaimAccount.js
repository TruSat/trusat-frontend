import React, { useState } from "react";
import axios from "axios";
import { API_ROOT } from "../app/helpers";

export default function ClaimAccount() {
  const [email, setEmail] = useState("john.gribbin@consensys.net");
  const [showMessage, setShowMessage] = useState(false);

  const claimAccount = async () => {
    await axios
      .post(
        `${API_ROOT}/claimAccount`,
        JSON.stringify({
          email: email
        })
      )
      .then(result => {
        console.log(result);
        setShowMessage(true);
      })
      .catch(err => console.log(err));

    setEmail("");
  };
  return (
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
      {showMessage ? (
        <p className="claim-account__message">
          Check your email for further instructions!
        </p>
      ) : null}
    </div>
  );
}
