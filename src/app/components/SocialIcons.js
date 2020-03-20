import React from "react";
import ReactGA from "react-ga";

export default function SocialIcons() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/consensys_space/"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: `Clicked a social link`,
            label: `Clicked Twiter link`
          });
        }}
      >
        <img
          className="social-icon social-icon--first"
          src="https://trusat-assets.s3.amazonaws.com/TwitterIcon.png"
          alt="twitter"
        ></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://facebook.com/consensys.space"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: `Clicked a social link`,
            label: `Clicked Facebook link`
          });
        }}
      >
        <img
          className="social-icon"
          src="https://trusat-assets.s3.amazonaws.com/FacebookIcon.png"
          alt="facebook"
        ></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://instagram.com/consensys_space/"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: `Clicked a social link`,
            label: `Clicked Instagram link`
          });
        }}
      >
        <img
          className="social-icon"
          src="https://trusat-assets.s3.amazonaws.com/InstagramIcon.png"
          alt="instagram"
        ></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/trusat"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: `Clicked a social link`,
            label: `Clicked Github link`
          });
        }}
      >
        <img
          className="social-icon social-icon__last"
          src="https://trusat-assets.s3.amazonaws.com/GithubIcon.png"
          alt="github"
        ></img>
      </a>
    </div>
  );
}
