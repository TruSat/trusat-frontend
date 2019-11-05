import React from "react";
import MailingListForm from "../app/components/MailingListForm";

export default function HowToPhoto() {
  return (
    <div className="static-page__wrapper static-page__wrapper--how-to">
      <section className="static-page__section">
        <img
          className="about__illustration"
          src="https://trusat-assets.s3.amazonaws.com/dslr-photo.jpg"
          alt="DSLR shot of satellite"
        ></img>
        <h1 className="static-page__main-header--small">
          Satellite Tracking with a Digital Camera
        </h1>
        <p className="static-page__copy about__deck">
          This page offers a brief introduction to utilizing a digital camera to
          track satellites.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">The advantage of photos</h2>
        <p className="static-page__copy">
          Much like utilizing binoculars, the objective is ultimately to measure
          the precise location of a satellite at a specific time. Photos help
          create a permanent digital record that can be computer-processed for
          accuracy and automation.
        </p>
        <p className="static-page__copy">
          By pointing your camera at the star pattern and taking a series of
          pictures, the satellite will appear as a short arc against a star
          background — which can be used for a precise position reference.
        </p>
        <p className="static-page__copy">
          The camera electronics are more sensitive than your eyes, and even
          with a short exposure of a few seconds, you can see stars and
          satellites invisible to the unaided eye. Using free software, you can
          convert these images into formatted observation records which can be
          submitted to the TruSat catalog.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">What's needed</h2>
        <ul className="how-to__ul static-page__copy">
          <li className="">
            {" "}
            Digital SLR camera (or another digital camera with shutter controls)
          </li>
          <li className="">50-80mm lens</li>
          <li className="">Tripod</li>
          <li className="">
            A clear night shortly after sunset, or before sunrise.
          </li>
        </ul>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">Getting started</h2>
        <p className="static-page__copy">
          To determine the best place and time to point your camera, see this
          explainer video on how to use the{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.heavens-above.com/"
          >
            Heavens-Above
          </a>{" "}
          website to predict visible satellite passes for your location:
        </p>
        <div className="welcome__iframe-wrapper">
          <iframe
            className="welcome__iframe"
            title="pale blue dot video"
            src="https://www.youtube.com/embed/DmSL1MweU7M"
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
        <p className="static-page__copy">
          You will need to experiment with your camera settings, such as setting
          exposure durations long enough to capture enough stars to serve as a
          position reference for any satellite arcs you may capture. A quick way
          to determine if your images are good for satellite tracking is to
          submit a picture to{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="http://nova.astrometry.net/"
          >
            nova.astrometry.net.
          </a>{" "}
          If the site is able to compute the precise direction of your camera,
          you are on your way to satellite observing!
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">Software</h2>
        <p className="static-page__copy">
          Users who are getting started can use Windows programs like{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.satobs.org/orbsoft.html"
          >
            ObsReduce
          </a>{" "}
          or{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://langbrom.home.xs4all.nl/software.html"
          >
            IODEntry
          </a>{" "}
          to assist converting the information in your picture into a formatted
          observation records which can be submitted to the TruSat catalog.
        </p>
        <p className="static-page__copy">
          More advanced users familiar with compiling open source software can
          explore the{" "}
          <a
            className="static-page__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/cbassa/stvid"
          >
            STVID
          </a>{" "}
          project, which can directly interface with some digital cameras,
          automatically detect, extract, and process observation entries from
          the images it creates. Amateur satellite observers use this software
          to allow one person to make 100’s of satellite observations in one
          night!
        </p>
        <p className="static-page__copy">
          As we develop the TruSat roadmap, we hope to incorporate many of these
          tools and capabilities directly into TruSat.org
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header">Seeking test pilots</h2>
        <p className="static-page__copy">
          At this time, translating basic observation data (time and location)
          into a format readable by version 0.1 of the TruSat Prototype requires
          a relatively advanced workflow, including use of free third-party
          software, and is not recommended for all but the most committed.
        </p>
        <p className="static-page__copy">
          If you are that person and want to become a TruSat Alpha Test Pilot,
          please sign up here:
        </p>
        <MailingListForm testPilots={true} />
        <p className="static-page__copy how-to__copy--with-margin">
          We’ll help walk you through the process and get you set up with the
          necessary software tools.
        </p>
      </section>
    </div>
  );
}
