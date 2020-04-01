import React from "react";
import { NavLink } from "react-router-dom";
import SignupOptions from "../auth/components/SignupOptions";
import { useAuthState } from "../auth/auth-context";

export default function SignUp() {
  const { userAddress } = useAuthState();

  return (
    <div className="sign-up__wrapper">
      <h1 className="sign-up__header">
        {userAddress !== undefined ? "YOU'RE IN" : "Sign Up"}
      </h1>
      {userAddress !== undefined ? (
        <div className="login__success-wrapper">
          <NavLink className="app__nav-link" to={`/profile/${userAddress}`}>
            <span className="app__button--white">Go to Profile</span>
          </NavLink>
        </div>
      ) : (
        <SignupOptions />
      )}
    </div>
  );
}
