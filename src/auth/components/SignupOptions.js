import React from "react";
import SignupForm from "./SignupForm";
import MetaMask from "./MetaMask";

export default function LoginOptions() {
  return (
    <div className="sign-up-options__wrapper">
      <SignupForm />
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
