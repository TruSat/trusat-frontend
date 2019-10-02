import React from "react";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import Globe from "../assets/Globe.svg";
import RoundedButton from "../app/components/RoundedButton";

export default function Home() {
  return (
    <div className="welcome__wrapper">
      {/* SECTION/GRADIENT ONE */}
      <section className="welcome__section--one">
        <div className="welcome__title-logo-wrapper">
          <img
            className="welcome__image welcome__logo-image"
            src={TrusatLogoBig}
            alt="Trusat logo"
          ></img>

          <h2 className="welcome__trusat-tagline">
            OPEN SOURCE SPACE SUSTAINABILITY
          </h2>

          <img
            className="welcome__image welcome__globe-image"
            src={Globe}
            alt="globe"
          ></img>
        </div>

        <p className="welcome__large-copy">
          The number of satellites in low-Earth orbit is about to increase by
          10x.
        </p>
        <p className="welcome__large-copy">
          How do we ensure collisions and debris don’t trap us on Earth?
        </p>
        <p className="welcome__large-copy--bold">That's where you come in:</p>
        <div className="welcome__iframe-wrapper">
          <iframe
            className="welcome__iframe"
            title="pale blue dot video"
            src="https://www.youtube.com/embed/wupToqz1e2g"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
            mozallowullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
          ></iframe>
        </div>

        <p className="welcome__large-copy">
          TruSat is a global community measuring satellite behavior to ensure
          clean, open, usable space for everyone.
        </p>
      </section>

      {/* SECTION/GRADIENT TWO */}
      <section className="welcome__section--two">
        <div className="welcome__mailing-list-wrapper">
          <h2 className="welcome__sub-header--black">Stay in the loop</h2>
          <p className="welcome__small-copy--black">
            Join the mailing list to stay posted on the project
          </p>
          <div className="welcome__input-button-wrapper">
            <input
              className="welcome__input"
              type="email"
              placeholder="Your email"
            ></input>
            <RoundedButton
              addStyles="welcome__subscribe-button"
              color="black"
              text="SUBSCRIBE"
            />
          </div>
        </div>

        <div className="welcome__illustration-join-wrapper">
          <span className="welcome__illustration welcome__illustration--left"></span>
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">Start watching</h2>
            <p className="welcome__small-copy--white">
              Almost anyone can join the global sport of satellite tracking. You
              just need a clear sky. Report your observations for credit in the
              TruSat network.
            </p>
            <RoundedButton
              addStyles="welcome__join-button"
              color="orange"
              text="JOIN THE TRACKERS"
            />
          </div>
        </div>

        <div className="welcome__illustration-join-wrapper welcome__illustration-join-wrapper--center">
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">Start Building</h2>
            <p className="welcome__small-copy--white">
              TruSat is entirely open source. Check out the open issues,
              bounties, and our plans to open TruSat’s governance.
            </p>
            <RoundedButton
              addStyles="welcome__join-button"
              color="orange"
              text="JOIN THE BUILDERS"
            />
          </div>
          <span className="welcome__illustration welcome__illustration--right"></span>
        </div>

        <div className="welcome__illustration-join-wrapper">
          <span className="welcome__illustration welcome__illustration--left"></span>
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">How it works</h2>
            <p className="welcome__small-copy--white">
              I don’t yet know the copy that goes here, but it should basically
              be clickbait to get people to the Lite Paper so that the curious
              can learn something valuable.
            </p>
            <RoundedButton
              addStyles="welcome__join-button"
              color="orange"
              text="LEARN ABOUT TRUSAT"
            />
          </div>
        </div>
      </section>

      {/* SECTION/GRADIENT THREE */}
      <section className="welcome__section--three">
        <h2 className="welcome__sub-header--white">Partners</h2>
        <div className="welcome__partners-wrapper">
          <div
            style={{
              background: "#C4C4C4",
              borderRadius: "50%",
              height: "138px",
              marginBottom: "1em",
              width: "138px"
            }}
          ></div>
          <div
            style={{
              background: "#C4C4C4",
              borderRadius: "50%",
              height: "138px",
              marginBottom: "1em",
              width: "138px"
            }}
          ></div>
          <div
            style={{
              background: "#C4C4C4",
              borderRadius: "50%",
              height: "138px",
              marginBottom: "1em",
              width: "138px"
            }}
          ></div>
          <div
            style={{
              background: "#C4C4C4",
              borderRadius: "50%",
              height: "138px",
              marginBottom: "1em",
              width: "138px"
            }}
          ></div>
          <div
            style={{
              background: "#C4C4C4",
              borderRadius: "50%",
              height: "138px",
              marginBottom: "1em",
              width: "138px"
            }}
          ></div>
        </div>

        <div className="welcome__mailing-list-wrapper">
          <h2 className="welcome__sub-header--black">Stay in the loop</h2>
          <p className="welcome__small-copy--black">
            Join the mailing list to stay posted on the project
          </p>
          <div className="welcome__input-button-wrapper">
            <input
              className="welcome__input"
              type="email"
              placeholder="Your email"
            ></input>
            <RoundedButton
              addStyles="welcome__subscribe-button"
              color="black"
              text="SUBSCRIBE"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
