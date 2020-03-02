import React from "react";
import { toolTip, emails } from "../../app/app-helpers";
import DownloadObservations from "../../user/components/DownloadObservations";
import { useProfileState } from "../../profile/profile-context";

export default function PrivacySettings() {
  const { profileData } = useProfileState();

  return (
    <section className="data-settings__wrapper">
      <h2 className="data-settings__heading">
        <p>MY DATA</p>
      </h2>
      <div className="data-settings__button-wrapper">
        <DownloadObservations
          observationCount={profileData.observation_count}
        />
        <a
          className="data-settings__remove-text"
          href={`mailto:${emails.remove}`}
        >
          {toolTip(
            `Remove my data from TruSat`,
            `Click to email us at ${emails.remove} and we will and we will remove your current and historical data from the system`
          )}
        </a>
      </div>
    </section>
  );
}
