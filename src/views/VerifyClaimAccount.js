import React, { useState } from "react";
import axios from "axios";

export default function VerifyClaimAccount({ match }) {
  console.log(match.params.jwt);
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // /verifyClaimAccount
  // takes in encryptedWallet, address, and secret needed to verify (is taken from the URL)
  const verifyClaimAccount = () => {
    axios
      .post(
        `https://api.consensys.space:8080/claimAccount`,
        JSON.stringify({
          email: "0x5C760Ba09C12E4fd33be49f1B05E6E1e648EB312",
          jwt: match.params.jwt
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
        <span className="app__white-button--small" onClick={verifyClaimAccount}>
          Submit
        </span>
      </form>
      {showMessage ? (
        <p className="claim-account__message">
          Check your email for further instructions!
        </p>
      ) : null}
    </div>
  );
}
