import React, { useState } from "react";
import axios from "axios";
import { createWallet, createSecret } from "../auth/helpers";

export default function VerifyClaimAccount({ match }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const verifyClaimAccount = () => {
    const wallet = createWallet();
    const secret = createSecret(wallet.signingKey.privateKey, password);

    axios
      .post(
        `https://api.consensys.space:8080/verifyClaimAccount`,
        JSON.stringify({
          jwt: match.params.jwt,
          address: wallet.signingKey.address,
          secret: secret
        })
      )
      .then(result => {
        console.log(result);
        setShowMessage(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="verify-claim-account__wrapper">
      <h1 className="verify-claim-account__header">Verify Claimed Account</h1>
      <form className="email-form">
        <label className="email-form__label">PASSWORD</label>
        <input
          className="email-form__input"
          type="password"
          onChange={event => setPassword(event.target.value)}
          value={password}
        ></input>
        <label className="email-form__label">RE-ENTER PASSWORD</label>
        <input
          className="email-form__input"
          type="password"
          onChange={event => setPassword2(event.target.value)}
          value={password2}
        ></input>
        <span className="app__white-button--small" onClick={verifyClaimAccount}>
          Submit
        </span>
      </form>
      {showMessage ? (
        <p className="claim-account__message">
          Your have now claimed ownership of your TruSat account! We have
          emailed you a "secret" that will be required along with your email and
          password to log in from now on.
        </p>
      ) : null}
    </div>
  );
}
