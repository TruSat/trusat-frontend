import React, { Fragment } from "react";
import Button from "../components/Button";
import ReactGA from "react-ga";

// Styles for this component are lumped in with welcome page styles in the src/views/views-styles.scss file
// View prop is used for Google analytics
export default function JoinTheMission({ view }) {
  const numberCircle = (num, size) => {
    return (
      <div
        style={
          size === "small"
            ? {
                alignItems: "center",
                background: "#004F85",
                borderRadius: "50px",
                display: "flex",
                fontWeight: "bold",
                fontSize: "24px",
                height: "48px",
                lineHeight: "28px",
                justifyContent: "center",
                marginTop: "-25px",
                marginLeft: "-62px",
                width: "48px",
              }
            : {
                alignItems: "center",
                background: "#004F85",
                borderRadius: "50px",
                display: "flex",
                fontWeight: "bold",
                fontSize: "24px",
                height: "92px",
                lineHeight: "28px",
                justifyContent: "center",
                marginBottom: "-25px",
                marginLeft: "-40px",
                width: "92px",
              }
        }
      >
        {num}
      </div>
    );
  };

  return (
    <Fragment>
      {/* Section FOUR - DESKTOP  */}
      <div className="welcome__blue-background welcome__hide-on-mobile">
        <section className="welcome__section welcome__desktop-section-four ">
          <div className="welcome__desktop-section-four-top">
            <h2>Join the mission</h2>
            <div className="welcome__desktop-section-four-top--left">
              <p>
                For TruSat to remain an objective record of data, it requires
                that no single entity controls it. To achieve this, TruSat needs
                a diverse range of participants from around the world, like you.
              </p>
              <span></span>
            </div>
            <div className="welcome__desktop-section-four-top--right">
              <span></span>
              <img
                src="https://trusat-assets.s3.amazonaws.com/mission_people.jpg"
                alt="people"
              ></img>
            </div>
          </div>
          <div className="welcome__desktop-section-four-bottom">
            <h2>Three ways to participate:</h2>
            <div className="welcome__desktop-button-tile-row">
              {/* tile 1 container */}
              <div className="welcome__desktop-button-tile-container">
                <div>
                  {numberCircle(1, "small")}
                  <div className="welcome__desktop-button-tile">
                    <div className="welcome__desktop-button-tile-copy">
                      <h3>Make Observations</h3>
                      <ul>
                        <li>
                          Become a node in TruSat’s network of citizen observers
                        </li>
                        <li>
                          Use your naked eye, or connect your camera with
                          software.
                        </li>
                      </ul>
                    </div>
                    <a
                      href="/signup"
                      onClick={() => {
                        ReactGA.event({
                          category: "Onboarding",
                          action: "Clicked Sign Up button",
                          label: `On ${view} page -- Desktop`,
                        });
                      }}
                    >
                      <Button
                        text="SIGN UP"
                        color="white"
                        addStyles="welcome__button--desktop welcome__button--desktop-wide"
                      />
                    </a>
                  </div>
                </div>
              </div>
              {/* tile 2 container */}
              <div className="welcome__desktop-button-tile-container">
                <div>
                  {numberCircle(2, "small")}
                  <div className="welcome__desktop-button-tile">
                    <div className="welcome__desktop-button-tile-copy">
                      <h3> Contribute code</h3>
                      <ul>
                        <li>100% open source</li>
                        <li>Detailed specs for new features</li>
                        <li>Full queue of issues to pitch in on</li>
                        <li>Orbital mechanics utilities</li>
                      </ul>
                    </div>
                    <a
                      href="https://github.com/TruSat"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        ReactGA.event({
                          category: "Onboarding",
                          action: "Clicked View on Github button",
                          label: `On ${view} page -- Desktop`,
                        });
                      }}
                    >
                      <div className="app__button--white welcome__button--desktop welcome__github-button">
                        <img
                          className="welcome__github-icon"
                          src="https://image.flaticon.com/icons/svg/25/25231.svg"
                          alt="github"
                        ></img>
                        <p>VIEW ON GITHUB</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              {/* tile 3 container */}
              <div className="welcome__desktop-button-tile-container">
                <div>
                  {numberCircle(3, "small")}
                  <div className="welcome__desktop-button-tile">
                    <div className="welcome__desktop-button-tile-copy">
                      <h3>Support the mission</h3>
                      <ul>
                        <li>Propose features</li>
                        <li>Create or translate content</li>
                        <li>Submit bugs</li>
                        <li>Spread the word</li>
                      </ul>
                    </div>
                    <a
                      href="https://learn.trusat.org/docs/participate#3-support-the-mission"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        ReactGA.event({
                          category: "Onboarding",
                          action: "Clicked Learn More button",
                          label: `On ${view} page -- Desktop`,
                        });
                      }}
                    >
                      <Button
                        text="LEARN MORE"
                        color="white"
                        addStyles="welcome__button--desktop welcome__button--desktop-wide"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section FOUR - MOBILE */}
      <div className="welcome__blue-background welcome__hide-on-desktop">
        <section className="welcome__section welcome__mobile-section-four">
          <div className="welcome__mobile-section-four-top">
            <h2>Join the mission</h2>
            <img
              src="https://trusat-assets.s3.amazonaws.com/mission_people.jpg"
              alt="people"
            ></img>
            <p>
              For TruSat to remain an objective record of data, it requires that
              no single entity controls it. To achieve this, TruSat needs a
              diverse range of participants like you.
            </p>
          </div>
          <div className="welcome__mobile-section-four-bottom">
            <div className="welcome__mobile-section-four-bottom-header-wrapper">
              <h2>Three ways to participate:</h2>
            </div>
            <div className="welcome__mobile-section-four-button-til-wrapper">
              {/* tile 1 */}
              <div className="welcome__mobile-button-tile">
                {numberCircle(1, "large")}
                <h3>Make Observations</h3>
                <ul>
                  <li>
                    Become a node in TruSat’s network of citizen observers
                  </li>
                  <li>
                    Use your naked eye, or connect your camera with software.
                  </li>
                </ul>
                <a
                  href="/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked Sign Up button",
                      label: `On ${view} page -- Desktop`,
                    });
                  }}
                >
                  <Button
                    text="SIGN UP"
                    color="white"
                    addStyles="welcome__button--mobile welcome__button--desktop-wide"
                  />
                </a>
              </div>
              {/* tile 2 */}
              <div className="welcome__mobile-button-tile">
                {numberCircle(2, "large")}
                <h3> Contribute code</h3>
                <ul>
                  <li>100% open source</li>
                  <li>Detailed specs for new features</li>
                  <li>Full queue of issues to pitch in on</li>
                  <li>Orbital mechanics utilities</li>
                </ul>
                <a
                  href="https://github.com/TruSat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked View on Github button",
                      label: `On ${view} page -- Mobile`,
                    });
                  }}
                >
                  <div className="app__button--white  welcome__button--mobile welcome__button--mobile-wide welcome__github-button">
                    <img
                      className="welcome__github-icon"
                      src="https://image.flaticon.com/icons/svg/25/25231.svg"
                      alt="github"
                    ></img>
                    <p>VIEW ON GITHUB</p>
                  </div>
                </a>
              </div>
              {/* tile 3 */}
              <div className="welcome__mobile-button-tile">
                {numberCircle(3, "large")}
                <div>
                  <h3>Support the mission</h3>
                  <ul>
                    <li>Propose features</li>
                    <li>Create or translate content</li>
                    <li>Submit bugs</li>
                    <li>Spread the word</li>
                  </ul>
                </div>
                <a
                  href="https://learn.trusat.org/docs/start-here.htmlhttps://learn.trusat.org/docs/participate#3-support-the-mission"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    ReactGA.event({
                      category: "Onboarding",
                      action: "Clicked Learn More button",
                      label: `On ${view} page -- Mobile`,
                    });
                  }}
                >
                  {" "}
                  <Button
                    text="LEARN MORE"
                    color="white"
                    addStyles="welcome__button--mobile welcome__button--mobile-wide"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
