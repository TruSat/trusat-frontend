import React from "react";
import Button from "../app/components/Button";

export default function Join() {
  // See auth-styles.cscc in the "auth" directory for styles
  return (
    <div className="join-view__wrapper">
      <section className="join-view__content-container">
        <h1>Join the community building TruSat</h1>
        <h2>
          TruSat is entirely open source, and depends on the efforts of people
          like you.
        </h2>
        <Button
          text="Join the build"
          color="orange"
          addStyles="join-view__button"
        />
      </section>

      <section className="join-view__content-container">
        <h1>Track satellites</h1>
        <h2>
          Create an account to start supporting space sustainability with your
          satellite observations
        </h2>
        <Button
          text="Become an observer"
          color="white"
          addStyles="join-view__button"
        />
      </section>
    </div>
  );
}
