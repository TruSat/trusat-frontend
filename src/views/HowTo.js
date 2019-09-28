import React from "react";

export default function HowTo() {
  const aboutTrusatCopy = {
    what:
      "TruSat is a blockchain-enabled space sustainability tool designed to promote and maintain a transparent catalog of objects in space. We collaborate with individuals and institutions that are passionate about space sustainability to curate our list of priorities for the catalog. Our network of contributors is then tasked to go outside, observe the sky, and submit their observations to TruSat. TruSat is the first product to be launched by ConsenSys Space [link to ConsenSys.Space]. Our team at ConsenSys Space is on a mission to democratize, diversify, and decentralize the space industry through experimental projects designed to solve wicked problems.",
    whitePaper: "A technical deep dive into how TruSat works. Read it here.",
    partners: "",
    charter: "An outline of TruSat’s intiial governance. Read it here."
  };

  const qaAboutCopy = [
    {
      question: "Who uses the data derived from this catalog?",
      answer:
        "The data in this catalog is publicly available to anyone who chooses to use it. Spacecraft operators, NGOs, and Research Institutions often use this type of data to support their operations and research of objects in space."
    },
    {
      question:
        "Why is this an open-source project? Aren’t there government entities tracking objects in space?",
      answer:
        "Two of the most robust satellite databases are held by the Department of Defense (USA) and Roscosmos (Russia). Neither database is representative of all objects in space. In order to achieve true transparency regarding the locations of objects in space, we at TruSat believe this is best achieved in an open-source environment that cannot be compromised by national interests."
    },
    {
      question:
        "If I am unable to contribute observations, how else can I contribute to TruSat?",
      answer: `TruSat is an open-source project, and we are constantly collaborating with people who have a myriad of skillsets. If you are a developer, for instance, you can write code in exchange for small payments on the “Bounties.Network Platform.” If you consider yourself a wordsmith, you can contribute documentation on the “Bounties.Network Platform” as well. To learn more about these opportunities, please visit the “TruSat Discord Channel.”${"\n\n"}If you wish to further explore other ways to contribute, please contact the TruSat Community Manager, Kim Macharia at Kim.Macharia@consensys.net.`
    }
  ];

  const qaProfileCopy = [
    {
      question: "Do I need a MetaMask Account to submit an observation?",
      answer: `A MetaMask account is only necessary if you would like to add an additional level of security to your data. If you choose to connect your TruSat account to Metamask, you will unlock additional features on your profile. To create a Metamask account, please visit “metamask.com”.
      ${"\b\b\b\b"}To learn more about the security benefits of blockchain, watch this “short explainer video”`
    },
    {
      question: "Can I make submit my observations anonymously?",
      answer:
        "Yes. Head to the account settings page. In the “Privacy” section you will find an option to hide your username and show your ETH address instead."
    },
    {
      question: "Can I remove my data from the TruSat system?",
      answer:
        "Yes. Head to the account settings page. In the “Privacy” section you will find an option to remove your current and historical data from the system."
    }
  ];

  return (
    <div className="how-to__wrapper">
      <section className="how-to__section">
        <h1 className="how-to__main-header">About Trusat</h1>
        <h2 className="how-to__sub-header">WHAT IS TRUSAT?</h2>
        <p className="how-to__copy">
          TruSat is a blockchain-enabled space sustainability tool designed to
          promote and maintain a transparent catalog of objects in space. We
          collaborate with individuals and institutions that are passionate
          about space sustainability to curate our list of priorities for the
          catalog. Our network of contributors is then tasked to go outside,
          observe the sky, and submit their observations to TruSat.
        </p>
        <p className="how-to__copy">
          TruSat is the first product to be launched by
          {` `}
          <a
            className="how-to__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://consensys.space"
          >
            ConsenSys Space.
          </a>
          {` `}Our team at ConsenSys Space is on a mission to democratize,
          diversify, and decentralize the space industry through experimental
          projects designed to solve wicked problems.
        </p>
        <h2 className="how-to__sub-header">PARTNERS</h2>
        <p className="how-to__copy">*Images go here*</p>
        <h2 className="how-to__sub-header">WHITEPAPER</h2>
        <p className="how-to__copy">
          A technical deep dive into how TruSat works. Read it here.
        </p>
        <h2 className="how-to__sub-header">TRUSAT CHARTER</h2>
        <p className="how-to__copy">
          An outline of TruSat’s intiial governance. Read it here.
        </p>
      </section>

      <section className="how-to__section">
        <h1 className="how-to__main-header">Questions and Answers</h1>
        <h2 className="how-to__sub-header">ABOUT TRUSAT</h2>

        <h3 className="how-to__question">
          Who uses the data derived from this catalog?
        </h3>
        <p className="how-to__copy">
          The data in this catalog is publicly available to anyone who chooses
          to use it. Spacecraft operators, NGOs, and Research Institutions often
          use this type of data to support their operations and research of
          objects in space.
        </p>

        <h3 className="how-to__question">
          Why is this an open-source project? Aren’t there government entities
          tracking objects in space?
        </h3>
        <p className="how-to__copy">
          Two of the most robust satellite databases are held by the Department
          of Defense (USA) and Roscosmos (Russia). Neither database is
          representative of all objects in space. In order to achieve true
          transparency regarding the locations of objects in space, we at TruSat
          believe this is best achieved in an open-source environment that
          cannot be compromised by national interests.
        </p>

        <h3 className="how-to__question">
          If I am unable to contribute observations, how else can I contribute
          to TruSat?
        </h3>
        <p className="how-to__copy">
          TruSat is an open-source project, and we are constantly collaborating
          with people who have a myriad of skillsets. If you are a developer,
          for instance, you can write code in exchange for small payments on the
          “Bounties.Network Platform.” If you consider yourself a wordsmith, you
          can contribute documentation on the “Bounties.Network Platform” as
          well. To learn more about these opportunities, please visit the{` `}
          <a
            className="how-to__link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://trusat.discord.com"
          >
            TruSat Discord Channel.
          </a>
        </p>
        <p className="how-to__copy">
          If you wish to further explore other ways to contribute, please
          contact the TruSat Community Manager, Kim Macharia at
          Kim.Macharia@consensys.net.
        </p>
      </section>

      <section className="how-to__section">
        <h2 className="how-to__sub-header">MANAGING MY PROFILE</h2>

        <h3 className="how-to__question">
          Do I need a MetaMask Account to submit an observation?
        </h3>
        <p className="how-to__copy">
          A MetaMask account is only necessary if you would like to add an
          additional level of security to your data. If you choose to connect
          your TruSat account to Metamask, you will unlock additional features
          on your profile. To create a Metamask account, please visit
          “metamask.com”. To learn more about the security benefits of
          blockchain, watch this “short explainer video”
        </p>

        <h3 className="how-to__question">
          Can I make submit my observations anonymously?
        </h3>
        <p className="how-to__copy">
          Yes. Head to the account settings page. In the “Privacy” section you
          will find an option to hide your username and show your ETH address
          instead.
        </p>

        <h3 className="how-to__question">
          Can I remove my data from the TruSat system?
        </h3>
        <p className="how-to__copy">
          Yes. Head to the account settings page. In the “Privacy” section you
          will find an option to remove your current and historical data from
          the system.
        </p>
      </section>
    </div>
  );
}
