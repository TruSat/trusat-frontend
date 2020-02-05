import React from "react";
import Button from "../app/components/Button";
import MailingListForm from "../app/components/MailingListForm";

export default function Prize() {
  return (
    <div className="prize">
      <section className="prize__section">
        <h2 className="prize-join__header">
          Invent the D.I.Y. satellite  tracking solution to preserve our
          spacefaring future{" "}
        </h2>
        <Button text={"JOIN THE CHALLENGE"} color={"orange"} />
        <h3>SUBMIT YOUR ENTRY</h3>
      </section>

      <section className="prize__section">
        <h2>Makers of Earth...</h2>
        <p>
          With the explosive growth of satellites in orbit, the future of the
          technology we rely on daily depends on satellite operators acting
          responsibly. To enhance incentives for responsible, sustainable
          satellite operations, ConsenSys Space and its partners launched
          TruSat, an open source, citizen-powered system for creating a
          transparent, independent record of satellite behavior in orbit.
        </p>
        <p>
          We believe widely-available consumer technology can be harnessed to
          make satellite tracking more accessible and fun. So we’re challenging
          Earth’s tinkerers, hackers, photographers, and makers to design
          low-cost solutions that makes satellite tracking possible for anyone.
        </p>
        <p>
          From apps that help someone point their digital camera at the right
          place in the sky to catch a particular satellite, to purpose-built
          camera rigs that can capture hundreds of satellites per hour, this is
          your opportunity to provide a crucial ingredient for a global,
          citizen-led satellite tracking network.
        </p>
      </section>

      <section className="prize__section">
        <h2>The problem to solve</h2>
        <div className="prize-problem-section__problem-wrapper">
          <img
            src="https://www.etftrends.com/wp-content/uploads/2019/05/The-Bitcoin-Tear-Continues-As-Market-Breaches-8000.jpg"
            alt="planet"
            className="prize-problem-section__problem-image"
          />
          <p>
            TruSat takes in observations of a satellite from different observers
            around Earth to calculate the satellite’s orbit.
          </p>
        </div>
        <div className="prize-problem-section__problem-wrapper">
          <img
            src="https://www.etftrends.com/wp-content/uploads/2019/05/The-Bitcoin-Tear-Continues-As-Market-Breaches-8000.jpg"
            alt="planet"
            className="prize-problem-section__problem-image"
          />
          <p>
            To make an observation with your own eyes, you just need to note the
            time when the satellite passes in front of an arrangement of
            recognizable stars. There are plenty of existing tools and methods
            to help with this, but it still takes practice. We believe this
            whole process can be much easier.
          </p>
        </div>
        <div className="prize-problem-section__problem-wrapper">
          <img
            src="https://www.etftrends.com/wp-content/uploads/2019/05/The-Bitcoin-Tear-Continues-As-Market-Breaches-8000.jpg"
            alt="planet"
            className="prize-problem-section__problem-image"
          />
          <p>
            To build a global “sensor network,” we need to devise apps and
            affordable observation rigs that citizen scientists can install at
            home to efficiently and accurately make a high volume of satellite
            observations. This would give people everywhere the opportunity to
            join in protecting the long-term sustainability of spaceflight.
          </p>
        </div>
      </section>

      <section className="prize__section">
        <h2>Solutions</h2>
        <p>
          We are broadly interested in solutions that harness globally available
          consumer technology (smartphones, digital cameras, etc.) to image a
          satellite.{" "}
        </p>
        <p>
          We are looking for solutions both for the casual observer (e.g.,
          software for controlling a digital camera from a laptop with features
          customized for satellite tracking), and the dedicated hobbyist (e.g.,
          a purpose-built camera and computer setup for under $500).
        </p>
        <p>
          We’ve begun indexing existing tools and future ideas in the TruSat
          Knowledge Repo
        </p>
      </section>

      <section className="prize__section">
        <h2>The prize</h2>
        <div>
          <div>
            <h3>Step 1</h3>
            <p>
              Submit a proposal for software, hardware, or both that will make
              citizen satellite tracking more accessible. Detailed instructions,
              proposal template, and sample proposal.
            </p>
          </div>
          <div>
            <h3>Step 2</h3>
            <p>
              Judges select proposals to fund with grants to build working
              prototypes. Grant amount and process
            </p>
          </div>
          <div>
            <h3>Step 3</h3>
            <p>
              Upon demonstration of working prototypes, participants will
              receive the balance of the grant and be crowned winners of the
              ConsenSys Space Sustainability Prize.
            </p>
          </div>
          <div>
            <h3>Step 4</h3>
            <p>
              People around the world will use the prize-winning inventions to
              create an independent, transparent record of satellites in orbit.
            </p>
          </div>
        </div>
      </section>

      <section className="prize__section">
        <div>
          <h2>Judging</h2>
          <p>Solutions will be scored on: </p>
          <p>
            Accessibility: Low cost, ease of assembly, ease of use
            Effectiveness: Number of accurate observations per night Full
            criteria{" "}
          </p>
          <p>
            Judges: Moriba Jah, Cees Basa, Bianca Vasquez, Peter Martinez, Brad
            Young, Chris Lewicki
          </p>
        </div>
        <div>
          <h2>Timeline</h2>
          <p>1. Proposal phase</p>
          <p>
            10 Feb. – 1 Mar. 2020 Work on proposals 2 Mar. 2020 Proposals due 3
            Mar. – 7 Mar. 2020 Judges review proposals 8 Mar. 2020 Authors of
            selected proposals receive grant agreements
          </p>
          <p>
            2. Build phase 9 Mar. – 25 Apr. 2020 Build working prototype; submit
            documentation 27 Apr. 2020 Second tranche of grant payments; Prize
            winners named.
          </p>
        </div>
      </section>

      <section className="prize__section">
        <h2>Resources to get you started</h2>
        <div>
          <div>
            <h3>How to track satellites</h3>
            <p>
              Learn more about the process of satellite tracking, the basics of
              orbital mechanics, and tips for reading the stars.
            </p>
          </div>
          <div>
            <h3>Live video meetings</h3>
            <p>
              Tune in and we’ll introduce the basics of satellite tracking,
              share our ideas, and answer your questions.
            </p>
          </div>
          <div>
            <h3>TruSat community forum</h3>
            <p>
              discuss satellite tracking, brainstorm solutions, and find
              collaborators. If you get stuck, we’re here to help!
            </p>
          </div>
        </div>
      </section>

      <section className="prize__section">
        <h2>Other ways to join</h2>
        <p>
          If you’re not able to submit an entry, but want to join the project,
          here are other ways to contribute:{" "}
        </p>
        <div>
          <div>
            <h3>Collect an observation bounty </h3>
            <p>
              Track a satellite, document your process, and we’ll pay you $100.
            </p>
            <p>View bounties</p>
          </div>
          <div>
            <h3>Collect a developer bounty</h3>
            <p>For developers, hackers, and the computer vision-curious</p>
            <p>View bounties</p>
          </div>
        </div>
      </section>

      <section className="prize__section">
        <h2>Full guidelines</h2>
        <div>
          <ul>
            <li>Competition background</li>
            <li>Submissioin guidelines</li>
            <li>Judging criteria </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Frequently asked questions</li>
            <li>Terms</li>
          </ul>
        </div>
      </section>

      <section className="prize__section">
        <h2>24 days left to register</h2>
        <Button text={"JOIN THE CHALLENGE"} color={"white"} />
        <h3>SUBMIT YOUR ENTRY</h3>
      </section>

      <section className="prize__section">
        <p className="join__copy">
          Join the mailing list to stay posted on the project
        </p>
        <MailingListForm
          testPilots={false}
          eventLabel={"Prize page subscribe button"}
        />
      </section>
    </div>
  );
}
