import React from "react";
import { useAuthState } from "../../auth/auth-context";

export default function BurnerOptions() {
  const { burner } = useAuthState();

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
}
