import React from "react";
import SignupOptions from "../auth/components/SignupOptions";
import SignupSuccess from "../auth/components/SignupSuccess";
import { useAuthState } from "../auth/auth-context";

export default function SignUp() {
  const { isAuth, address } = useAuthState();

  return (
    <div className="sign-up__wrapper">
      <h1 className="sign-up__header">{isAuth ? "YOU'RE IN" : "SIGN UP"}</h1>
      {isAuth ? <SignupSuccess address={address} /> : <SignupOptions />}
    </div>
  );
}
