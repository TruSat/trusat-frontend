import React from "react";
import CellphoneSatWatcher from "../../assets/CellphoneSatWatcher.png";
import MailingListForm from "./MailingListForm";

export default function TestPilots() {
  return (
    <div className="test-pilots__wrapper">
      <div className="test-pilots__image-wrapper">
        <img
          className="test-pilots__image"
          src={CellphoneSatWatcher}
          alt="cellphone satwatcher"
        ></img>
      </div>

      <div className="test-pilots__copy-wrapper">
        <h2 className="test-pilots__header">We're seeking test pilots</h2>
        <p className="test-pilots__copy">
          Interested in recording and contributing satellite observations right
          now? Set up an account
        </p>
        <MailingListForm testPilots={true} />
      </div>
    </div>
  );
}
