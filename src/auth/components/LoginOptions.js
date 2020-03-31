import React from "react";
import LoginForm from "./LoginForm";
import MetaMask from "./MetaMask";

export default function LoginOptions() {
  return (
    <React.Fragment>
      <div className="log-in-options__wrapper">
        <LoginForm />
        <div className="log-in-options__metamask-button-wrapper app__hide-on-mobile">
          <React.Fragment>
            <p className="log-in-options__metamask-button-wrapper-text">Or:</p>
            <MetaMask buttonText={"Log in with MetaMask"} />
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
}
