import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SignUpModal from "../../auth/components/SignUpModal";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const [selected, setSelected] = useState(props.location.pathname);

  const selectedStyle = {
    color: "white",
    borderBottom: "1px solid yellow",
    textDecoration: "none"
  };

  return (
    <div className="nav-bar">
      <NavLink
        onClick={() => setSelected("/")}
        style={
          selected === "/"
            ? selectedStyle
            : { color: "grey", textDecoration: "none" }
        }
        to="/"
      >
        Orbit Predictions
      </NavLink>
      <NavLink
        onClick={() => setSelected("/community")}
        style={
          selected === "/community"
            ? selectedStyle
            : { color: "grey", textDecoration: "none" }
        }
        to="/community"
      >
        Community
      </NavLink>
      <NavLink
        onClick={() => setSelected("/observations")}
        style={
          selected === "/observations"
            ? selectedStyle
            : { color: "grey", textDecoration: "none" }
        }
        to="/observations"
      >
        My Observations
      </NavLink>
      <SignUpModal />
      <NavLink
        onClick={() => setSelected("/submit")}
        style={
          selected === "/submit"
            ? selectedStyle
            : { color: "grey", textDecoration: "none" }
        }
        to="/submit"
      >
        <span style={{ background: "white", color: "black", padding: "0.5em" }}>
          +Submit Observation
        </span>
      </NavLink>
      <NavLink
        onClick={() => setSelected("/account")}
        style={
          selected === "/account"
            ? selectedStyle
            : { color: "grey", textDecoration: "none" }
        }
        to="/account"
      >
        AVATAR
      </NavLink>
    </div>
  );
}

export default withRouter(NavBar);
