import React from "react";
import TwitterIcon from "../../assets/TwitterIcon.png";
import InstagramIcon from "../../assets/InstagramIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import GithubIcon from "../../assets/GithubIcon.png";

export default function SocialIcons() {
  return (
    <div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://your_url_here.html"
      >
        <img className="social-icon" src={TwitterIcon} alt="twitter"></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://your_url_here.html"
      >
        <img className="social-icon" src={InstagramIcon} alt="instagram"></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://your_url_here.html"
      >
        <img className="social-icon" src={FacebookIcon} alt="facebook"></img>
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://your_url_here.html"
      >
        <img
          className="social-icon social-icon__last"
          src={GithubIcon}
          alt="github"
        ></img>
      </a>
    </div>
  );
}
