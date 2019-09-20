import React from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import { useAuthState } from "../../auth/auth-context";

export default function StepFive({ step }) {
  const { authType } = useAuthState();

  return (
    <React.Fragment>
      {step >= 5 ? (
        <div className="metamask-import__step-header-wrapper">
          {authType === "metamask" ? (
            <img
              className="metamask-import__circle-check"
              src={CircleCheck}
              alt="circled check"
            ></img>
          ) : null}
          <h2
            className={
              authType === "metamask"
                ? "metamask-import__step-header--done"
                : "metamask-import__step-header--todo"
            }
          >
            Step 5: Sign the message
          </h2>
        </div>
      ) : null}

      {/* The success message */}
      {authType === "metamask" ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            Congrats you have now successfully migrated your account to MetaMask
            and signed in!
          </p>
          <p className="metamask-import__copy">
            In future, choose the option to sign in to TruSat using the MetaMask
            option. Its will be as simple as signing a message to verify your
            identity from now on!
          </p>
          <p className="metamask-import__copy">
            If you wish to take your TruSat identity with you to other browsers,
            you can read more on our FAQ page
          </p>
        </div>
      ) : null}
    </React.Fragment>
  );
}
