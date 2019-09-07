import React from "react";
import { NavLink } from "react-router-dom";

export default function SecuritySettings() {
  return (
    <section className="security-settings__wrapper">
      <h2 className="security-settings__heading">DATA SECURITY</h2>
      <p className="security-settings__info-text">
        Call to action about why you'd want to connect a wallet, and what
        features it will unlock for you
      </p>

      <NavLink className="app__nav-link" to="/settings/security">
        <span className="app__white-button--small">
          Secure your account with MetaMask
        </span>
      </NavLink>
    </section>
  );
}
