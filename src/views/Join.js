import React from "react";
import MailingListForm from "../app/components/MailingListForm";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import TestPilots from "../app/components/TestPilots";

export default function Join() {
  return (
    <div className="join__wrapper">
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

      <div className="join__content-wrapper">
        <div className="join__image-wrapper">
          <img
            className="join__image"
            src="https://trusat-assets.s3.amazonaws.com/JoinOpenSource.png"
            alt="open source team"
          ></img>
        </div>
        <div className="join__mailing-list-content-wrapper">
          <h2 className="join__sub-header">Join the Community</h2>
          <p className="join__copy">
            Be the first to know about new features, opportunities to join the
            software build, and what you can do to grow TruSat into a powerful
            tool for space sustainability.
          </p>
          <MailingListForm />
        </div>
      </div>

      <div className="join__test-pilots-wrapper">
        <TestPilots />
      </div>
    </div>
  );
}
