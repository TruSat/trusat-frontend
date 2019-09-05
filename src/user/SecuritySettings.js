import React from "react";
import { NavLink } from "react-router-dom";

export default function PrivacySettings() {
  return (
    <section style={{ border: "1px solid white", margin: "1em" }}>
      <h1>DATA SECURITY</h1>
      <p>
        Call to action about why you'd want to connect a wallet, and what
        features it will unlock for you
      </p>

      <NavLink to="/settings/security">
        <span
          style={{
            border: "1px solid white",
            display: "inline-block",
            padding: "0.5em"
          }}
        >
          Secure your account with MetaMask
        </span>
      </NavLink>
    </section>
  );
}
