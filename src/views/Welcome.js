import React from "react";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import Button from "../app/components/Button";
import TrusatGlobeCanvas from "../app/components/TrusatGlobeCanvas";
import ReactGA from "react-ga";
import JoinTheMission from "../app/components/JoinTheMission";

export default function Home() {
  return (
    <div className="welcome__wrapper">
      <div className="welcome__hero">
        <TrusatGlobeCanvas />
        <div className="welcome__header-gradient"></div>
        <img
          className="welcome__globe-image welcome__hide-on-desktop"
          src="https://trusat-assets.s3.amazonaws.com/illustration-cover-840px.jpg"
          alt="globe"
        ></img>
      </div>
      {/* Section ONE */}
      <section className="welcome__section welcome__section-one">
        <span className="welcome__hide-on-mobile"></span>
        <div className="welcome__section-one-logo-container">
          <img
            className="welcome__trusat-logo"
            src={TrusatLogoBig}
            alt="Trusat logo"
          ></img>

          <h2>
            Open source
            <br />
            space sustainability
          </h2>
          <a
            href="/join"
            onClick={() => {
              ReactGA.event({
                category: "Onboarding",
                action: "Clicked join button",
                label: "Top of Welcome page join button",
              });
            }}
          >
            <Button
              text="JOIN"
              color="orange"
              addStyles="welcome__section-one-button"
            ></Button>
          </a>
        </div>
        <div className="welcome__section-one-spacer welcome__hide-on-mobile"></div>
      </section>
      {/* Section TWO */}
      <section className="welcome__section welcome__section-two">
        <div className="welcome-section-two__video-container">
          <div className="welcome-section-two__video-container--bottom welcome__hide-on-mobile"></div>
          <div className="welcome-section-two__video-container--top">
            <div className="welcome__iframe-wrapper">
              <iframe
                className="welcome__iframe"
                title="TruSat explainer video"
                src="https://www.youtube.com/embed/H-J7zngl6xE"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen="allowfullscreen"
                mozallowullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                modestbranding="1"
              ></iframe>
            </div>
          </div>
        </div>
        <span className="welcome__hide-on-mobile"></span>
        <div>
          <span className="welcome-setion-two__top-spacer welcome__hide-on-desktop"></span>
          <h2>Space debris is a problem</h2>
          <div className="welcome-section-two__copy-container--top">
            <p className="welcome-section-two__copy--medium">
              In the next decade, the number of satellites in orbit will
              multiply by <strong>2500%.</strong>
            </p>
            <span className="welcome__hide-on-mobile welcome__border-left"></span>
            <div>
              <span className="welcome__hide-on-desktop" />
              <p className="welcome-section-two__copy--small">
                This raises the risk of collisions and debris that threaten our
                spacefaring future.
              </p>
            </div>
          </div>
          <div className="welcome-section-two-face-image-header-wrapper">
            <img
              src="https://trusat-assets.s3.amazonaws.com/face.png"
              alt="face"
            ></img>
            <h3>You are the solution</h3>
          </div>
          <p className="welcome-section-two__copy--medium">
            TruSat is a citizen-powered public service, crowdsourcing
            observations of satellites to form an independent record of
            satellite behavior.
          </p>
          <div className="welcome-section-two__copy-container--bottom">
            <span></span>
            <span className="welcome__hide-on-mobile welcome__border-left"></span>
            <p className="welcome-section-two__copy--small">
              This transparency promotes sustainable practices by satellite
              operators. Explore the catalog{" "}
              <span className="welcome-section-two__copy-container--bottom__spacer welcome__hide-on-mobile"></span>
            </p>
          </div>
        </div>
      </section>
      {/* Section THREE - DESKTOP  */}
      <section className="welcome__section welcome__desktop-section-three welcome__hide-on-mobile">
        <h2>Learn the sport of satellite tracking</h2>
        <div className="welcome__desktop-section-three-content">
          <div className="welcome__desktop-section-three-content--left">
            <div className="welcome__desktop-section-three-content-left--top">
              <p>
                By tracking satellites, you’ll join the global community of
                citizen scientists whose observations feed the TruSat catalog.
                All you need to start is a clear sky—no equipment required.
              </p>
              <span></span>
            </div>

            <div className="welcome__desktop-section-three-content-left--bottom">
              <a
                href="https://learn.trusat.org/docs/guide"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  ReactGA.event({
                    category: "Onboarding",
                    action: "Clicked Try A Tutorial button",
                    label: "On Welcome page -- Desktop",
                  });
                }}
              >
                <Button
                  text="TRY A TUTORIAL"
                  color="white"
                  addStyles={
                    "welcome__button--desktop welcome__desktop-section-three-button"
                  }
                ></Button>
              </a>

              <span></span>
              <ul>
                Learn about:
                <li>How to track sats</li>
                <li>Basics or orbital dynamics</li>
                <li>Tips for reading the stars</li>
                <li>Instructions for assembling a DIY sat-tracking mount.</li>
              </ul>
            </div>
          </div>
          <div className="welcome__desktop-section-three-content--right">
            <img
              className="welcome__desktop-section-three-content-right-phone-image"
              src="https://trusat-assets.s3.amazonaws.com/hand-phone.jpg"
              alt="mobile tracking"
            ></img>
            <div className="welcome__desktop-section-three-content-right--bottom">
              <span></span>
              <div>
                <img
                  src="https://trusat-assets.s3.amazonaws.com/badge.png"
                  alt="badge"
                ></img>
                <p>Track a sat to add it to your collection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Section THREE - MOBILE */}
      <section className="welcome__section welcome__mobile-section-three welcome__hide-on-desktop">
        <div className="welcome__mobile-section-three-header-wrapper">
          <h2>Learn the sport of satellite tracking</h2>
        </div>

        <div className="welcome__mobile-section-three-content--top">
          <img
            className="welcome__mobile-section-three-phone-image"
            src="https://trusat-assets.s3.amazonaws.com/hand-phone.jpg"
            alt="mobile tracking"
          ></img>

          <div className="welcome__mobile-section-three-top-content-div">
            <span></span>
            <div className="welcome__mobile-badge-image-copy-wrapper">
              <div>
                <img
                  className="welcome__mobile-badge-image"
                  src="https://trusat-assets.s3.amazonaws.com/badge.png"
                  alt="badge"
                ></img>
              </div>
              <div className="welcome__mobile-badge-copy-wrapper">
                <p>Track a sat to add it to your collection</p>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome__mobile-section-three-content--middle">
          <p>
            By learning to track satellites, you’ll join the global community of
            citizen scientists whose observations feed the TruSat catalog. All
            you need to start is a clear sky—no equipment required.
          </p>
        </div>

        <div className="welcome__mobile-section-three-content--bottom">
          <div className="welcome__mobile-section-three-content--bottom-list-title">
            Learn about:
          </div>
          <ul>
            <li>How to track sats</li>
            <li>Basics or orbital dynamics</li>
            <li>Tips for reading the stars</li>
            <li>Instructions for assembling a DIY sat-tracking mount.</li>
          </ul>
          <a
            href="https://learn.trusat.org/docs/guide"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              ReactGA.event({
                category: "Onboarding",
                action: "Clicked See Tutorials button",
                label: "On Welcome page -- Mobile",
              });
            }}
          >
            <Button
              text="SEE TUTORIALS"
              color="white"
              addStyles="welcome__button--mobile welcome__button--desktop-wide"
            ></Button>
          </a>
        </div>
      </section>

      <JoinTheMission view="Welcome" />

      {/* Section FIVE   */}
      <section className="welcome__section welcome__section-five">
        <div className="welcome__section-five-top">
          <h2>Stay in the loop</h2>
          <div className="welcome__section-five-top-image-button-wrapper">
            <img
              src="https://trusat-assets.s3.amazonaws.com/face-set.png"
              alt="faces"
            ></img>
            <span className="welcome__hide-on-mobile"></span>
            <div className="welcome__section-five-top-button-wrapper">
              <p>Join TruSat’s forum to receive updates on the project.</p>
              <a
                href="https://discuss.trusat.org"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  ReactGA.event({
                    category: "Onboarding",
                    action: "Clicked Join The Forum button",
                    label: "On Welcome page",
                  });
                }}
              >
                <Button
                  text="JOIN THE FORUM"
                  color="white"
                  addStyles="welcome__button--desktop welcome__section-five-top-button"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="welcome__section-five-spacer">
          <span></span>
          <span className="welcome__border-left welcome__hide-on-mobile"></span>
        </div>

        <div className="welcome__section-five-bottom">
          <img
            className="welcome__hide-on-mobile"
            src="https://trusat-assets.s3.amazonaws.com/illustration-posat2-square-540px.jpg"
            alt="earth"
          ></img>
          <span className="welcome__hide-on-mobile"></span>
          <div>
            <h2>More about TruSat</h2>
            <ul>
              <li>
                <a
                  className="app__link"
                  href="/about"
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked Overview link",
                      label: "On Welcome page",
                    });
                  }}
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  className="app__link"
                  href="https://learn.trusat.org/docs/start-here.html"
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked Deep Dive link",
                      label: "On Welcome page",
                    });
                  }}
                >
                  Deep dive
                </a>
              </li>
              <li>
                <a
                  className="app__link"
                  href="https://learn.trusat.org/docs/FAQ"
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked FAQ link",
                      label: "On Welcome page",
                    });
                  }}
                >
                  Frequently asked questions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="welcome__blue-background welcome__back-to-top-container welcome__hide-on-desktop">
        <p
          className="welcome__back-to-top"
          onClick={() => window.scrollTo(0, 0)}
        >
          ^ Back to top
        </p>
      </section>
    </div>
  );
}
