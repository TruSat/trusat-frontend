import React from "react";
import { NavLink } from "react-router-dom";
import TestPilots from "../app/components/TestPilots";
import IllustrationPlaceholderWide from "../assets/welcome-illustration-placeholder-16x9.png";


export default function FAQ() {
  return (
    <div className="static-page__wrapper static-page__wrapper--faq">
      <section className="static-page__section">
        <img
                className="about__illustration"
                src={IllustrationPlaceholderWide}
                alt="Illustration"
              ></img>
        <h1 className="static-page__main-header--small">Frequently asked questions</h1>
  
        <h2 className="static-page__sub-header about__sub-header--top">
          What Problems is TruSat Designed to Solve?
        </h2>
        <h3 className="about__question">What is space sustainability?</h3>
        <div className="about__answer">
          <p className="static-page__copy">
          Space sustainability is about preserving the use of outer space, and all of its socioeconomic benefits, for present and future generations.  The primary threat to the long-term usability of space is Earth-orbital debris: non-functional spacecraft, pieces of spacecraft discarded in the course of space missions, and fragments from collisions between spacecraft, and from spacecraft destroyed by weapons tests.  While outer space is infinitely large, the orbital positions around Earth suitable for the myriad space applications on which we depend are finite and increasingly congested.  
          </p>
          <p className="static-page__copy">
          Global public awareness and concern about space sustainability is rising with the deployment of the first of thousands of satellites comprising so-called “mega-constellations” to provide broadband internet service from low Earth orbit (“LEO”).  To put these constellations in perspective, the satellites planned for deployment by just three companies would add as approximately 46,000 satellites to the LEO environment in the 2025-2030 time horizon; roughly a 25X increase above the present population of operational satellites.  As LEO grows increasingly congested, so grows the risk not only of collisions—between operational satellites or debris—but also catastrophic, cascading chains of collisions rendering vital swaths of Earth orbits unusable for generations.
          </p>
        </div>

        <h3 className="about__question">
        How does satellite tracking relate to space sustainability?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy">
          There is no air traffic control-like authority directing this growing space traffic.  Enlightened satellite operators, governments, and civil society are coming together to define guidelines and standards for sustainable orbital operations.  The efficacy of such standards will depend accountability for adhering to them.  However, independent assessment of satellite operations against sustainability standards requires a freely-accessible, globally trusted record of satellites orbital positions.  TruSat is designed to fill this gap.
          </p>
        </div>

        <h3 className="about__question">
          Don’t governments and companies already track objects in space?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          A handful of national governments track objects in space for national security purposes, and make a portion of their data publicly available.  While these government programs are vital, they are not suited for independent assessment of compliance with space sustainability standards.  Because a single national government controls the data, whose creation is neither transparent nor verifiable, it is not always trusted as a source of truth by all involved in space sustainability applications. 
          </p>
        </div>
        </section>

        <section className="static-page__section">
        <h2 className="static-page__sub-header about__sub-header--top">
        How TruSat Works
        </h2>

        <h3 className="about__question">
        What is TruSat?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          TruSat is an open source, citizen-powered system for creating a trusted record of satellite orbits in service of the long-term sustainability of outer space.  This TruSat System comprises two main elements: satellite observers, who make and report satellite observations, and TruSat software that autonomously processes observations of a satellite from multiple points around Earth into an orbit prediction and confidence assessment of that prediction.  Space sustainability advocates may task the TruSat System to observe satellites of interest for sustainability purposes, and utilize the resulting data.
          </p>
          <p className="static-page__copy ">
          The TruSat system is developed and maintained by the TruSat Open Source Community.  In addition to developing the TruSat Software, this global community of contributors provide valuable input on feature roadmaps, author documentation and other content that enable a diverse range of contributors, and translate them into multiple languages.
          </p>
        </div>

        <h3 className="about__question">
        Who uses TruSat’s record of satellite orbits?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          TruSat’s data is openly available without restriction to anyone who chooses to use it.  TruSat is designed to provide space sustainability advocates data suitable for assessing satellite operations against emerging standards for responsible orbital operations   Spacecraft operators, NGOs, and Research Institutions often use this type of data to support their operations and research about objects in space. 
          </p>
        </div>

        <h3 className="about__question">
        Why should anyone trust TruSat’s record of satellite orbits 
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          TruSat is architected for trust.  Whereas trust in existing sources of SSA data depend on trust in the humans and institutions in the loop—that the orbital prediction reflects a competent analysis of the sensor data, free of any institutional interests—TruSat substitutes transparent, verifiable algorithms for institutional input.  While humans are involved in generating the initial satellite observation data fed into the System, TruSat’s Proof of Satellite software engine is entirely automated, leaving no room for tampering.  Unlike existing sources of SSA data, the entirety of the algorithms that translates individual satellite observations into an orbital prediction with a confidence assessment—the confidence factors applied, and their weighting—are transparent, enabling any orbital prediction to be reverse-engineered.  Built atop the Ethereum blockchain, TruSat will periodically check its file and data integrity against tamper-evident blockchain records, ensuring that the algorithms in effect at any given time are those approved by the TruSat Community.  Additional verifiability of TruSat’s orbital predictions comes courtesy of nature: any person may physically observe a satellite in the TruSat catalog to verify the accuracy of the orbital prediction. 
          </p>
        </div>

        <h3 className="about__question">
        Why a citizen-powered system?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          The diversity of observations of a satellite (by geography, nationality, etc.) help to promote trust in the resulting data.
          </p>
          <p className="static-page__copy ">
          TruSat is also designed to provide opportunities for concerned citizens to make concrete, measurable contributions to the long-term sustainability of outer space. 
          </p>
        </div>
        </section>

        <section className="static-page__section">
        <h2 className="static-page__sub-header about__sub-header--top">
        Using the TruSat Prototype
        </h2>

        <h3 className="about__question">
        How do I track satellites?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          <NavLink className="app__nav-link static-page__link" to="/how">
                This tutorial
              </NavLink> will walk you through it.
          </p>
        </div>


        <h3 className="about__question">
        What does “prototype” mean in the context of TruSat?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          The version 0.1 TruSat software released on October 21, 2019 is an engineering prototype intended for testing and refining core elements for generating orbit predictions from observations of a satellite from multiple points around Earth.  This early prototype has only a fraction of TruSat’s planned features and functionality.  Notably absent in this first release are features for easing the process of making and submitting satellite observations; it relies on a relatively manual workflow for formatting observation data for submission.  Accordingly, we recommend only the most committed “test pilots” submit satellite observations through this prototype.  If you want to be a test pilot, sign up:
          </p>
          <TestPilots />
        </div>

        <h3 className="about__question">
        Where is the smartphone app for tracking satellites?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          The smartphone app depicted in the TruSat video is a representation of how accessible and seamless we aim to make the process of making and reporting satellite observations.  We are exploring several avenues of utilizing ubiquitous consumer devices to automate and simplify the process as much as possible, including smartphone apps and features for automatically extracting Initial Orbit Determination data from digital photographs.  ConsenSys Space is planning to host hackathons to build many of these features.  Whether you want to share your ideas for these features or help to build them, we hope you’ll 
          {" "}<NavLink className="app__nav-link static-page__link" to="/join">
            join the TruSat Community
          </NavLink>.
          </p>
          <p className="static-page__copy ">
          In the meantime, several smartphone apps such as SkyView offer augmented reality features that take much of the manual work out of finding a satellite in the night sky.  
          {" "}<NavLink className="app__nav-link static-page__link" to="/how">
            See how you can use a smartphone app to find satellites here
          </NavLink>.
          </p>
        </div>

        <h3 className="about__question">
        What equipment do I need to observe a satellite?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          While many satellites are visible to the naked eye in locations without much light pollution, a pair of binoculars and accurate clock will enable you to reliably observe and track satellites.  As explained in 
          {" "}<NavLink className="app__nav-link static-page__link" to="/how">
          these instructional materials 
          </NavLink>,
          a range of smartphone apps and online resources will tell you when and where in the sky to look, based on your location.  If you have a digital SLR camera and tripod, you can use it to make satellite observations, as explained here. 
          </p>
        </div>
        </section>

        <section className="static-page__section">
        <h2 className="static-page__sub-header about__sub-header--top">
        Building TruSat’s Future
        </h2>

        <h3 className="about__question">
        What does the TruSat roadmap look like?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          Features and functionality that ease the process of making and submitting satellite observations, making TruSat accessible to the broadest-possible range of participants, are a key priority in the roadmap.
          </p>
          <p className="static-page__copy ">
          TruSat’s algorithms for calculating orbits and confidence assessments will be continuously refined by TruSat’s open source community. 
          </p>
          <p className="static-page__copy ">
          The version 0.2 release will add “Mission” functionality, enabling space sustainability advocates to prioritize satellites for observation according to sustainability, in accordance with the 
          {" "}<NavLink className="app__nav-link static-page__link" to="/join">
            TruSat Charter
          </NavLink>.
          </p>
          <p className="static-page__copy ">
          The TruSat roadmap contemplates a progressive decentralization of the TruSat system and its governance, in connection with a migration to Ethereum mainnet.  Migration to Ethereum mainnet will enable a range of enhancements to security, trust architecture, and the introduction of extrinsic incentives for participation.
          </p>
        </div>

        <h3 className="about__question">
        How can I contribute to TruSat other than by making satellite observations?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          TruSat depends on the diverse skillsets of its global Open Source Community, from developing new software features to creating content in multiple languages to enable people around the world to participate and contribute.  To learn more about these opportunities, please 
          {" "}<NavLink className="app__nav-link static-page__link" to="/join">
            join the Community
          </NavLink>.
          </p>
          <p className="static-page__copy ">
          If you wish to further explore how to contribute, please contact ConsenSys Space Community Manager, Kim Macharia at <a href="mailto:Kim.Macharia@consensys.net">Kim.Macharia@consensys.net.</a>.
          </p>
        </div>
        </section>

        <section className="static-page__section">
        <h2 className="static-page__sub-header about__sub-header--top">
        Who is behind TruSat?
        </h2>

        <h3 className="about__question">
        Who built TruSat?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          ConsenSys Space developed the version 0.1 release of TruSat, and is also developing version 0.2.  Community involvement will become an integral part of TruSat software development beginning in January 2020.
          </p>
        </div>

        <h3 className="about__question">
        How does TruSat make money?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          As the TruSat.org domain signifies, TruSat is designed to generate a global public good rather than profit. 
          </p>
          <p className="static-page__copy ">
          ConsenSys has broad business interests in developing and growing the Ethereum ecosystem.  Pioneering applications of Ethereum that illuminate entirely new solution spaces for old, stubborn problems benefit the ecosystem.  ConsenSys believes that enabling large-scale, global collective action is among the most transformative potential applications of Ethereum blockchain technology, and is investing in solving space-related collective action challenges as R&D to accelerate the realization of this potential.  
          </p>
        </div>
        
        <h3 className="about__question">
        How is TruSat governed?
        </h3>
        <div className="about__answer">
          <p className="static-page__copy ">
          {" "}<NavLink className="app__nav-link static-page__link" to="/join">
            The TruSat Charter
          </NavLink>{" "}specifies the governance arrangements for the TruSat System and Open Source Community.  The Charter will be regularly revised to meet the governance needs of the Community and to give effect to its Guiding Principles.  Each version of the Charter is identified by an Epoch: a period measured in time or milestones in which that version is in effect. 
          </p>
          <p className="static-page__copy ">
          Governance of the TruSat Community will be progressively decentralized.  Epochs 1 and 2 are experimental “incubation” periods for both the Software and the Community.  Beginning in Epoch 2, Open Source Community contributions will be integral to building out the Software Roadmap.  Whereas Community governance will initially be based upon a “benevolent leader” model—in which ConsenSys Space makes decisions in consultation with the TruSat Partners—the governance model will progressively evolve toward a “meritocratic model” in step with the growth of Community contributions to the software. 
          </p>
        </div>
      </section>

      <section className="static-page__section">
        <p className="static-page__copy">
          Have any other questions? Reach out to us at{" "}
          <a className="static-page__link" href="mailto:support@trusat.org">
            support@trusat.org
          </a>
        </p>
      </section>
    </div>
  );
}
