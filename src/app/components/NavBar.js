import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SignUpModal from "../../auth/components/SignUpModal";
import { NavLink } from "react-router-dom";

function NavBar(props) {
  const [selected, setSelected] = useState(props.location.pathname);

  return (
    <div className="nav-bar">
      <NavLink
        className="nav-bar__logo"
        onClick={() => setSelected("/")}
        to="/"
      >
        EARTH SPACE PROGRAM
      </NavLink>

      <NavLink
        onClick={() => setSelected("/")}
        className={
          selected === "/"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/"
      >
        WELCOME
      </NavLink>
      <NavLink
        onClick={() => setSelected("/catalog")}
        className={
          selected === "/catalog"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/catalog"
      >
        CATALOG
      </NavLink>
      <NavLink
        onClick={() => setSelected("/profile")}
        className={
          selected === "/profile"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/profile"
      >
        MY PROFILE
      </NavLink>

      <NavLink
        onClick={() => setSelected("/about")}
        className={
          selected === "/about"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/about"
      >
        ABOUT
      </NavLink>
      <NavLink
        onClick={() => setSelected("/how")}
        className={
          selected === "/how"
            ? "nav-bar__link--highlight"
            : "nav-bar__link--lowlight"
        }
        to="/how"
      >
        HOW TO
      </NavLink>
      <SignUpModal />
    </div>
  );
}

export default withRouter(NavBar);
