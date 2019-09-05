import React from "react";
import { useAuthState } from "../auth-context";
import SignupForm from "./SignupForm";
import MetaMask from "./MetaMask";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="sign-up-options__wrapper">
          <SignupForm />
          <div className="sign-up-options__metamask-button-wrapper">
            <p className="sign-up-options__metamask-button-wrapper-text">Or:</p>
            <MetaMask />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
