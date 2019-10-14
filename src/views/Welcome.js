import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
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
            src={`https://trusat-assets.s3.amazonaws.com/welcome-illustration.png`}
            alt="globe"
          ></img>
        </div>

        <div className="welcome__title-intro-wrapper">
          <p className="welcome__large-copy welcome__large-copy--bold">
            The number of satellites is increasing by 10x.
          </p>
          <p className="welcome__medium-copy--white">
            If we don’t limit satellite collisions, then debris could
            render space unusable for generations.
          </p>
          <p className="welcome__medium-copy--white">
            How do we ensure we don’t trap ourselves on Earth? With the sport of
            satellite tracking...
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
            modestbranding="1"
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
              We’ll show you how to spot satellites. It’s fun, and all you need
              is a clear sky.
            </p>
            <p className="welcome__small-copy--white">
            TruSat shows you when and where to look to see satellites that are the highest priority to monitor. When you record an observation, you’ll be credited in the <NavLink className="app__nav-link static-page__link" to="/catalog">TruSat Catalog</NavLink>, and the satellite will be added to your collection.
            </p>
            <p className="welcome__small-copy--white">
              Your observations are merged with others around the world to create a trusted record of satellite behavior.
            </p>
            <NavLink className="app__nav-link" to="/signup">
              <RoundedButton
                addStyles="welcome__join-button"
                color="orange"
                text="START TRACKING"
              />
            </NavLink>
          </div>
        </div>

        <div className="welcome__illustration-join-wrapper welcome__illustration-join-wrapper--center">
          <div className="welcome__join-copy-wrapper">
            <h2 className="welcome__sub-header--white">Join the build</h2>
            <p className="welcome__small-copy--white">
              TruSat is in its early alpha stage, and is entirely open
              source. Join our developer mailing list to stay updated on
              bounties, hackathons, and open issues.
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
              Space is wild. There’s been no way to ensure responsible practices in orbit, because there’s been no open, widely-trusted source of data about satellite behavior. 
            </p>
            <p className="welcome__small-copy--white">
              To fill this gap, the TruSat system is designed to enable the emerging space sustainability community to task a global network of citizen satellite observers to track satellites of interest. TruSat’s open software merges observations from around the planet into a decentralized record of orbital positions suitable for measuring orbital behavior against sustainability standards.             </p>
            <NavLink className="app__nav-link" to="/whitepaper">
              <RoundedButton
                addStyles="welcome__join-button"
                color="orange"
                text="LEARN MORE"
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
      </section>

      {/* SECTION/GRADIENT FOUR */}
      <section className="welcome__section--four">
        <div className="welcome__mailing-list-wrapper">
          <form
            action="https://consensys.us4.list-manage.com/subscribe/post?u=d2289b46e82a459c8808b427c&amp;id=8b9ce58d71"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
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
