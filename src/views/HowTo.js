import React from "react";
import { NavLink } from "react-router-dom";

export default function HowTo() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section">
        <h1 className="static-page__main-header ">
          How To Capture Satellite Observations
        </h1>
        <p className="static-page__copy">
          Satellite observing is a fun and rewarding hobby and is becoming more
          accessible and important as the complementary technologies rapidly
          improve and the amount of orbiting objects drastically increases.{" "}
        </p>
        <p className="static-page__copy">
          Our platform is designed to accept observation data from anyone and
          anywhere in the world.{" "}
        </p>
        <p className="static-page__copy">
          Whether you’re a seasoned astronomer or are just starting your journey
          into becoming a satellite hunter, you can add value to the TruSat
          ecosystem and promote sustainable space practices.
        </p>
        <h2 className="static-page__sub-header">WHAT YOU NEED</h2>
        <p className="static-page__copy">• Star atlas or constellation app</p>
        <p className="static-page__copy">• A stopwatch </p>
        <p className="static-page__copy">
          • Camera, pair of binoculars, or telescope (optional)
        </p>
        <p className="static-page__copy">• A Tripod (optional)</p>
      </section>

      <section className="static-page__section">
        <h1 className="static-page__main-header">Prepare</h1>
        <h2 className="static-page__sub-header how-to__sub-header--top">
          1. IDENTIFY A SATELLITE YOU'RE INTERESTED IN TRACKING
        </h2>
        <div className="how-to__step-wrapper">
          <div className="how-to__step-image-wrapper"></div>
          <div className="how-to__step-copy-wrapper static-page__copy">
            Our{" "}
            <NavLink
              className="app__nav-link how-to__link"
              to="/catalog/priorities"
            >
              ‘Object Priority Catalog’
            </NavLink>{" "}
            is a good place to start
          </div>
        </div>
        <h2 className="static-page__sub-header">
          2. DETERMINE YOUR LONGITUDE AND LATITUDE
        </h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://maps.google.com"
          className="static-page__copy static-page__link"
        >
          Google maps can help
        </a>
        <h2 className="static-page__sub-header">
          3. CHECK WHEN (OR IF) THAT SATELLITE WILL BE PASSING OVER YOU
        </h2>
        <div className="how-to__step-wrapper">
          <div className="how-to__step-image-wrapper"></div>
          <div className="how-to__step-copy-wrapper static-page__copy">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="static-page__link"
              href="https://heavens-above.com"
            >
              Heavens-Above.com
            </a>
            <br />
            <br />
            • Enter your longitude and latitude
            <br />
            <br />• Search for the satellite in their Satellite Database
          </div>
        </div>
      </section>

      {/* Capture section needs copy */}
      <section className="static-page__section">
        <h1 className="static-page__main-header">Capture</h1>
        <h2 className="static-page__sub-header how-to__sub-header--top">
          1. IDENTIFY A SATELLITE YOU'RE INTERESTED IN TRACKING
        </h2>
        <div className="how-to__step-wrapper">
          <div className="how-to__step-image-wrapper"></div>
          <div className="how-to__step-copy-wrapper static-page__copy">
            Our{" "}
            <NavLink
              className="app__nav-link how-to__link"
              to="/catalog/priorities"
            >
              ‘Object Priority Catalog’
            </NavLink>{" "}
            is a good place to start
          </div>
        </div>
        <h2 className="static-page__sub-header">
          2. DETERMINE YOUR LONGITUDE AND LATITUDE
        </h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://maps.google.com"
          className="static-page__copy static-page__link"
        >
          Google maps can help
        </a>
        <h2 className="static-page__sub-header">
          3. CHECK WHEN (OR IF) THAT SATELLITE WILL BE PASSING OVER YOU
        </h2>
        <div className="how-to__step-wrapper">
          <div className="how-to__step-image-wrapper"></div>
          <div className="how-to__step-copy-wrapper static-page__copy">
            • Visit{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="static-page__link"
              href="https://heavens-above.com"
            >
              Heavens-Above.com
            </a>
            <br />
            <br />
            • Enter your longitude and latitude
            <br />
            <br />• Search for the satellite in their Satellite Database
          </div>
        </div>
      </section>

      <section className="static-page__section">
        <h1 className="static-page__main-header">Submit</h1>
        <h2 className="static-page__sub-header how-to__sub-header--top">
          INSTRUCTIONS FOR SUBMITTING
        </h2>
        <div className="how-to__step-wrapper">
          <div className="how-to__step-image-wrapper"></div>
          <div className="how-to__step-copy-wrapper static-page__copy">
            This is where we’d have instructions for submissions.
          </div>
        </div>
      </section>

      <section>
        <h1 className="static-page__main-header">Notes</h1>
        <p className="static-page__copy">
          Observation data should be gathered using positional measurement
          techniques and structured in either the IOD, U.K., or R.D.E.
          observation formats.
        </p>
        <p className="static-page__copy">
          A wide variety of methods and technologies can be utilized to capture
          positional measurements.
        </p>
        <p className="static-page__copy">
          We invite you to explore these different options, experiment with new
          methods, and share your findings with the community in our Discord
          channel.
        </p>
        <p className="static-page__copy">
          We’ve listed some of our favorites methods and resources below to give
          you a headstart.
        </p>
      </section>
    </div>
  );
}
