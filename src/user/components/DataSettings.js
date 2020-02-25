import React from "react";
import { toolTip, emails } from "../../app/app-helpers";
import DownloadObservations from "../../user/components/DownloadObservations";

export default function PrivacySettings() {
  return (
    <section className="data-settings__wrapper">
      <h2 className="data-settings__heading">
        <p>MY DATA</p>
      </h2>
      <DownloadObservations />
      <a
        className="data-settings__remove-text"
        href={`mailto:${emails.remove}`}
      >
        {toolTip(
          `Remove my current and historical data from the system`,
          `Click to email us at ${emails.remove} and we will and we will remove your current and historical data from the system`
        )}
      </a>
    </section>
  );
}
