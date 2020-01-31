import React from "react";
import { NavLink } from "react-router-dom";
import SocialIcons from "../../app/components/SocialIcons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__text-links-wrapper">
          <NavLink className="app__nav-link footer__text-link " to="/terms">
            terms
          </NavLink>

          <NavLink className="app__nav-link footer__text-link " to="/privacy">
            privacy
          </NavLink>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}
