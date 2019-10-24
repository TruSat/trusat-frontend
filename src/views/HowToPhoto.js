import React from "react";
import MailingListForm from "../app/components/MailingListForm";

export default function HowToPhoto() {
  return (
    <div className="static-page__wrapper static-page__wrapper--how-to">
      <section className="static-page__section">
        <img
          className="about__illustration"
          src="https://trusat-assets.s3.amazonaws.com/illustration-observation2-840px.png"
          srcSet="https://trusat-assets.s3.amazonaws.com/illustration-observation2-840px.png, https://trusat-assets.s3.amazonaws.com/illustration-observation2-360px.png, https://trusat-assets.s3.amazonaws.com/illustration-observation2-100px.png"
          alt="Illustration"
        ></img>
        <h1 className="static-page__main-header--small">
            Satellite Tracking with a Digital Camera
        </h1>
        <p className="static-page__copy about__deck">
            This page offers a brief introduction to utilizing a digital camera to track satellites.  
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Sectioni name
        </h2>
        <p className="static-page__copy">
          Content
        </p>

      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Seeking test pilots
        </h2>
        <p className="static-page__copy">
          At this time, translating basic observation data (time and location)
          into a format readable by version 0.1 TruSat Prototype requires a
          relatively advanced workflow, including use of free third-party
          software, and is not recommended for all but the most committed.
        </p>
        <p className="static-page__copy">
          If you are that person and want to become a TruSat Alpha Test Pilot,
          please sign up here:
        </p>
        <MailingListForm testPilots={true} />
        <p className="static-page__copy how-to__copy--with-margin">
          We’ll help walk you through the process and get you set up with the
          necessary software tools.
        </p>
      </section>
    </div>
  );
}
