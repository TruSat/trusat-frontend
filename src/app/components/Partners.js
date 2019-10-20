import React from "react";

export default function Partners() {
  return (
    <div className="about__partners-wrapper">
      <h2 className="static-page__sub-header">PARTNERS</h2>
      <div className="welcome__partners-list">
        <div className="welcome__partners-list__logo-wrapper">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
          >
            <img
              className="welcome__partners-list__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-consensys_space.png"
              alt="ConsenSys Space logo"
            ></img>
            ConsenSys Space
          </a>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://swfound.org/"
          >
            <img
              className="welcome__partners-list__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-swf.png"
              alt="Secure World Foundation logo"
            ></img>
            Secure World Foundation
          </a>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.swise.org/"
          >
            <img
              className="welcome__partners-list__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-swise.png"
              alt="Society of Women in Space Exploration logo"
            ></img>
            Society of Women in Space Exploration
          </a>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://sites.utexas.edu/moriba/"
          >
            <img
              className="welcome__partners-list__logo"
              src="https://trusat-assets.s3.amazonaws.com/partner_logo-moriba_jah.png"
              alt="Moriba Jah portrait"
            ></img>
            Professor Moriba Jah, University of Texas at Austin
          </a>
        </div>
      </div>
    </div>
  );
}
