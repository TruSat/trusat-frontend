import React from "react";
import { useAuthState } from "../auth-context";
import SignupForm from "./SignupForm";
import MetaMask from "./MetaMask";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="sign-up-options__email-metamask-wrapper">
          <SignupForm />
          <MetaMask />
        </div>
      )}
    </React.Fragment>
  );
}
