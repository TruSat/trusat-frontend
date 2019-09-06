import React from "react";
import { NavLink } from "react-router-dom";
import { useUserState } from "../../user/user-context";

export default function SignupSuccess() {
  const { userAddress } = useUserState();

  return (
    <div>
      <p className="sign-up-success__message-text">
        Next, try filling out your user profile
        <br />
        You can start by picking a username
      </p>

      <NavLink to={`/profile/${userAddress}`}>
        <span className="app__button--white">Go to Profile</span>
      </NavLink>
    </div>
  );
}
