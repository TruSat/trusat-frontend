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
      <NavLink className="app__nav-link" to="/policy">
        <p className="cookie-banner__link">Read our privacy policy</p>
      </NavLink>
    </div>
  ) : null;
}
