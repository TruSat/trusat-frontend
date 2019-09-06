import React from "react";

export default function PrivacySettings({
  showEditPrivacyInputs,
  setShowEditPrivacyInputs,
  newPublicUsername,
  setNewPublicUsername,
  newPublicLocation,
  setNewPublicLocation
}) {
  return (
    <section className="privacy-settings__wrapper">
      <h2 className="privacy-settings__heading">
        <p>PRIVACY</p>
        <p
          className="privacy-settings__edit-button-text"
          onClick={() => setShowEditPrivacyInputs(true)}
        >
          edit
        </p>
      </h2>
      <div className="privacy-settings__setting-wrapper">
        {showEditPrivacyInputs ? (
          <input
            type="checkbox"
            className="privacy-settings__checkbox"
            checked={!newPublicUsername}
            onChange={() => setNewPublicUsername(!newPublicUsername)}
          ></input>
        ) : newPublicUsername ? (
          `X  `
        ) : (
          `√  `
        )}
        <label className="privacy-settings__checkbox-label">
          Hide my username and show ETH address instead
        </label>
      </div>
      <div className="privacy-settings__setting-wrapper">
        {showEditPrivacyInputs ? (
          <input
            type="checkbox"
            className="privacy-settings__checkbox"
            checked={!newPublicLocation}
            onChange={() => setNewPublicLocation(!newPublicLocation)}
          ></input>
        ) : newPublicLocation ? (
          `X  `
        ) : (
          `√ `
        )}
        <label className="privacy-settings__checkbox--label">
          When listing my observation, display my location as "undisclosed"
          rather than as a city near where the observation was made
        </label>
      </div>
      <p className="privacy-settings__remove-text">
        Remove my current and historical data from the system
      </p>
    </section>
  );
}
