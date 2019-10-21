import React from "react";
import { NavLink } from "react-router-dom";
import { setCookies, deleteCookies } from "../app-helpers";
import Button from "../../app/components/Button";

export default function CookieBanner({ isBannerOpen, setIsBannerOpen }) {
  return isBannerOpen ? (
    <div className="cookie-banner">
      <p className="cookie-banner__message">
        We use cookies to improve this product.
      </p>
      <div className="cookie-banner__button-wrapper">
        <Button
          onClick={() => {
            localStorage.setItem("trusat-allow-cookies", true);
            setCookies();
            setIsBannerOpen(false);
          }}
          color="white"
          text="OK"
          addStyles="cookie-banner__ok-button"
        ></Button>
        <Button
          onClick={() => {
            localStorage.setItem("trusat-allow-cookies", false);
            deleteCookies();
            setIsBannerOpen(false);
          }}
          color="black"
          text="No Thanks"
        ></Button>
      </div>
      <NavLink className="app__nav-link app__hide-on-mobile" to="/policy">
        <p className="cookie-banner__link">Read our privacy policy</p>
      </NavLink>
      <a
        className="cookie-banner__link app__hide-on-desktop"
        target="_blank"
        and
        rel="noopener noreferrer"
        href="https://trusat-assets.s3.amazonaws.com/trusat.org_privacy_policy.pdf"
      >
        Read our privacy policy
      </a>
    </div>
  ) : null;
}
