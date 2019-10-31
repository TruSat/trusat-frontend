import React from "react";
import { NavLink } from "react-router-dom";
import ReactGA from "react-ga";

export default function SecuritySettings() {
  return (
    <section className="security-settings__wrapper app__hide-on-mobile">
      <h2 className="security-settings__heading">DATA SECURITY</h2>
      <div className="security-settings__info-text">
        <p>
          MetaMask is a browser plugin that will more quickly and securely
          verify your identity and ownership of observations. Signing into
          TruSat will be as simple as one click on a pop-up.
        </p>
        &nbsp;
        <p>
          Making the move to MetaMask will set you up to interact with the
          Ethereum blockchain in future TruSat features. More info can be found
          on our
          <NavLink to="/how" className="app__nav-link">{` FAQ page`}</NavLink>
        </p>
        &nbsp;
        <p>
          We have made a handy guide to help you migrate your current identity
          to MetaMask and you can follow along by clicking the button below:
        </p>
      </div>

      <NavLink className="app__nav-link" to="/settings/metamask">
        <span
          className="app__white-button--small"
          onClick={() => {
            ReactGA.event({
              category: "MetaMask",
              action: `Securing account with MetaMask flow`,
              label: `Started the process`
            });
          }}
        >
          Secure your account with MetaMask
        </span>
      </NavLink>
    </section>
  );
}
