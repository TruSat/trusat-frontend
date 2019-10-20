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
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://swfound.org/"
          >
            <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-swf.png"
            src={PartnerSWF} //DELETE THIS LINE
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
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-swise.png"
            src={PartnerSWISE} //DELETE THIS LINE
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
            href="https://www.linkedin.com/in/jahniverse/"
          >
            <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-moriba.png"
            src={PartnerMoribaJah} //DELETE THIS LINE
            alt="Moriba Jah portrait"
          ></img>
            Moriba Jah
          </a>
        </div>
        <div className="welcome__partners-list__logo-wrapper">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
          >
            <img
            className="welcome__partners-list__logo"
            // src="https://trusat-assets.s3.amazonaws.com/partner_logo-consensys_space.png"
            src={PartnerConsenSysSpace} //DELETE THIS LINE
            alt="ConsenSys Space logo"
          ></img>
            ConsenSys Space
          </a>
        </div>

      </div>
    </div>
  );
}
