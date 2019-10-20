import React from "react";
import { withRouter } from "react-router-dom";
import TrusatLogoSmallWhite from "../../assets/TrusatLogoSmallWhite.svg";
import { NavLink } from "react-router-dom";

function MobileHeader(props) {
  const path = props.location.pathname;

  return (
    <div className={path === "/" ? "app__hide" : "mobile-header"}>
      <div className="mobile-header__app-title">
        <NavLink className="app__nav-link" to="/">
          <img src={TrusatLogoSmallWhite} alt="trusat logo"></img>
        </NavLink>
      </div>
    </div>
  );
}

export default withRouter(MobileHeader);
