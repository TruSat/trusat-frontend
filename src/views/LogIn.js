import React from "react";
import LoginOptions from "../auth/components/LoginOptions";

export default function LogIn() {
  return (
    <div className="log-in__wrapper">
      <h1 className="log-in__header">LOG IN</h1>
      <LoginOptions />
    </div>
  );
}
