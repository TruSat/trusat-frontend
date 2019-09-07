import React from "react";
import { useUserState } from "../../user/user-context";
import { withRouter } from "react-router-dom";
import JoinButton from "./JoinButton";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const { userAddress } = useUserState();

  return (
    <div className="nav-bar">
      <NavLink className="nav-bar__logo" to="/">
        TRUSAT
      </NavLink>

      <div
        className={
          props.location.pathname === "/"
            ? "nav-bar__link-wrapper--highlight"
            : "nav-bar__link-wrapper--lowlight"
        }
      >
        <NavLink
          className={
            props.location.pathname === "/"
              ? "nav-bar__link--highlight"
              : "nav-bar__link--lowlight"
          }
          to="/"
        >
          WELCOME
        </NavLink>
      </div>

      <div
        className={
          props.location.pathname.includes("catalog")
            ? "nav-bar__link-wrapper--highlight"
            : "nav-bar__link-wrapper--lowlight"
        }
      >
        <NavLink
          className={
            props.location.pathname.includes("catalog")
              ? "nav-bar__link--highlight"
              : "nav-bar__link--lowlight"
          }
          to="/catalog/priorities"
        >
          CATALOG
        </NavLink>
      </div>

      {/* // My Profile button only rendered when user is logged in */}
      {userAddress ? (
        <div
          className={
            props.location.pathname === `/profile/${userAddress}`
              ? "nav-bar__link-wrapper--highlight"
              : "nav-bar__link-wrapper--lowlight"
          }
        >
          <NavLink
            className={
              props.location.pathname === `/profile/${userAddress}`
                ? "nav-bar__link--highlight"
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
          props.location.pathname === "/about"
            ? "nav-bar__link-wrapper--highlight"
            : "nav-bar__link-wrapper--lowlight"
        }
      >
        <NavLink
          className={
            props.location.pathname === "/about"
              ? "nav-bar__link--highlight"
              : "nav-bar__link--lowlight"
          }
          to="/about"
        >
          ABOUT
        </NavLink>
      </div>

      <div
        className={
          props.location.pathname === "/how"
            ? "nav-bar__link-wrapper--highlight"
            : "nav-bar__link-wrapper--lowlight"
        }
      >
        <NavLink
          className={
            props.location.pathname === "/how"
              ? "nav-bar__link--highlight"
              : "nav-bar__link--lowlight"
          }
          to="/how"
        >
          HOW TO
        </NavLink>
      </div>

      {/* Show Join button when user is not logged in */}
      {!userAddress ? (
        <NavLink className="app__nav-link" to="/login">
          <JoinButton />
        </NavLink>
      ) : null}
    </div>
  );
}

export default withRouter(NavBar);
