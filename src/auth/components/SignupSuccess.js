import React from "react";
import { NavLink } from "react-router-dom";

export default function SignupSuccess({ address }) {
  return (
    <div>
      <p className="sign-up-success__message-text">
        Next, try filling out your user profile
        <br />
        You can start by picking a username
      </p>

      <NavLink to={`/profile/${address}`}>
        <span className="app__button--white">Go to Profile</span>
      </NavLink>
    </div>
  );
}
