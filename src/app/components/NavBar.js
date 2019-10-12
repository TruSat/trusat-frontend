import React from "react";
import { useAuthState } from "../../auth/auth-context";
import { withRouter } from "react-router-dom";
import JoinButton from "./JoinButton";
import { NavLink } from "react-router-dom";
import TrusatLogoSmallWhite from "../../assets/TrusatLogoSmallWhite.svg";

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
                ? "nav-bar__link--highlight--welcome"
                : "nav-bar__link--lowlight"
            }
            to="/"
          >
            WELCOME
          </NavLink>
        </div>

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
                ? "nav-bar__link--highlight"
                : path === "/"
                ? "nav-bar__link--lowlight--welcome"
                : "nav-bar__link--lowlight"
            }
            to={`/catalog/${catalogFilter}`}
          >
            CATALOG
          </NavLink>
        </div>

        {/* // My Profile button only rendered when user is logged in */}
        {userAddress ? (
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
                  ? "nav-bar__link--highlight"
                  : path === "/"
                  ? "nav-bar__link--lowlight--welcome"
                  : "nav-bar__link--lowlight"
              }
              to={`/profile/${userAddress}`}
            >
              MY PROFILE
            </NavLink>
          </div>
        ) : null}

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
              path === "/about"
                ? "nav-bar__link--highlight"
                : path === "/"
                ? "nav-bar__link--lowlight--welcome"
                : "nav-bar__link--lowlight"
            }
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>

        <div
          className={
            path === "/how"
              ? "nav-bar__link-wrapper--highlight"
              : path === "/"
              ? "nav-bar__link-wrapper--lowlight--welcome"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <NavLink
            className={
              path === "/how"
                ? "nav-bar__link--highlight"
                : path === "/"
                ? "nav-bar__link--lowlight--welcome"
                : "nav-bar__link--lowlight"
            }
            to="/how"
          >
            <p>HOW TO</p>
          </NavLink>
        </div>
      </div>

      {/* Show Join button when user is not logged in */}
      {!userAddress ? (
        <NavLink className="app__nav-link" to="/login">
          <JoinButton path={path} />
        </NavLink>
      ) : (
        // Show "submit data" button if user is logged in
        <NavLink className="app__nav-link" to="/submit">
          <span className="nav-bar__join-button nav-bar__button--lowlight">
            Submit data
          </span>
        </NavLink>
      )}
    </div>
  );
}

export default withRouter(NavBar);
