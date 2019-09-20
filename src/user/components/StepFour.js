import React from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import MetaMask from "../../auth/components/MetaMask";

export default function StepFive({ step, setStep }) {
  return (
    <React.Fragment>
      {step >= 4 ? (
        <div className="metamask-import__step-header-wrapper">
          {step > 4 ? (
            <img
              className="metamask-import__circle-check"
              src={CircleCheck}
              alt="circled check"
            ></img>
          ) : null}
          <h2
            className={
              step > 4
                ? "metamask-import__step-header--done"
                : "metamask-import__step-header--todo"
            }
          >
            Step 4: Connect TruSat to MetaMask
          </h2>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            MetaMask should have prompted you to confirm the connection. This is
            to confirm that you trust TruSat before going any further. Click
            "connect" in MetaMask. If the request to connect doesn't appear, you
            may be already connected and can proceed.
          </p>
          <p className="metamask-import__copy">Now for the last step!</p>
          <p className="metamask-import__copy">
            Confirm your connection using the button below and then click the
            "sign" button in MetaMask to sign into TruSat
          </p>

          {/* // TODO - this button needs to pop metamask up to show the sign message request */}
          <div className="metamask-import__button-wrapper">
            <span
              className="app__black-button--small metamask-import__back-button"
              onClick={() => {
                setStep(3);
              }}
            >
              BACK
            </span>
            <MetaMask buttonText={`I've confirmed connected in MetaMask`} />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
