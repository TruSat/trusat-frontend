import React from "react";

export default function SocialIcons() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/consensys_space/"
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
        href="https://github.com/consensys-space"
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
