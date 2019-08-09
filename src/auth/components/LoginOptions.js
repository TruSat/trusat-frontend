import React from "react";
import { useAuthState } from "../auth-context";
import FormContainer from "./FormContainer";
import MetaMask from "./MetaMask";
import Burner from "./Burner";

export default function LoginOptions() {
  const { isAuth } = useAuthState();

  return (
    <React.Fragment>
      {isAuth ? null : (
        <div className="login-options__wrapper">
          <h1 className="login-options__header">Login Options</h1>
          <FormContainer />
          <div>
            <MetaMask />
            <Burner />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
