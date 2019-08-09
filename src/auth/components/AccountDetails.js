import React from "react";
import { useAuthState } from "../auth-context";

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
      {isAuth ? (
        <React.Fragment>
          <p style={{ margin: "1em" }}>Account type: {authType}</p>
          <p style={{ margin: "1em" }}>Address: {address}</p>
          {authType === "burner" ? renderBurnerOptions() : null}
        </React.Fragment>
      ) : null}
    </section>
  );
}
