import React from "react";
import MailingListForm from "./MailingListForm";

export default function TestPilots() {
  return (
    <div className="test-pilots__wrapper">
      <div className="test-pilots__image-wrapper app__hide-on-mobile">
        <img
          className="test-pilots__image"
          src="https://trusat-assets.s3.amazonaws.com/illustration-posat-square-540px.png"
          alt="cellphone satwatcher"
        ></img>
      </div>

      <div className="test-pilots__copy-wrapper">
        <h2 className="test-pilots__header">Seeking test pilots</h2>
        <p className="test-pilots__copy">
          TruSat is currently an early-stage prototype. While upcoming releases
          will make it much easier to make and submit satellite observations,
          submitting satellite observations through the prototype is a
          relatively manual process, only for the most committed satellite
          spotters. If you are this courageous test pilot, submit your email to
          be set up with an account:
        </p>
        <MailingListForm testPilots={true} />
      </div>
    </div>
  );
}
