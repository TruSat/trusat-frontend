import React, { useState } from "react";
import ReactGA from "react-ga";
import { deleteCookie } from "../app-helpers";
import Button from "../../app/components/Button";

export default function CookieBanner() {
  const [isOpen, setIsOpen] = useState(true);

  const setCookies = () => {
    ReactGA.initialize("UA-149300298-1");
  };

  const deleteCookies = () => {
    deleteCookie("_ga");
    deleteCookie("_gat");
    deleteCookie("_gid");
  };

  return isOpen ? (
    <div className="cookie-banner">
      <p className="cookie-banner__message">
        We use cookies to improve this product, gabish?
      </p>
      <div className="cookie-banner__button-wrapper">
        <Button
          onClick={() => {
            setCookies();
            setIsOpen(false);
          }}
          color="white"
          text="OK"
          addStyles="cookie-banner__ok-button"
        ></Button>
        <Button
          onClick={() => {
            deleteCookies();
            setIsOpen(false);
          }}
          color="black"
          text="No Thanks"
        ></Button>
      </div>
    </div>
  ) : null;
}
