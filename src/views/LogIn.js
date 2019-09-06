import React from "react";
import { NavLink } from "react-router-dom";
import LoginOptions from "../auth/components/LoginOptions";
import { useAuthState } from "../auth/auth-context";
import { useUserState } from "../user/user-context";

export default function LogIn() {
  const { isAuth } = useAuthState();
  const { userData } = useUserState();

  return (
    <div className="log-in__wrapper">
      <h1 className="log-in__header">
        {isAuth ? "YOU'RE LOGGED IN" : "LOG IN"}
      </h1>
      {isAuth ? (
        <div className="login__success-wrapper">
          <NavLink to={`/profile/${userData.user_address}`}>
            <span className="app__button--white">Go to Profile</span>
          </NavLink>
        </div>
      ) : (
        <LoginOptions />
      )}
    </div>
  );
}
