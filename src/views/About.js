import React from "react";

export default function About() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section about__about-trusat-section">
        <h1 className="static-page__main-header--small">
          TruSat is a citizen-powered, open source system for creating a trusted record of satellite orbital behavior.
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
                src="https://trusat-assets.s3.amazonaws.com/illustration-observation2-360px.jpg"
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
                src="https://trusat-assets.s3.amazonaws.com/illustration-posat2-360px.jpg"
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
                src="https://trusat-assets.s3.amazonaws.com/illustration-gameplan-360px.jpg"
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
                src="https://trusat-assets.s3.amazonaws.com/illustration-open_source-360px.jpg"
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
            RESOURCES
          </h2>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="app__nav-link static-page__link static-page__link--highlight"
                href="https://learn.trusat.org/docs/FAQ"
                rel="noopener noreferrer"
              >
                F.A.Q.
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Frequently asked questions about the project
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="app__nav-link static-page__link static-page__link--highlight"
                href="https://learn.trusat.org/docs/guide"
                rel="noopener noreferrer"
              >
                Satellite tracking guide
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Guides, tutorials, and resources to teach the art and science of satellite tracking
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="app__nav-link static-page__link static-page__link--highlight"
                href="https://learn.trusat.org/docs/overview"
                rel="noopener noreferrer"
              >
                White paper
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
              <a
                className="app__nav-link static-page__link static-page__link--highlight"
                href="https://learn.trusat.org/docs/trusat-charter"
                rel="noopener noreferrer"
              >
                Charter
              </a>
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
                className="app__nav-link static-page__link static-page__link--highlight"
                href="https://learn.trusat.org/docs/participate"
                rel="noopener noreferrer"
              >
                How to participate
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A list of ways you can help TruSat fulfill its vision
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="static-page__link static-page__link--highlight"
                rel="noopener noreferrer"
                href="https://discuss.trusat.org/"
              >
                Forum
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A community forum to discuss the project and get help
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="static-page__link static-page__link--highlight"
                rel="noopener noreferrer"
                href="https://discord.gg/HfT62G"
                target="_blank"
              >
                Discord chat
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A chat channel where you can join TruSat contributors to discuss the project's development.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="static-page__link static-page__link--highlight"
                rel="noopener noreferrer"
                href="https://github.com/orgs/TruSat/projects/1"
              >
                Project planning
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                The planning tool TruSat contributors use to manage the project's development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
