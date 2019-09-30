import React from "react";
import { withRouter } from "react-router-dom";

function MobileHeader(props) {
  const path = props.location.pathname;

  return (
    <div
      className={
        path === "/" ? "app__hide" : "mobile-header app__show-on-mobile"
      }
    >
      <h1 className="mobile-header__app-title">TRUSAT</h1>
    </div>
  );
}

export default withRouter(MobileHeader);
