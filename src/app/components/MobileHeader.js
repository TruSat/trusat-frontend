import React from "react";
import { withRouter } from "react-router-dom";
import TrusatLogoSmallWhite from "../../assets/TrusatLogoSmallWhite.svg";
import { NavLink } from "react-router-dom";

function MobileHeader(props) {
  const path = props.location.pathname;

  return (
    <div className={path === "/" ? "app__hide" : "mobile-header"}>
      <NavLink className="app__nav-link" to="/">
        <img src={TrusatLogoSmallWhite} alt="trusat logo"></img>
      </NavLink>
    </div>
  );
}

export default withRouter(MobileHeader);
