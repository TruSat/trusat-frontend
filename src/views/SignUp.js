import React from "react";
import SignupOptions from "../auth/components/SignupOptions";
import SignupSuccess from "../auth/components/SignupSuccess";
import { useUserState } from "../user/user-context";

export default function SignUp() {
  const { userAddress } = useUserState();

  return (
    <div className="sign-up__wrapper">
      <h1 className="sign-up__header">
        {userAddress ? "YOU'RE IN" : "SIGN UP"}
      </h1>
      {userAddress ? <SignupSuccess /> : <SignupOptions />}
    </div>
  );
}
