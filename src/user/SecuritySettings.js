import React from "react";
import { NavLink } from "react-router-dom";

export default function SecuritySettings() {
  return (
    <section className="security-settings__wrapper">
      <h2 className="security-settings__heading">DATA SECURITY</h2>
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
