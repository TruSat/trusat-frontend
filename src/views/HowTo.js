import React from "react";
import HowToAppScreenshotPlaceholder from "../assets/how_to-sky_view-placeholder.png";
import IconClock from "../assets/icon-clock.svg";
import IconLocation from "../assets/icon-location.svg";

export default function HowTo() {
  return (
    <div className="static-page__wrapper static-page__wrapper--how-to">
      <section className="static-page__section">
        <img
          className="about__illustration"
          src="https://trusat-assets.s3.amazonaws.com/illustration-evening-720px.png"
          srcSet="https://trusat-assets.s3.amazonaws.com/illustration-evening-720px.png, https://trusat-assets.s3.amazonaws.com/illustration-evening-100px.png"
          alt="Illustration"
        ></img>
        <h1 className="static-page__main-header--small">
          Welcome to the sport of satellite tracking
        </h1>
        <p className="static-page__copy about__deck">
          Spotting satellites in the night sky can be a relaxing, rewarding
          activity. The serenity of contemplating the night sky, the thrill of
          catching a satellite passing by at 28,000kph.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Intro: What does Satellite Tracking Involve?
        </h2>
        <p className="static-page__copy">
          To determine a satellite’s orbit, you need two basic pieces of
          information:
        </p>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">1.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={IconClock}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              The time at which you observe the satellite cross an imaginary
              line between two known stars
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">2.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={IconLocation}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Your location on Earth when you made this observation (Latitude,
              Longitude, and Altitude)
            </p>
          </div>
        </div>
        <p className="static-page__copy">
          Right now, timing a satellite is a relatively manual process and takes
          some practice. TruSat will continually add features to make this
          process easier and more enjoyable. You can be the first to know about
          new features by joining the TruSat Community. And please share your
          ideas for new features, and your tips for satellite spotting in the
          TruSat Forum.
        </p>
        <p className="static-page__copy">
          If you’re new to the sport, don’t worry about trying to time a
          satellite on your first outing. We’ll walk you through a progression
          of activities to build your skills, familiarize yourself with the
          night sky, and enjoy yourself along the way.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Level 1: Spotting a Satellite in the Night Sky
        </h2>
        <p className="static-page__copy">
          If you look up for long enough, you’ll see a star-like point of light
          moving continuously across the night sky. That’s a satellite! Spotting
          your first satellite this way, without worrying about timing it, is a
          good way to get acquainted with the night sky, and how satellites move
          through it (if it blinks, it’s probably an airplane).
        </p>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">1.</div>
          <div className="how-to__step__image-wrapper">[image]</div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Satellites are most visible in certain windows of the morning and
              evening, when the sun is low enough for a dark sky, but still high
              enough to cast light reflected by the satellite. The best time to
              spot a satellite is 30 - 90 minutes after sunset or before
              sunrise. Expect to see more stars than you can quickly count when
              scanning thethis sky in that time frame.
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">2.</div>
          <div className="how-to__step__image-wrapper">[image]</div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              If it’s a clear night and you’re in an area without too much light
              pollution, you’ll be able to see a number of satellites with your
              bare eyes. A pair of binoculars will greatly increase the
              conditions in which you can spot satellites.
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">3.</div>
          <div className="how-to__step__image-wrapper">[image]</div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Train your eyes (or binoculars) on a fixed point in the night sky
              and wait. Relax, breathe deeply, and contemplate just how large
              our universe is. Pro tip: if you want to look straight up, laying
              on your back will save your neck.
            </p>
          </div>
        </div>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Level 2: Finding a Specific Satellite
        </h2>
        <p className="static-page__copy">
          The next level is looking at the right place at the right time to see
          a specific satellite. There are two easy methods to determine when and
          where to look in the night sky
        </p>
      </section>
      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Augmented reality mobile apps
        </h2>
        <p className="static-page__copy">
          If you happen to be outside at night and want to spot a satellite on a
          whim, a smartphone app like SkyView (
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://play.google.com/store/apps/details?id=com.t11.skyviewfree&hl=en_US"
          >
            Android
          </a>{" "}
          and{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://apps.apple.com/us/app/skyview-lite/id413936865"
          >
            Apple
          </a>
          ) will do most of the work for you. >>> [Step by step with screen
          shots of SkyView]
        </p>
        <p className="static-page__copy">
          SkyView allows you to search their catalog for a satellite then the AR
          features of the app point you in the direction of the satellite you’re
          looking for. Apps like SkyView are best for impromptu satellite
          spotting sessions.
        </p>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">1.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={HowToAppScreenshotPlaceholder}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">2.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={HowToAppScreenshotPlaceholder}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">3.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={HowToAppScreenshotPlaceholder}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">4.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={HowToAppScreenshotPlaceholder}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
        <div className="how-to__step-wrapper">
          <div className="how-to__step__number">5.</div>
          <div className="how-to__step__image-wrapper">
            <img
              className="how-to__screenshot"
              src={HowToAppScreenshotPlaceholder}
              alt="Skyview screenshot"
            ></img>
          </div>
          <div className="how-to__step__description">
            <p className="static-page__copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>
          </div>
        </div>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">Star maps</h2>
        <p className="static-page__copy">
          If you want to find a specific satellite, we recommend planning ahead
          because satellites in Low Earth Orbit (LEO) do not appear at the same
          spot and time each day.
        </p>
        <p className="static-page__copy">
          Sites like{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.heavens-above.com/PassSummary.aspx?satid=25544&lat=0&lng=0&loc=Unspecified&alt=0&tz=UCT"
          >
            Heavens Above
          </a>{" "}
          and{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.calsky.com/cs.cgi?cha=12&sec=4"
          >
            CalSky
          </a>{" "}
          will tell you all the times a particular satellite will be visible at
          your location, which passes will be easiest for you to see, and plot
          the satellite’s path along star maps.
        </p>
        <p className="static-page__copy">
          The International Space Station (ISS) is a good satellite to start
          with because it is quite bright (brighter than some planets). And
          there are people onboard! This video will walk you through using
          Heavens Above to plan your satellite hunt.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">Level 3: Timing a satellite</h2>
        <p className="static-page__copy">
          This is the narrated, screen recorded video for using Heavens Above
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
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">
          Level 4: Formatting Data for Submission to TruSat
        </h2>
        <p className="static-page__copy">
          Once you have timed a satellite, the final step is to input your time
          and location data into software that will calculate an initial orbit
          determination (IOD).
        </p>
        <p className="static-page__copy">
          At this time, translating basic observation data (time and location)
          into a format readable by version 0.1 TruSat Prototype requires a
          relatively advanced workflow, including use of free third-party
          software, and is not recommended for all but the most committed.
        </p>
        <p className="static-page__copy">
          If you are that person and want to become a TruSat Alpha Test Pilot,
          please email{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:support@trusat.org"
          >
            support@trusat.org
          </a>{" "}
          and we’ll help walk you through the process and get you set up with
          the necessary software tools.
        </p>
      </section>
    </div>
  );
}
