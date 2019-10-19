import React from "react";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";

export default function SubscriptionConfirmed() {
  return (
    <div>
      <div className="join__wrapper">
        <img
          className="join__image join__logo-image"
          src={TrusatLogoBig}
          alt="Trusat logo"
        ></img>
        <h2 className="join__trusat-tagline">
          OPEN SOURCE SPACE SUSTAINABILITY
        </h2>
        <p className="subscription-confirmed__copy">Signup Confirmed</p>
      </div>
    </div>
  );
}
