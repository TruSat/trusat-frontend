import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../auth/auth-context";

export default function SignupSuccess() {
  const { userAddress } = useAuthState();

  return (
    <div>
      <p className="sign-up-success__message-text">
        Next, try filling out your user profile
        <br />
        You can start by picking a username
      </p>

      <NavLink className="app__nav-link" to={`/profile/${userAddress}`}>
        <span className="app__button--white">Go to Profile</span>
      </NavLink>
    </div>
  );
}
