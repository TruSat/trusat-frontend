import React from "react";
import { toolTip, emails } from "../../app/app-helpers";

export default function PrivacySettings() {
  return (
    <section className="privacy-settings__wrapper">
      <h2 className="privacy-settings__heading">
        <p>PRIVACY</p>
      </h2>
      <a
        className="privacy-settings__remove-text"
        href={`mailto:${emails.remove}`}
      >
        {toolTip(
          `Remove my current and historical data from the system`,
          `Click to email us at ${emails.remove} and we will take care of your request within two weeks`
        )}
      </a>
    </section>
  );
}
