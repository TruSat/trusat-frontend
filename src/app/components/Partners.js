import React, { Fragment } from "react";
import ReactGA from "react-ga";

export default function Partners() {
  return (
    <Fragment>
      <h2 className="static-page__sub-header">PARTNERS</h2>
      <div className="partners__wrapper">
        <div className="partners__logo-wrapper">
          <a
            className="static-page__partner-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
            onClick={() => {
              ReactGA.event({
                category: "Outbound link",
                action: "Clicked a partner link",
                label: "Clicked ConsenSys Space link"
              });
            }}
          >
            <img
              className="partners__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-consensys_space.png"
              alt="ConsenSys Space logo"
            ></img>
            ConsenSys Space
          </a>
        </div>
        <div className="partners__logo-wrapper">
          <a
            className="static-page__partner-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://swfound.org/"
            onClick={() => {
              ReactGA.event({
                category: "Outbound link",
                action: "Clicked a partner link",
                label: "Clicked SWF link"
              });
            }}
          >
            <img
              className="partners__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-swf.png"
              alt="Secure World Foundation logo"
            ></img>
            Secure World Foundation
          </a>
        </div>
        <div className="partners__logo-wrapper">
          <a
            className="static-page__partner-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.swise.org/"
            onClick={() => {
              ReactGA.event({
                category: "Outbound link",
                action: "Clicked a partner link",
                label: "Clicked SWISE link"
              });
            }}
          >
            <img
              className="partners__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-swise.png"
              alt="Society of Women in Space Exploration logo"
            ></img>
            Society of Women in Space Exploration
          </a>
        </div>
        <div className="partners__logo-wrapper">
          <a
            className="static-page__partner-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://sites.utexas.edu/moriba/"
            onClick={() => {
              ReactGA.event({
                category: "Outbound link",
                action: "Clicked a partner link",
                label: "Clicked Moriba Jah link"
              });
            }}
          >
            <img
              className="partners__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-moriba_jah.png"
              alt="Moriba Jah portrait"
            ></img>
            Professor Moriba Jah, University of Texas at Austin
          </a>
        </div>
      </div>
    </Fragment>
  );
}
