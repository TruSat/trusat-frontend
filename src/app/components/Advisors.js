import React, { Fragment } from "react";
// import ReactGA from "react-ga";

export default function Advisors() {
  return (
    <Fragment>
      <h2 className="static-page__sub-header">ADVISORS</h2>
      <div className="partners__wrapper">
        <div className="partners__logo-wrapper">
          {/* <a
            className="static-page__partner-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
            onClick={() => {
              ReactGA.event({
                category: "Outbound link",
                action: `Clicked a partner link`,
                label: `Clicked ConsenSys Space link`
              });
            }}
          > */}
          <img
            className="advisors__logo"
            src="https://trusat-assets.s3.amazonaws.com/advisor_log-brad.jpg"
            alt="ConsenSys Space logo"
          ></img>
          Brad Young
          {/* </a> */}
        </div>
      </div>
    </Fragment>
  );
}
