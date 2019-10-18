import React from "react";
import { NavLink } from "react-router-dom";
import IllustrationPlaceholderWide from "../assets/welcome-illustration-placeholder-16x9.png";


export default function About() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section about__about-trusat-section">
        <h1 className="static-page__main-header--small">TruSat is a citizen-powered, open source system for creating a globally-accessible, trusted record of satellite orbital positions.</h1>
        <p className="static-page__copy about__deck">
          TruSat is primarily designed to enable the assessment of satellite operations in the context of space sustainability standards.
        </p>

        <div className="about__block-wrapper">
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="welcome__illustration welcome__illustration--left"
                src={IllustrationPlaceholderWide}
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
                className="welcome__illustration welcome__illustration--left"
                src={IllustrationPlaceholderWide}
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                The TruSat software merges observations of a satellite from around the world into a transparent record of its location.          
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="welcome__illustration welcome__illustration--left"
                src={IllustrationPlaceholderWide}
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Space sustainability advocates keep the system focused on the highest space sustainability priorities.  And they can use TruSat’s transparent record to foster accountability for sustainable orbital operations.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <img
                className="welcome__illustration welcome__illustration--left"
                src={IllustrationPlaceholderWide}
                alt="Illustration"
              ></img>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                The TruSat Open Source Community maintains and advances the TruSat software.
              </p>
            </div>
          </div>
        </div>

        <div className="about__block-wrapper">
          <h2 className="static-page__sub-header">LINKS</h2>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink className="app__nav-link static-page__link static-page__link--highlight" to="/faq">
                Frequently asked questions
              </NavLink>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                Learn about the ins and outs of TruSat.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink className="app__nav-link static-page__link static-page__link--highlight" to="/whitepaper">
                The TruSat white paper
              </NavLink>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A technical deep dive into how TruSat works.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <NavLink className="app__nav-link static-page__link static-page__link--highlight" to="/charter">
                The TruSat Charter
              </NavLink>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
              An outline of TruSat’s initial governance.
              </p>
            </div>
          </div>
          <div className="about__block-pair">
            <div className="about__block--left">
              <a
                className="static-page__link static-page__link--highlight"
                target="_blank"
                rel="noopener noreferrer"
                href="https://discordapp.com"
              >
                TruSat chat
              </a>
            </div>
            <div className="about__block--right">
              <p className="static-page__copy">
                A Discord community chat to discuss the project and get help.
              </p>
            </div>
          </div>
        </div>



 
        <div className="about__partners-wrapper">
          <h2 className="static-page__sub-header">PARTNERS</h2>
          <div className="about__partners-list">
            <div
              style={{
                background: "#C4C4C4",
                borderRadius: "50%",
                height: "120px",
                marginBottom: "1em",
                width: "120px"
              }}
            ></div>
            <div
              style={{
                background: "#C4C4C4",
                borderRadius: "50%",
                height: "120px",
                marginBottom: "1em",
                width: "120px"
              }}
            ></div>
            <div
              style={{
                background: "#C4C4C4",
                borderRadius: "50%",
                height: "120px",
                marginBottom: "1em",
                width: "120px"
              }}
            ></div>
            <div
              style={{
                background: "#C4C4C4",
                borderRadius: "50%",
                height: "120px",
                marginBottom: "1em",
                width: "120px"
              }}
            ></div>
            <div
              style={{
                background: "#C4C4C4",
                borderRadius: "50%",
                height: "120px",
                marginBottom: "1em",
                width: "120px"
              }}
            ></div>
          </div>
        </div>
        <h2 className="static-page__sub-header about__sub-header--top">
          Press
        </h2>
        <p className="static-page__copy">
          Space News — 
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://spacenews.com/"
          >
            The Blockchain-based Satellite Catalog to Keep Space Clean
          </a>
        </p>
        <p className="static-page__copy">
          Tech Crunch — 
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://spacenews.com/"
          >
            Here’s the Headline for the Story
          </a>
        </p>
        <p className="static-page__copy">
          New York Times — 
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://spacenews.com/"
          >
            Blockchain in Outer Space Might Just Work
          </a>
        </p>

        <p className="static-page__copy">
          Follow project updates on{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/PlanetaryResourcesInc/"
          >
            Facebook
          </a>{" "}
          and{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/planetaryrsrcs"
          >
            Twitter
          </a>
        </p>


      </section>

    </div>
  );
}
