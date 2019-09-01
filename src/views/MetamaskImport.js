import React, { useState } from "react";
import { useAuthState } from "../auth/auth-context";

export default function MetamaskImport() {
  const [step, setStep] = useState(1);

  const [metamaskFound, setMetamaskFound] = useState(false);

  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const { authType } = useAuthState();
  console.log(`authType =`, authType);

  return (
    <section style={{ margin: "1em" }}>
      <h1>CONNECT TO METAMASK</h1>
      <p>
        Call to action for why you'd want to connect a wallet, and what benefits
        and features it will unlock for you
      </p>

      {/* STEP ONE */}
      {/* TODO - do not show step one if they have already installed metamask */}
      <h2
        style={
          step > 1 ? { color: "green", marginTop: "1em" } : { marginTop: "1em" }
        }
      >
        Step 1: Get MetaMask
      </h2>
      {step === 1 ? (
        <div style={{ border: "1px solid red", marginTop: "1em" }}>
          <p>
            You'll need MetaMask to secure your account. MetaMask is a browser
            extension that acts as a secure vault for your private and valuable
            information stored on the blockchain
          </p>
          <span
            style={{
              border: "1px solid white",
              padding: "0.5em",
              display: "inline-block"
            }}
          >
            <a
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get MetaMask
            </a>
          </span>
          <p>
            It will take a few steps to get up, but its worth it- by installing
            MetaMask, you'll upgrade your regular web browser so that you can
            access the decentralized web
          </p>
          {/* TO DO - this button should check if they have metamask installed */}
          <span
            style={{
              border: "1px solid white",
              padding: "0.5em",
              display: "inline-block"
            }}
            onClick={() => {
              setStep(2);
              setMetamaskFound(true);
            }}
          >
            I've installed MetaMask
          </span>
        </div>
      ) : null}

      {/* STEP TWO */}
      {step >= 2 ? (
        <h2
          style={
            step > 2
              ? { color: "green", marginTop: "1em" }
              : { marginTop: "1em" }
          }
        >
          Step 2: Retrieve your secret
        </h2>
      ) : null}
      {step === 2 ? (
        <div style={{ border: "1px solid orange", marginTop: "1em" }}>
          <p>
            We need to make sure its really you. Please enter the secret we
            emailed you when you first signed up for TruSat and the password you
            created for your account
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              SECRET
              <input
                type="text"
                value={secret}
                onChange={event => setSecret(event.target.value)}
              ></input>
            </label>
            <label>
              PASSWORD
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              ></input>
            </label>
          </div>{" "}
          {/* TODO - next button will decrypt the secret and return private key, then mpve to step 3 */}
          <span
            style={{
              border: "1px solid white",
              padding: "0.5em",
              display: "inline-block"
            }}
            onClick={() => {
              setPrivateKey("0x19191919191");
              setStep(3);
            }}
          >
            NEXT
          </span>
        </div>
      ) : null}

      {/* STEP THREE */}
      {step >= 3 ? (
        <h2
          style={
            step > 3
              ? { color: "green", marginTop: "1em" }
              : { marginTop: "1em" }
          }
        >
          Step 3: Transfer your private key
        </h2>
      ) : null}
      {step === 3 ? (
        <div style={{ border: "1px solid yellow", marginTop: "1em" }}>
          <p>Now MetaMask needs to make sure its really you.</p>
          <p>1. Copy your private key:</p>
          {/* TODO - this needs to obscure the private key until they click it, then
          offer ability to copy it with a click */}
          <p>{privateKey}</p>
          <p>2. Click on your avatar in MetaMask</p>
          <p>3. Select "import account"</p>
          <p>4. Paste in your private key</p>
          <span
            style={{
              border: "1px solid white",
              padding: "0.5em",
              display: "inline-block"
            }}
            onClick={() => setStep(4)}
          >
            I've imported my private key to MetaMask
          </span>
        </div>
      ) : null}

      {/* STEP FOUR */}
      {step >= 4 ? (
        <h2
          style={
            step > 4
              ? { color: "green", marginTop: "1em" }
              : { marginTop: "1em" }
          }
        >
          Step 4: Connect TruSat to MetaMask
        </h2>
      ) : null}
      {step === 4 ? (
        <div style={{ border: "1px solid yellow", marginTop: "1em" }}>
          <p>
            MetaMask should have prompted you to confirm the connection. This is
            to confirm that you trust TruSat before going any further. Click
            "connect" in MetaMask.
          </p>
          {/* // TODO - this button needs to pop metamask up to show the sign message request */}
          <span
            style={{
              border: "1px solid white",
              padding: "0.5em",
              display: "inline-block"
            }}
            onClick={() => setStep(5)}
          >
            I've confirmed connection in MetaMask
          </span>
        </div>
      ) : null}

      {/* STEP FIVE */}
      {step >= 5 ? (
        <h2
          style={
            authType === "metamask"
              ? { color: "green", marginTop: "1em" }
              : { marginTop: "1em" }
          }
        >
          Step 5: Sign [message]
        </h2>
      ) : null}
      {step === 5 && authType !== "metamask" ? (
        <div style={{ border: "1px solid yellow", marginTop: "1em" }}>
          <p>last step!</p>
          <p>Click the "sign" button in MetaMask to sign into TruSat</p>
        </div>
      ) : null}

      {/* The success message */}
      {authType === "metamask" ? (
        <div>
          <p>
            Congrats you have now successfully migrated your account to
            MetaMask!
          </p>
        </div>
      ) : null}
    </section>
  );
}
