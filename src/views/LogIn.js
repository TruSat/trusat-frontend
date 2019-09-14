import React from "react";
import { NavLink } from "react-router-dom";
import LoginOptions from "../auth/components/LoginOptions";
import { useUserState } from "../user/user-context";

export default function LogIn() {
  const { userAddress } = useUserState();

  return (
    <div className="log-in__wrapper">
      <h1 className="log-in__header">
        {userAddress ? "YOU'RE LOGGED IN" : "LOG IN"}
      </h1>
      {userAddress ? (
        <div className="login__success-wrapper">
          <NavLink className="app__nav-link" to={`/profile/${userAddress}`}>
            <span className="app__button--white">Go to Profile</span>
          </NavLink>
        </div>
      ) : (
        <LoginOptions />
      )}
    </div>
  );
}
