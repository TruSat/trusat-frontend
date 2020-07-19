import React from "react";
import ReactGA from "react-ga";

export default function SocialIcons() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/trusat"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: "Clicked a social link",
            label: "Clicked Github link"
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
