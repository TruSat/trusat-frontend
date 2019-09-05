import React from "react";

export default function PrivacySettings() {
  return (
    <div className="privacy-settings__wrapper">
      <h2 className="privacy-settings__header">PRIVACY</h2>
      <div className="privacy-settings__setting-wrapper">
        <input type="checkbox" className="privacy-settings__checkbox"></input>
        <label className="privacy-settings__checkbox-label">
          Hide my username and show ETH address instead
        </label>
      </div>
      <div className="privacy-settings__setting-wrapper">
        <input type="checkbox" className="privacy-settings__checkbox"></input>
        <label className="privacy-settings__checkbox--label">
          When listing my observation, display my location as "undisclosed"
          rather than as a city near where the observation was made
        </label>
      </div>
      <p className="privacy-settings__remove-text">
        Remove my current and historical data from the system
      </p>
    </div>
  );
}
