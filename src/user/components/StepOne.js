import React from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import ReactGA from "react-ga";

export default function StepOne({ step, setStep }) {
  return (
    <React.Fragment>
      <div className="metamask-import__step-header-wrapper">
        {step > 1 ? (
          <img
            className="metamask-import__circle-check"
            src={CircleCheck}
            alt="circled check"
          ></img>
        ) : null}
        <h2
          className={
            step > 1
              ? "metamask-import__step-header--done"
              : "metamask-import__step-header--todo"
          }
        >
          Step 1: Get MetaMask
        </h2>
      </div>

      {step === 1 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            You'll need MetaMask to secure your account. MetaMask is a browser
            extension that acts as a secure vault for your ethereum wallet that
            currently serves as your identity in TruSat.
          </p>
          <span
            className={
              window.ethereum
                ? "app__black-button--small"
                : "app__white-button--small"
            }
          >
            <a
              className={
                window.ethereum
                  ? "metamask-import__link-text--white"
                  : "metamask-import__link-text--black"
              }
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get MetaMask
            </a>
          </span>
          <p className="metamask-import__copy">
            It will take a few steps to get up, but its worth it- by installing
            MetaMask, you'll upgrade your regular web browser so that you can
            access the decentralized web
          </p>

          <span
            className="app__white-button--small"
            onClick={() => {
              // if metamask plugin IS found
              if (window.ethereum) {
                setStep(2);
                ReactGA.event({
                  category: "MetaMask",
                  action: `Securing account with MetaMask flow`,
                  label: `Finished Step ONE by adding MetaMask plugin`
                });
                // if metamask plugin ISN'T found
              } else {
                alert("You do not have the MetaMask plugin installed!");
              }
            }}
          >
            I've installed MetaMask
          </span>
        </div>
      ) : null}
    </React.Fragment>
  );
}
