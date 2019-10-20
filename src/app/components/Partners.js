import React from "react";

export default function Partners() {
  return (
    <div className="about__partners-wrapper">
      <h2 className="static-page__sub-header">PARTNERS</h2>
      <div className="welcome__partners-list">
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            src="https://trusat-assets.s3.amazonaws.com/partner_logo-consensys_space.png"
            alt="Secure World Foundation Logo"
          ></img>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            src="https://trusat-assets.s3.amazonaws.com/partner_logo-swf.png"
            alt="Secure World Foundation Logo"
          ></img>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            src="https://trusat-assets.s3.amazonaws.com/partner_logo-swise.png"
            alt="Secure World Foundation Logo"
          ></img>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            src="https://trusat-assets.s3.amazonaws.com/partner_logo-moriba.png"
            alt="Secure World Foundation Logo"
          ></img>
        </div>
      </div>
    </div>
  );
}
