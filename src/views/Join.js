import React from "react";
import Button from "../app/components/Button";
import { NavLink } from "react-router-dom";

export default function Join() {
  // See auth-styles.cscc in the "auth" directory for styles
  return (
    <div className="join-view__wrapper">
      <section className="join-view__content-container">
        <h1 className="join-view__main-header">
          Join the community building TruSat
        </h1>
        <h2 className="join-view__sub-header">
          TruSat is entirely open source, and depends on the efforts of people
          like you.
        </h2>
        <a
          href="https://learn.trusat.org/docs/contributing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            text="Join the build"
            color="orange"
            addStyles="join-view__button"
          />
        </a>
      </section>

      <section className="join-view__content-container">
        <h1 className="join-view__main-header">Track satellites</h1>
        <h2 className="join-view__sub-header">
          Create an account to start supporting space sustainability with your
          satellite observations
        </h2>
        <NavLink to="/signup">
          <Button
            text="Become an observer"
            color="white"
            addStyles="join-view__button"
          />
        </NavLink>
      </section>
    </div>
  );
}
