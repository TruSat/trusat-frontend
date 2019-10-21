import React from "react";
import { NavLink } from "react-router-dom";
import Partners from "../app/components/Partners";
import SocialIcons from "../app/components/SocialIcons";
import MailingListForm from "../app/components/MailingListForm";

export default function About() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section about__about-trusat-section">
        <h1 className="static-page__main-header--small">
          TruSat is a citizen-powered, open source system for creating a
          globally-accessible, trusted record of satellite orbital positions.
        </h1>
        <p className="static-page__copy about__deck">
          TruSat is primarily designed to enable the assessment of satellite
          operations in the context of space sustainability standards.
        </p>

        <div className="about__block-wrapper">
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="about__illustration"
                src="https://trusat-assets.s3.amazonaws.com/illustration-observation2-360px.png"
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Citizen satellite trackers are the eyes of the TruSat system.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="about__illustration"
                src="https://trusat-assets.s3.amazonaws.com/illustration-posat2-360px.png"
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                The TruSat software merges observations of a satellite from
                around the world into a transparent record of its location.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="about__illustration"
                src="https://trusat-assets.s3.amazonaws.com/illustration-gameplan-360px.png"
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Space sustainability advocates keep the system focused on the
                highest space sustainability priorities. And they can use
                TruSat’s transparent record to foster accountability for
                sustainable orbital operations.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="about__illustration"
                src="https://trusat-assets.s3.amazonaws.com/illustration-open_source-360px.png"
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                The TruSat Open Source Community maintains and advances the
                TruSat software.
              </p>
            </div>
          </div>
        </div>

        <div className="about__block-wrapper">
          <h2 className="static-page__sub-header static-page__sub-header--margin_fix">
            LINKS
          </h2>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink
                className="app__nav-link static-page__link static-page__link--highlight"
                to="/faq"
              >
                Frequently asked questions
              </NavLink>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Learn the ins and outs of TruSat.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink
                className="app__nav-link static-page__link static-page__link--highlight app__hide-on-mobile"
                to="/whitepaper"
              >
                The TruSat white paper
              </NavLink>
              <a
                className="static-page__link static-page__link--highlight app__hide-on-desktop"
                target="_blank"
                and
                rel="noopener noreferrer"
                href="https://trusat-assets.s3.amazonaws.com/TruSat+White+Paper_v3.0.pdf"
              >
                The TruSat white paper
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A technical deep dive into how TruSat works.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink
                className="app__nav-link static-page__link static-page__link--highlight"
                to="/charter"
              >
                The TruSat Charter
              </NavLink>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                TruSat's governance arrangements
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="static-page__link static-page__link--highlight"
                target="_blank"
                rel="noopener noreferrer"
                href="https://discuss.trusat.org/"
              >
                TruSat chat
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A community forum to discuss the project and get help.
              </p>
            </div>
          </div>
        </div>
        <Partners />
        <div className="about__block-wrapper">
          <h2 className="static-page__sub-header about__sub-header--top">
            FOLLOW TRUSAT
          </h2>
          <SocialIcons />

          <div className="about__mailing-list-wrapper">
            <p className="">
              Join the mailing list to stay posted on the project
            </p>
            <MailingListForm testPilots={false} />
          </div>
        </div>
      </section>
    </div>
  );
}
