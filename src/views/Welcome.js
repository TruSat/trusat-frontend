import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import Globe from "../assets/welcome-illustration.png";
import Arrow from "../assets/Arrow.svg";
import IllustrationPlaceholder from "../assets/welcome-illustration-placeholder-square.png";
import RoundedButton from "../app/components/RoundedButton";

export default function Home() {
  const [email, setEmail] = useState("");

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
        
        <div className="welcome__title-intro-wrapper">
          <p className="welcome__large-copy welcome__large-copy--bold">
            The number of satellites in low-Earth orbit is increasing by 10x.
          </p>
          <p className="welcome__medium-copy--white">
            If we don’t grow responsibly, satellite collisions and debris could render space unusable.
          </p>
          <p className="welcome__medium-copy--white">
            How do we ensure we don’t trap ourselves on Earth?—with the sport of satellite tracking.
          </p>
          <div className="welcome_arrow-wrapper">
          <img
            className="welcome__image welcome__arrow-image"
            src={Arrow}
            alt="down arrow"
          ></img>
          </div>
        </div>

        <div className="welcome__iframe-wrapper">
          <iframe
            className="welcome__iframe"
            title="pale blue dot video"
            src="https://www.youtube.com/embed/YYWaJ7Hd7fQ"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="allowfullscreen"
            mozallowullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
          ></iframe>
        </div>

      </section>

      {/* SECTION/GRADIENT TWO */}
      <section className="welcome__section--two">

        <div className="welcome__illustration-join-wrapper">
          <img
            className="welcome__illustration welcome__illustration--left"
            src={IllustrationPlaceholder}
            alt="Illustration"
          ></img>
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">Join the trackers</h2>
            <p className="welcome__small-copy--white">
              We’ll show you how to spot satellites. It’s fun, and all you need is a clear sky.
            </p>
            <p className="welcome__small-copy--white">
              TruSat points you to satellites that are the highest priority to monitor. It combines observations from around the world into an accurate record of satellite behavior.
            </p>
            <p className="welcome__small-copy--white">
              Report your observations to the global satellite catalog to earn credit in the TruSat network.
            </p>
            <NavLink className="app__nav-link" to="/signup">
              <RoundedButton
                addStyles="welcome__join-button"
                color="orange"
                text="JOIN THE TRACKERS"
              />
            </NavLink>
          </div>
        </div>

        <div className="welcome__illustration-join-wrapper welcome__illustration-join-wrapper--center">
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">Join the build</h2>
            <p className="welcome__small-copy--white">
              TruSat is an early beta release. The project is entirely open source. Join our developer mailing list to stay updated on bounties, hackathons, and open issues.
            </p>
            <a
              className="app__nav-link"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/consensys-space"
            >
              <RoundedButton
                addStyles="welcome__join-button"
                color="orange"
                text="JOIN THE BUILDERS"
              />
            </a>
          </div>
          <img
            className="welcome__illustration welcome__illustration--right"
            src={IllustrationPlaceholder}
            alt="Illustration"
          ></img>   
        </div>

        <div className="welcome__illustration-join-wrapper">
          <img
            className="welcome__illustration welcome__illustration--left"
            src={IllustrationPlaceholder}
            alt="Illustration"
          ></img>          
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">How TruSat works</h2>
            <p className="welcome__small-copy--white">
              I don’t yet know the copy that goes here, but it should basically
              be clickbait to get people to the Lite Paper so that the curious
              can learn something valuable.
            </p>
            <NavLink className="app__nav-link" to="/whitepaper">
              <RoundedButton
                addStyles="welcome__join-button"
                color="orange"
                text="LEARN ABOUT TRUSAT"
              />
            </NavLink>
          </div>
        </div>
      </section>

      {/* SECTION/GRADIENT THREE */}
      <section className="welcome__section--three">
        <div className="welcome__partners-wrapper">
          <h2 className="welcome__sub-header--white">Partners</h2>
          <div className="welcome__partners-list">
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

        <div className="welcome__mailing-list-wrapper">
          <form
            action="https://consensys.us4.list-manage.com/subscribe/post?u=d2289b46e82a459c8808b427c&amp;id=8b9ce58d71"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            class="validate"
            target="_blank"
            novalidate
          >
            <div className="welcome__mailing-list-inputs">
              <h2 className="welcome__sub-header--black">Stay in the loop</h2>
              <p className="welcome__small-copy--black">
                Join the mailing list to stay posted on the project
              </p>
              <div className="welcome__input-button-wrapper">
                <input
                  required
                  name="EMAIL"
                  id="mce-EMAIL"
                  className="welcome__input"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                ></input>
                <RoundedButton
                  type="submit"
                  name="subscribe"
                  addStyles="welcome__subscribe-button"
                  color="black"
                  text="SUBSCRIBE"
                  id="mc-embedded-subscribe"
                  onSubmit={() => setEmail("")}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
