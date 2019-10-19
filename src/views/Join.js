import React from "react";
import MailingListForm from "../app/components/MailingListForm";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import JoinOpenSource from "../assets/JoinOpenSource.png";
import TestPilots from "../app/components/TestPilots";

export default function Join() {
  return (
    <div className="join__wrapper">
      <img
        className="join__image join__logo-image"
        src={TrusatLogoBig}
        alt="Trusat logo"
      ></img>
      <h2 className="join__trusat-tagline">OPEN SOURCE SPACE SUSTAINABILITY</h2>

      <div className="join__content-wrapper">
        <div className="join__mailing-list-content-wrapper">
          <h2 className="join__sub-header">Join the Community</h2>
          <p className="join__copy">
            Sign up to stay posted on new features, hackathons, bounties and
            governance:
          </p>
          <MailingListForm />
        </div>
        <div className="join__image-wrapper">
          <img
            className="join__image"
            src={JoinOpenSource}
            alt="open source team"
          ></img>
        </div>
      </div>

      <div className="join__test-pilots-wrapper">
        <TestPilots />
      </div>
    </div>
  );
}
