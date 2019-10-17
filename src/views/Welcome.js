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
          <p className="welcome__large-copy--bold">
            Space debris is a problem. <br className="app__hide-on-mobile"></br>You are the solution.
          </p>
          <p className="welcome__medium-copy--white">
            The number of satellites is increasing by 25x. Collisions threaten the technology we depend on every day, and our spacefaring future.          
          </p>
          <p className="welcome__large-copy--bold">
            Welcome to the sport <br className="app__hide-on-mobile"></br>of satellite tracking:
          </p>
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
          <p className="welcome__medium-copy--white">
            Use TruSat to find satellites in the sky with your naked eye, record their positions, and help create a planetary record that encourages sustainable practices in orbit.          
          </p>
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
            <h2 className="welcome__sub-header--white">Satellite tracking? <span className="welcome__small-copy--emoticon">¯\_(ツ)_/¯</span></h2>
            <p className="welcome__small-copy--white welcome__small-copy--bold">
              It’s fun, relaxing, and all you need is a clear sky
            </p>
            <ul className="welcome__small-copy__ul">
              <li>TruSat will show you to when and where to look to see satellites that are the highest priority to monitor. </li>
              <li>When you record an observation, you’ll be credited in the TruSat Catalog, and the satellite will be added to your collection.</li>
              <li>Never seen a sat? We’ll show you how.</li>
            </ul>
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
                  <div className="welcome__input-button-wrapper">
                    <input
                      required
                      name="EMAIL"
                      id="mce-EMAIL"
                      className="welcome__input welcome__input--white"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                    ></input>
                    <RoundedButton
                      type="submit"
                      name="subscribe"
                      addStyles="welcome__subscribe-button"
                      color="orange"
                      text="SUBSCRIBE"
                      id="mc-embedded-subscribe"
                      onSubmit={() => setEmail("")}
                    />
                  </div>
                </div>
              </form>
            </div>
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
