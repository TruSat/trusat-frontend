import React, { Fragment } from "react";

export default function Advisors() {
  return (
    <Fragment>
      <h2 className="static-page__sub-header">ADVISORS</h2>
      <div className="partners__wrapper">
        <div className="partners__logo-wrapper">
          <img
            className="advisors__logo"
            src="https://trusat-assets.s3.amazonaws.com/advisor_log-brad.jpg"
            alt="ConsenSys Space logo"
          ></img>
          Brad Young
        </div>
      </div>
    </Fragment>
  );
}
