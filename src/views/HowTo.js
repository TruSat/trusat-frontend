import React from "react";
import ReactGA from "react-ga";

export default function Submit() {
  ReactGA.pageview(window.location.pathname + window.location.search);

  return <div>This is the How To page</div>;
}
