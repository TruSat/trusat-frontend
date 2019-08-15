import React from "react";
import { useAuthState } from "../auth-context";

import SignupForm from "./SignupForm";

import MetaMask from "./MetaMask";
import Burner from "./Burner";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="login-options__wrapper">
          <SignupForm />
          <div>
            <MetaMask />
            <Burner />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
