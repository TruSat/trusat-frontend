import React from "react";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import { NavLink } from "react-router-dom";
import SocialIcons from "../app/components/SocialIcons";

export default function TestPilotConfirmed() {
  return (
    <div>
      <div className="static-page__wrapper join__wrapper">
        <div className="join__header">
          <img
            className="join__image join__logo-image"
            src={TrusatLogoBig}
            alt="Trusat logo"
          ></img>
          <h2 className="join__trusat-tagline">
            OPEN SOURCE SPACE SUSTAINABILITY
          </h2>
        </div>

        <p className="subscription-confirmed__copy">Signup Confirmed</p>
        <p className="static-page__copy">
          Thank you for joining the dedicated of test pilots for the TruSat
          version 0.1 prototype. Your efforts will be invaluable in improving
          TruSat and opening it up to the broadest possible community of
          contributors, and we’ll do our best to support you along the way.
        </p>
        <p className="static-page__copy static-page__copy--bold join__subheader">
          Here’s what to expect:
        </p>
        <p className="static-page__copy">
          1. You will receive an automated confirmation email with instructions
          and a link for setting up a TruSat account and profile.
        </p>
        <p className="static-page__copy">
          2. A member of the ConsenSys Space team will contact you by email
          (usually within 48 hours) to help set you up with the necessary
          software tools to format satellite observation data for submission to
          the TruSat v0.1 prototype.
        </p>
        <p className="static-page__copy static-page__copy--bold join__subheader">
          In the meantime, we invite you to:
        </p>
        <p className="static-page__copy">
          <a
            className="app__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://discuss.trusat.org/"
          >
            Join the test pilots discussion channel
          </a>
        </p>
        <p className="static-page__copy">
          <NavLink className="app__link" to="/how">
            Build your satellite tracking skills
          </NavLink>
        </p>
        <p className="static-page__copy static-page__copy--bold join__subheader">
          Follow us
        </p>
        <SocialIcons />
      </div>
    </div>
  );
}
