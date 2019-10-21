import React from "react";
import { NavLink } from "react-router-dom";
import SocialIcons from "../../app/components/SocialIcons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__text-links-wrapper">
          <NavLink
            className="app__nav-link footer__text-link app__hide-on-mobile"
            to="/terms"
          >
            terms
          </NavLink>
          <a
            className="app__link footer__text-link app__hide-on-desktop"
            target="_blank"
            and
            rel="noopener noreferrer"
            href="https://trusat-assets.s3.amazonaws.com/trusat_terms_of_use.pdf"
          >
            terms
          </a>
          <NavLink
            className="app__nav-link footer__text-link app__hide-on-mobile"
            to="/privacy"
          >
            privacy
          </NavLink>
          <a
            className="app__link footer__text-link app__hide-on-desktop"
            target="_blank"
            and
            rel="noopener noreferrer"
            href="https://trusat-assets.s3.amazonaws.com/trusat.org_privacy_policy.pdf"
          >
            privacy
          </a>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}
