import React from "react";
import { NavLink } from "react-router-dom";
import TrusatLogoBig from "../assets/TrusatLogoBig.svg";
import Partners from "../app/components/Partners";
import Advisors from "../app/components/Advisors";
import RoundedButton from "../app/components/RoundedButton";
import ReactGA from "react-ga";

export default function Home() {
  return (
    <div className="welcome__wrapper">
      <section className="welcome__section-one">
        <div></div>
        <div>canvas here</div>
      </section>

      <section className="welcome__section-two">
        <div>
          <div className="welcome__iframe-wrapper">
            <iframe
              className="welcome__iframe"
              title="TruSat explainer video"
              src="https://www.youtube.com/embed/H-J7zngl6xE"
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
        </div>
        <span class="welcome__hide-on-mobile"></span>
        <div>
          <h2>Space debris is a problem</h2>
          <div className="welcome-section-two__copy-container--top">
            <p>
              In the next decade, the number of satellites in orbit will
              multiply by 2500%.
            </p>
            <span className="welcome__hide-on-mobile"></span>
            <div>
              <span className="welcome__hide-on-desktop" />
              <p>
                This raises the risk of collisions and debris that threaten our
                spacefaring future.
              </p>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <img src="https://via.placeholder.com/100" alt="placeholder"></img>
            <h2>You are the solution</h2>
          </div>
          <p>
            TruSat is a citizen-powered public service, crowdsourcing
            observations of satellites to form an independent record of
            satellite behavior.
          </p>
          <div className="welcome-section-two__copy-container--bottom">
            <span></span>
            <p>
              This transparency promotes sustainable practices by satellite
              operators. Explore the catalog{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// (
// <div className="welcome__wrapper">
//       <div className="welcome__content-wrapper">
//         {/* SECTION/GRADIENT ONE */}
//         <section className="welcome__section--one">
//           <div className="welcome__title-logo-wrapper">
//             <img
//               className="welcome__image welcome__logo-image"
//               src={TrusatLogoBig}
//               alt="Trusat logo"
//             ></img>

//             <h2 className="welcome__trusat-tagline">
//               OPEN SOURCE SPACE SUSTAINABILITY
//             </h2>

//             <img
//               className="welcome__image welcome__globe-image"
//               src="https://trusat-assets.s3.amazonaws.com/illustration-cover-840px.jpg"
//               alt="globe"
//             ></img>
//           </div>

//           <div className="welcome__title-intro-wrapper">
//             <p className="welcome__large-copy--bold">
//               Space debris is a problem.{" "}
//               <br className="app__hide-on-mobile"></br>You are the solution.
//             </p>
//             <p className="welcome__medium-copy--white">
//               The number of satellites is increasing by 25x. Collisions threaten
//               the technology we depend on every day, and our spacefaring future.
//             </p>
//             <p className="welcome__large-copy--bold">
//               Welcome to the sport <br className="app__hide-on-mobile"></br>of
//               satellite tracking:
//             </p>
//             <div className="welcome__iframe-wrapper">
//               <iframe
//                 className="welcome__iframe"
//                 title="TruSat explainer video"
//                 src="https://www.youtube.com/embed/H-J7zngl6xE"
//                 frameBorder="0"
//                 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen="allowfullscreen"
//                 mozallowullscreen="mozallowfullscreen"
//                 msallowfullscreen="msallowfullscreen"
//                 oallowfullscreen="oallowfullscreen"
//                 webkitallowfullscreen="webkitallowfullscreen"
//                 modestbranding="1"
//               ></iframe>
//             </div>
//             <p className="welcome__medium-copy--white welcome__medium-copy--smaller-bottom">
//               Use TruSat to find satellites in the sky with your naked eye,
//               record their positions, and help create a planetary record that
//               encourages sustainable practices in orbit.
//             </p>
//             <NavLink
//               className="app__nav-link"
//               to="/join"
//               onClick={() => {
//                 ReactGA.event({
//                   category: "Onboarding",
//                   action: "Clicked join button",
//                   label: "Top of Welcome page join button"
//                 });
//               }}
//             >
//               <div className="welcome__join-button-wrapper--welcome-top">
//                 <RoundedButton
//                   addStyles="welcome__join-button"
//                   color="orange"
//                   text="JOIN"
//                 />
//               </div>
//             </NavLink>
//           </div>
//         </section>

//         {/* SECTION/GRADIENT TWO */}
//         <section className="welcome__section--two">
//           <div className="welcome__illustration-join-wrapper">
//             <div className="welcome__illustration-wrapper--left">
//               <img
//                 className="welcome__illustration"
//                 src="https://trusat-assets.s3.amazonaws.com/illustration-observation2-square-540px.jpg"
//                 alt="Illustration"
//               ></img>
//             </div>

//             <div className="welcome__join-copy-wrapper">
//               <h2 className="welcome__sub-header--white welcome__sub-header--nowrap">
//                 Satellite tracking?{" "}
//                 <span className="welcome__emoticon">¯\_(ツ)_/¯</span>
//               </h2>
//               <p className="welcome__small-copy--white welcome__small-copy--bold">
//                 It’s fun, relaxing, and all you need is a clear sky
//               </p>
//               <ul className="welcome__ul">
//                 <li className="welcome__li">
//                   TruSat will show you to when and where to look to see
//                   satellites that are the highest priority to monitor.{" "}
//                 </li>
//                 <li className="welcome__li">
//                   Record an observation to update the world's understanding of
//                   that satellite's orbit.
//                 </li>
//                 <li className="welcome__li">
//                   Your tracked sats will be added to your collection, and your
//                   contribution to citizen science will be credited in the TruSat
//                   Catalog.
//                 </li>
//                 <li className="welcome__li">
//                   Never seen a sat? We’ll show you how.
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="welcome__illustration-join-wrapper welcome__illustration-join-wrapper--center">
//             <div className="welcome__join-copy-wrapper">
//               <h2 className="welcome__sub-header--white">Why track sats?</h2>
//               <p className="welcome__small-copy--white welcome__small-copy--bold">
//                 Earth needs a transparent record of satellite behavior.
//               </p>
//               <p className="welcome__small-copy--white">
//                 Space is wild. Creating strong incentives for responsible
//                 practices in orbit requires a trusted record of orbital
//                 positions. To fill this gap, TruSat tasks a global network of
//                 citizens to track satellites of interest.
//               </p>
//               <p className="welcome__small-copy--white">
//                 TruSat merges many individual observations into one planetary
//                 record of orbital positions. This allows the world to measure
//                 satellite behavior against international standards of
//                 sustainability.{" "}
//                 <a
//                   className="app__nav-link app__link"
//                   href="https://learn.trusat.org/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   onClick={() => {
//                     ReactGA.event({
//                       category: "Internal Link",
//                       action: `Clicked Learn`,
//                       label: `Clicked Learn More on Welcome Page`
//                     });
//                   }}
//                 >
//                   Learn more
//                 </a>
//               </p>
//             </div>
//             <div className="welcome__illustration-wrapper--right">
//               <img
//                 className="welcome__illustration"
//                 src="https://trusat-assets.s3.amazonaws.com/illustration-posat2-square-540px.jpg"
//                 alt="Illustration"
//               ></img>
//             </div>
//           </div>

//           <div className="welcome__illustration-join-wrapper">
//             <div className="welcome__illustration-wrapper--left">
//               <img
//                 className="welcome__illustration"
//                 src="https://trusat-assets.s3.amazonaws.com/illustration-open_source2-square-540px.jpg"
//                 alt="Illustration"
//               ></img>
//             </div>

//             <div className="welcome__join-copy-wrapper">
//               <h2 className="welcome__sub-header--white">How can I help?</h2>
//               <p className="welcome__small-copy--white welcome__small-copy--bold">
//                 Glad you asked! Preserving our future in space requires all
//                 hands on deck.
//               </p>
//               <p className="welcome__small-copy--white">
//                 TruSat is an early prototype. To fulfill the vision, TruSat
//                 needs your talents, your ideas, your time.
//               </p>
//               <p className="welcome__small-copy--white">
//                 Whether you want to track satellites, contribute to the
//                 software, or share TruSat with your community, we hope you’ll be
//                 part of the solution.
//               </p>
//               <NavLink
//                 className="app__nav-link"
//                 to="/join"
//                 onClick={() => {
//                   ReactGA.event({
//                     category: "Onboarding",
//                     action: "Clicked join button",
//                     label: "Bottom of Welcome page join button"
//                   });
//                 }}
//               >
//                 <RoundedButton
//                   addStyles="welcome__join-button"
//                   color="orange"
//                   text="JOIN THE COMMUNITY"
//                 />
//               </NavLink>
//             </div>
//           </div>
//         </section>

//         {/* SECTION/GRADIENT THREE */}
//         <section className="welcome__section--three">
//           <Partners />
//           <Advisors />
//         </section>
//       </div>
//       <div className="welcome__bottom-wrapper">
//         <div className="welcome__content-wrapper">
//           {/* SECTION/GRADIENT FOUR */}
//           <section className="welcome__section--four">
//             <h2 className="welcome__sub-header--white">Stay in the loop</h2>
//             <p className="welcome__small-copy--white">
//               Join the{" "}
//               <a
//                 className="app__link"
//                 href="https://discuss.trusat.org"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 TruSat Forum
//               </a>{" "}
//               to stay posted on the project
//             </p>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
