import React from "react";

export default function JoinButton({ path }) {
  return (
    <span
      className={
        path === "/" ? "nav-bar__join-button--welcome" : "nav-bar__join-button"
      }
    >
      JOIN
    </span>
  );
}
