import React from "react";
import { NavLink } from "react-router-dom";
import TwitterIcon from "../../assets/TwitterIcon.png";
import FacebookIcon from "../../assets/FacebookIcon.png";
import GithubIcon from "../../assets/GithubIcon.png";
import DiscordIcon from "../../assets/DiscordIcon.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__text-links-wrapper">
          <NavLink className="app__nav-link footer__text-link" to="/terms">
            Terms
          </NavLink>
          <NavLink className="app__nav-link" to="/privacy">
            Privacy
          </NavLink>
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://your_url_here.html"
          >
            <img className="footer__icon" src={TwitterIcon} alt="twitter"></img>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://your_url_here.html"
          >
            <img
              className="footer__icon"
              src={FacebookIcon}
              alt="facebook"
            ></img>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://your_url_here.html"
          >
            <img className="footer__icon" src={GithubIcon} alt="github"></img>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://your_url_here.html"
          >
            <img
              className="footer__icon footer__icon--last"
              src={DiscordIcon}
              alt="github"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
}
