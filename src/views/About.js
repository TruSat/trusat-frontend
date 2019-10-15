import React from "react";
import { NavLink } from "react-router-dom";

export default function About() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section about__about-trusat-section">
        <h1 className="static-page__main-header">About Trusat</h1>
        <h2 className="static-page__sub-header about__sub-header--top">
          WHAT IS TRUSAT?
        </h2>
        <p className="static-page__copy">
          TruSat is an open source, citizen-powered space sustainability tool
          designed to assess satellite operations against sustainability
          standards. TruSat depends on satellite observers like you making and
          reporting satellite observations. TruSat’s Proof of Satellite software
          engine assembles observations of a satellite from around the world
          into a record of the satellite’s orbital position suitable for
          assessing orbital behavior against sustainability standards
        </p>
        <p className="static-page__copy">
          Version 0.1 of TruSat was developed by{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
          >
            ConsenSys Space.
          </a>{" "}
          TruSat is ConsenSys Space’s first step on its mission to democratize,
          diversify, and decentralize space endeavors. TruSat aims to enable any
          person on Earth to be a direct contributor to the long-term
          sustainability of outer space, whether by spotting satellites,
          developing the software that eases the process of making and reporting
          satellite observations, or writing or translating documentation
        </p>
        <h2 className="static-page__sub-header">LINKS</h2>
        <p className="static-page__copy">
          <NavLink className="app__nav-link static-page__link" to="/whitepaper">
            The TruSat white paper
          </NavLink>{" "}
          — A technical deep dive into how TruSat works.
        </p>
        <p className="static-page__copy">
          <NavLink className="app__nav-link static-page__link" to="/charter">
            The TruSat Charter
          </NavLink>{" "}
          — An outline of TruSat’s initial governance.
        </p>
        <p className="static-page__copy">
          <NavLink className="app__nav-link static-page__link" to="/faq">
            FAQ
          </NavLink>{" "}
          — Frequently asked questions
        </p>
        <p className="static-page__copy">
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://discordapp.com"
          >
            TruSat's community chat
          </a>{" "}
          — A Discord channel to discuss the project and get help.
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
      </section>

    </div>
  );
}
