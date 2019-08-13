import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SignUpModal from "../../auth/components/SignUpModal";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const [selected, setSelected] = useState(props.location.pathname);

  return (
    <div className="nav-bar">
      <NavLink
        onClick={() => setSelected("/")}
        className={
          selected === "/"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/"
      >
        Orbit Predictions
      </NavLink>
      <NavLink
        onClick={() => setSelected("/community")}
        className={
          selected === "/community"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/community"
      >
        Community
      </NavLink>
      <NavLink
        onClick={() => setSelected("/observations")}
        className={
          selected === "/observations"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/observations"
      >
        My Observations
      </NavLink>
      <SignUpModal />
      <NavLink
        onClick={() => setSelected("/submit")}
        className={
          selected === "/submit"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/submit"
      >
        <span style={{ background: "white", color: "black", padding: "0.5em" }}>
          +Submit Observation
        </span>
      </NavLink>
      <NavLink
        onClick={() => setSelected("/account")}
        className={
          selected === "/account"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/account"
      >
        AVATAR
      </NavLink>
    </div>
  );
}

export default withRouter(NavBar);
