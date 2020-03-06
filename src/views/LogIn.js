import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import LoginOptions from "../auth/components/LoginOptions";
import { useAuthState } from "../auth/auth-context";

export default function LogIn() {
  const { userAddress } = useAuthState();

  return (
    <div className="log-in__wrapper">
      <h1 className="log-in__header">
        {userAddress !== "none" ? "You're logged in" : "Log in"}
      </h1>
      {userAddress !== "none" ? (
        <div className="login__success-wrapper">
          <NavLink className="app__nav-link" to={`/profile/${userAddress}`}>
            <span className="app__button--white">Go to Profile</span>
          </NavLink>
        </div>
      ) : (
        <Fragment>
          <LoginOptions />
        </Fragment>
      )}
    </div>
  );
}
