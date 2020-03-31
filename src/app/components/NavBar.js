import React, { Fragment } from "react";
import { useAuthState } from "../../auth/auth-context";
import { withRouter } from "react-router-dom";
import JoinButton from "./JoinButton";
import { NavLink } from "react-router-dom";
import TrusatLogoSmallWhite from "../../assets/TrusatLogoSmallWhite.svg";
import IconUser from "../../assets/icon-user.svg";
import ReactGA from "react-ga";

function NavBar(props) {
  const path = props.location.pathname;
  const catalogFilter = "priorities";
  const { userAddress } = useAuthState();

  return (
    <div className={path === "/" ? "nav-bar--welcome" : "nav-bar"}>
      <NavLink className="app__nav-link" to="/">
        <div className="nav-bar__sat-title-wrapper">
          <img src={TrusatLogoSmallWhite} alt="trusat title"></img>
        </div>
      </NavLink>

      <div className="nav-bar__route-link-wrapper">
        {/* // Welcome button only rendered when user is logged out */}
        {userAddress !== "none" ? null : (
          <div
            className={
              path === "/"
                ? "nav-bar__link-wrapper--highlight--welcome"
                : "nav-bar__link-wrapper--lowlight"
            }
          >
            <NavLink
              className={
                path === "/"
                  ? "app__nav-link nav-bar__link--highlight--welcome"
                  : "app__nav-link nav-bar__link--lowlight"
              }
              to="/"
            >
              WELCOME
            </NavLink>
          </div>
        )}

        <div
          className={
            path.includes("catalog") || path.includes("submit")
              ? "nav-bar__link-wrapper--highlight"
              : path === "/"
              ? "nav-bar__link-wrapper--lowlight--welcome"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <NavLink
            className={
              path.includes("catalog") || path.includes("submit")
                ? "app__nav-link nav-bar__link--highlight"
                : path === "/"
                ? "app__nav-link nav-bar__link--lowlight--welcome"
                : "app__nav-link nav-bar__link--lowlight"
            }
            to={`/catalog/${catalogFilter}`}
          >
            CATALOG
          </NavLink>
        </div>

        {/* // My Profile button only rendered when user is logged in */}
        {userAddress !== "none" ? (
          <div
            className={
              path === `/profile/${userAddress}`
                ? "nav-bar__link-wrapper--highlight"
                : path === "/"
                ? "nav-bar__link-wrapper--lowlight--welcome"
                : "nav-bar__link-wrapper--lowlight"
            }
          >
            <NavLink
              className={
                path === `/profile/${userAddress}`
                  ? "app__nav-link nav-bar__link--highlight"
                  : path === "/"
                  ? "app__nav-link nav-bar__link--lowlight--welcome"
                  : "app__nav-link nav-bar__link--lowlight"
              }
              to={`/profile/${userAddress}`}
            >
              <img className="app__nav__icon" src={IconUser} alt="icon"></img>
              MY PROFILE
            </NavLink>
          </div>
        ) : null}

        <div
          className={
            path === "/how"
              ? "nav-bar__link-wrapper--highlight"
              : path === "/"
              ? "nav-bar__link-wrapper--lowlight--welcome"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <a
            className="app__nav-link nav-bar__link--lowlight--welcome"
            href="https://learn.trusat.org/docs/start-here"
            target="_blank"
            rel="noopener noreferrer"
          >
            LEARNING HUB
          </a>
        </div>

        <div
          className={
            path === "/forum"
              ? "nav-bar__link-wrapper--highlight"
              : path === "/"
              ? "nav-bar__link-wrapper--lowlight--welcome"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <a
            className="app__nav-link nav-bar__link--lowlight--welcome"
            href="https://discuss.trusat.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            FORUM
          </a>
        </div>

        <div
          className={
            path === "/about"
              ? "nav-bar__link-wrapper--highlight"
              : path === "/"
              ? "nav-bar__link-wrapper--lowlight--welcome"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <NavLink
            className={
              path === `/about`
                ? "app__nav-link nav-bar__link--highlight"
                : path === "/"
                ? "app__nav-link nav-bar__link--lowlight--welcome"
                : "app__nav-link nav-bar__link--lowlight"
            }
            to={`/about`}
          >
            ABOUT
          </NavLink>
        </div>
      </div>

      <div>
        {/* Show Join button when user is not logged in */}
        {userAddress === "none" ? (
          <Fragment>
            <NavLink className="app__nav-link nav-bar__log-in-text" to="/login">
              <img className="app__nav__icon" src={IconUser} alt="icon"></img>
              LOG IN
            </NavLink>
            <NavLink
              className="app__nav-link"
              to="/join"
              onClick={() => {
                ReactGA.event({
                  category: "Onboarding",
                  action: "Clicked join button",
                  label: "Nav Bar join button"
                });
              }}
            >
              <JoinButton path={path} />
            </NavLink>
          </Fragment>
        ) : (
          <div style={{ width: "96px" }}></div>
        )}
      </div>
    </div>
  );
}

export default withRouter(NavBar);
