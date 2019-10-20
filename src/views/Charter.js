import React from "react";

export default function Charter() {
  return (
    <div className="static-page__wrapper">
      <section className="static-page__section">
        <h1 className="static-page__main-header">TruSat Charter</h1>
        <h2 className="static-page__sub-header charter__sub-header">
          Overview and Definitions
        </h2>
        <p className="static-page__copy">
          TruSat is an open source, citizen-powered system for creating a
          trusted record of satellite orbits in service of the long-term
          sustainability of outer space activities. This TruSat System comprises
          two main elements: Satellite Observers, who make and report satellite
          observations, and TruSat Softwarethat autonomously processes
          observations of a satellite from multiple points around Earth into an
          orbit prediction and confidence assessment of that prediction. Space
          Sustainability Advocates1may task the TruSat System to observe
          satellites of interest for sustainability purposes,2andutilize the
          resulting data.
        </p>
        <p className="static-page__copy">
          The TruSat System is developed and maintained by the TruSat Open
          Source Community. In addition to developing the TruSat Software, this
          global community of Contributors provide valuable input on feature
          roadmaps, author documentation and other content that enable
          participation by a diverse range of Contributors, and translate them
          into multiple languages.
        </p>
        <p className="static-page__copy">
          The TruSat Charter specifies the governance arrangements for the
          TruSat System and Open Source Community. The Charter will be regularly
          revised to meet the governance needs of the Community and to give
          effect to the Principles enumerated in Section 1. Each version of the
          Charter is identified by an Epoch: a period measured in time or
          milestones in which that version is in effect. At the conclusion of an
          Epoch, the Charter will be revised in accordance with the procedures
          it specifies. Epoch1 will remain in effect until the release of
          version 0.2 of the TruSat Software, at which point the Charter will be
          revised for Epoch 2. As specified in Section 3, the Epoch 2 revisions
          will specify transparent processes for tasking the TruSat
          System—functionality to be introduced in the v0.2 release—and a more
          detailed governance framework for open source software development.
        </p>
        <p className="static-page__copy">
          Governance of the TruSat Community will be progressively
          decentralized, as specified in Section 1. Epochs 1 and 2 are
          experimental “incubation” periods for both the Software and the
          Community. The v0.1 release of the Software was developed by ConsenSys
          Space, which is also developing v0.2. Beginning in Epoch 2, Open
          Source Community contributions will be integral to building out the
          Software Roadmap. Whereas Community governance will initially be based
          upon a “benevolent leader” model—in which ConsenSys Space makes
          decisions in consultation with the TruSat Partners—the governance
          model will progressively evolve toward a “meritocratic model” in step
          with the growth of Community contributions to the software.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header charter__sub-header">
          Section 1: TruSat Guiding Principles
        </h2>
        <p className="static-page__copy">
          A. Space Sustainability Mission: TruSat exists to promote the
          long-term sustainability of outer space activities. At present, this
          takes the form of creating a trusted record of satellite orbits
          suitable for assessing satellite operations against emerging best
          practices and standards for responsible orbital operations.
        </p>

        <p className="static-page__copy">
          B. Openness: TruSat is an open-sensor system in that any person or
          entity may contribute satellite observation data without permission.
          The resulting orbital position data is publicly available and freely
          accessible without restriction.
        </p>

        <p className="static-page__copy">
          C. Transparency: The TruSat System is transparent in that the
          algorithms for processing satellite observations into an orbit
          prediction are freely accessible (e.g,. source code in the TruSat
          software repos, narrative explanation in White Paper). TruSat
          Community governance will remain transparent by publishing the
          governance arrangements in effect in the TruSat Charter, accessible at
          TruSat.org.
        </p>
        <p className="static-page__copy">
          D. Open Source licensing: The TruSat Software is made available under
          open source licenses.4All Contributions must be compliant with the
          applicable open source license.
        </p>
        <p className="static-page__copy">
          E. Democratizing and Diversifying Space Endeavors: Creating new
          opportunities for global public participation in space endeavors, and
          reducing barriers to participation.
        </p>
        <p className="static-page__copy">
          F. Progressive decentralization of the TruSat System: With migration
          to Ethereum mainnet and implementation of Web3 governance
          functionality, and the development of TruSat’s community of
          contributors, governance of the TruSat System will progressively be
          decentralized. The TruSat Partners intend that their roles in System
          governance will be phased out in favor of direct governance by TruSat
          Contributors.
        </p>
        <p className="static-page__copy">
          G. Progressive Decentralization of Community Governance: Governance of
          the TruSat Open Source Community will progressively transition from a
          “benevolent leader”5model in Epochs 1 and 2, in which ConsenSys Space
          makes decisions in consultation with the TruSat Partners, to a
          “meritocratic”6model, in step with growth in Community contributions.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header charter__sub-header">
          Section 2: TruSat Partners
        </h2>
        <p className="static-page__copy">
          A. The TruSat Partners are leaders in space sustainability and/or
          creating opportunities for involvement in space endeavors. The
          following Partners are committed to implementing the Principles set
          forth in Section 1, and maintaining and advancing TruSat as a space
          sustainability tool as set forth in this Section 3:
        </p>

        {/* TODO - make a numbered list */}
        <ul className="charter-list">
          <li className="static-page__copy">1. ConsenSys Space</li>
          <li className="static-page__copy">2. Secure World Foundation</li>
          <li className="static-page__copy">
            3. Professor Moriba Jah, University of Texas at Austin
          </li>
          <li className="static-page__copy">
            4. Society of Women in Space Exploration (SWISE)
          </li>
        </ul>

        <p className="static-page__copy">
          B. The TruSat Partners commit to maintaining and advancing the TruSat
          System and building the Open Source Community as follows:1.Building
          the Open Source Community by introducing TruSat to potential
          Contributors.2.Serving as liaisons with Contributor and User
          communities, representing their interests and feedback in the feature
          development process.3.Ensuring TruSat’s alignment with the needs of
          Space Sustainability Advocates, and that TruSat’s capabilities are
          accounted for in the development of space sustainability
          standards.4.Partners may, in their discretion, sponsor initiatives to
          build the TruSat Software and Community, such as hackathons, bounties,
          and grants of observing hardware.s
        </p>
        <p className="static-page__copy">
          C. In Epoch 1, ConsenSys Space exercises decision authority with
          respect to the TruSat Software in consultation with the TruSat
          Partners.
        </p>
        <p className="static-page__copy">
          D. Individuals and institutions wishing to undertake the commitments
          of TruSat Partners and help to implement the Principles of Section 1,
          may be accepted as a TruSat Partner by consensus of the existing
          Partners.
        </p>
      </section>

      <section className="static-page__section">
        <h2 className="static-page__sub-header charter__sub-header">
          Section 3: Process andTimeline for Epoch 2 Amendments
        </h2>
        <p className="static-page__copy">
          A. The Partners intend to adopt an Epoch 2 package of amendments to
          the Charter in connection with the release of version 0.2 of the
          TruSat Software. The Epoch 2 amendments are expected to add the
          following to the Charter:
        </p>

        {/* TODO - make a numbered list */}
        <ul className="charter-list">
          <li className="static-page__copy">
            Specify a transparent process for tasking the TruSat System in Epoch
            2. The v0.2 release is expected to add Missions: functionality
            enabling space sustainability advocates to request data on specified
            satellites for sustainability purposes. The Epoch 2 Charter
            amendments will specify a process for this tasking function,
            including a definition of the “sustainability purposes” for which
            the system may be tasked.
          </li>
          <li className="static-page__copy">
            Specify a detailed open source governance framework for Epoch 2. The
            partners foresee this framework will be based upon a “benevolent
            leader” model in Epoch 2, in which ConsenSys Space will exercise
            ultimate decision authority in consultation with the TruSat
            Partners, on the way to a “meritocratic” governance model in future
            Epochs.
          </li>
          <li className="static-page__copy">
            Specify the open source license(s) under which each component of the
            TruSat Software will be licensed, and with which all contributions
            must be compliant.
          </li>
        </ul>

        <p className="static-page__copy">
          B. This Charter may be amended by a consensus of the TruSat Partners.
        </p>
      </section>
    </div>
  );
}
