import React from "react";

import PartnerSWF from "../../assets/partner_logo-swf.png"; //DELETE THIS LINE
import PartnerSWISE from "../../assets/partner_logo-swise.png"; //DELETE THIS LINE
import PartnerMoribaJah from "../../assets/partner_logo-moriba_jah.png"; //DELETE THIS LINE
import PartnerConsenSysSpace from "../../assets/partner_logo-consensys_space.png"; //DELETE THIS LINE


export default function Partners() {
  return (
    <div className="about__partners-wrapper">
      <h2 className="static-page__sub-header">PARTNERS</h2>
      <div className="welcome__partners-list">
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-swf.png"
            src={PartnerSWF} //DELETE THIS LINE
            alt="Secure World Foundation Logo"
          ></img>
          <div></div>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-swise.png"
            src={PartnerSWISE} //DELETE THIS LINE
            alt="Secure World Foundation Logo"
          ></img>
          <div></div>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-moriba.png"
            src={PartnerMoribaJah} //DELETE THIS LINE
            alt="Secure World Foundation Logo"
          ></img>
          <div></div>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-consensys_space.png"
            src={PartnerConsenSysSpace} //DELETE THIS LINE
            alt="Secure World Foundation Logo"
          ></img>
          <div></div>
        </div>
      </div>
    </div>
  );
}
