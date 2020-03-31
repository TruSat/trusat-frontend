import React from "react";
import CircleCheck from "../../assets/CircleCheck.svg";
import CopyText from "../../app/components/CopyText";
import ReactGA from "react-ga";

export default function StepThree({ privateKey, step, setStep }) {
  return (
    <React.Fragment>
      {step >= 3 ? (
        <div className="metamask-import__step-header-wrapper">
          {step > 3 ? (
            <img
              className="metamask-import__circle-check"
              src={CircleCheck}
              alt="circled check"
            ></img>
          ) : null}
          <h2
            className={
              step > 3
                ? "metamask-import__step-header--done"
                : "metamask-import__step-header--todo"
            }
          >
            Step 3: Transfer your private key
          </h2>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="metamask-import__copy-wrapper">
          <p className="metamask-import__copy">
            Now MetaMask needs to make sure its really you.
          </p>
          <p className="metamask-import__copy">1. Copy your private key:</p>
          {/* TODO - this needs to obscure the private key until they click it, then
          offer ability to copy it with a click */}
          <div className="metamask-import__private-key-wrapper">
            <p className="metamask-import__private-key-text">{privateKey}</p>
            <CopyText textToCopy={privateKey} />
          </div>
          <p className="metamask-import__copy">
            2. Login to MetaMask if you haven't already done so and click on
            your avatar
          </p>
          <p className="metamask-import__copy">3. Select "import account"</p>
          <p className="metamask-import__copy">4. Paste in your private key</p>
          <div className="metamask-import__button-wrapper">
            <span
              className="app__black-button--small metamask-import__back-button"
              onClick={() => {
                setStep(2);
              }}
            >
              BACK
            </span>
            <span
              className="app__white-button--small"
              onClick={async () => {
                window.ethereum.enable().catch(console.error);
                ReactGA.event({
                  category: "MetaMask",
                  action: "Securing account with MetaMask flow",
                  label:
                    "Finished Step THREE by importing Private Key to MetaMask"
                });
                setStep(4);
              }}
            >
              I've imported my private key to MetaMask
            </span>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
