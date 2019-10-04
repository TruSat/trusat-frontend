import React, { useState, Fragment } from "react";
import SignupForm from "./SignupForm";
import MetaMask from "./MetaMask";

export default function SignupOptions() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="sign-up-options__wrapper">
      {isSuccess ? (
        <Fragment>
          <p className="app__success-message">
            Thanks for signing up! Last step is to check the email we just sent
            you and follow the instructions to confirm your identity
          </p>
        </Fragment>
      ) : (
        <SignupForm setIsSuccess={setIsSuccess} />
      )}

      <div className="sign-up-options__metamask-button-wrapper app__hide-on-mobile">
        {window.ethereum ? (
          <React.Fragment>
            <p className="sign-up-options__metamask-button-wrapper-text">Or:</p>
            <MetaMask buttonText={`Sign up with MetaMask`} />
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
}
