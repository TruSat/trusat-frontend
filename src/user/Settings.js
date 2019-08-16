import React from "react";
import { useAuthState } from "../auth/auth-context";

export default function AccountDetails() {
  const { isAuth, authType, address, burner } = useAuthState();

  const burnWallet = () => {
    localStorage.clear();
    window.location.reload();
  };

  const exportWallet = () => {
    alert(`
Copy your private key: 

${burner.signingKey.privateKey}

and follow instructions to import into MetaMask
    `);
  };

  const renderBurnerOptions = () => {
    return (
      <React.Fragment>
        <button
          style={{
            border: "1px solid black",
            display: "inline-block",
            margin: "1em",
            padding: "1em"
          }}
          onClick={burnWallet}
        >
          BURN WALLET
        </button>
        <button
          style={{
            border: "1px solid black",
            display: "inline-block",
            margin: "1em",
            padding: "1em"
          }}
          onClick={exportWallet}
        >
          EXPORT WALLET
        </button>
      </React.Fragment>
    );
  };

  return (
    <section>
      <React.Fragment>
        <section style={{ border: "1px solid white", margin: "1em" }}>
          <h1>Account Settings</h1>
          <label>
            Username <a>change</a>
            <p>username here...</p>
          </label>
          <label>
            ETH address
            <p>{address}</p>
          </label>
          <label>
            Email
            <p>email here...</p>
          </label>
          <label>
            Bio
            <p>Bio here...</p>
          </label>
        </section>

        <section style={{ border: "1px solid white", margin: "1em" }}>
          <p>[Note to prompt user to go the full MetaMask route]</p>

          {authType === "burner" ? renderBurnerOptions() : null}

          <span>Get MetaMask</span>
        </section>

        <section style={{ border: "1px solid white", margin: "1em" }}>
          Got more than one station?
          <a>Email us</a> and we'll combine into one account
        </section>
      </React.Fragment>
    </section>
  );
}
