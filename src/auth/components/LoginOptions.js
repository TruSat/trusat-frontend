import React from "react";
import { useAuthState } from "../auth-context";
import LoginForm from "./LoginForm";
import MetaMask from "./MetaMask";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="log-in-options__wrapper">
          <LoginForm />
          <div className="log-in-options__metamask-button-wrapper">
            <p className="log-in-options__metamask-button-wrapper-text">Or:</p>
            <MetaMask />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
