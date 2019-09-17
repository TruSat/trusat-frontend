import React from "react";

export default function PrivacySettings({
  showEditPrivacyInputs,
  setShowEditPrivacyInputs,
  newPublicUsername,
  setNewPublicUsername,
  newPublicLocation,
  setNewPublicLocation,
  newPublicObservations,
  setNewPublicObservations
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

      {/* Make user name public/private */}
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

      {/* Make location public/private */}
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
          Display my location as "undisclosed"
        </label>
      </div>

      {/* Make observations (IODs or other formats) public/private */}
      <div className="privacy-settings__setting-wrapper">
        {showEditPrivacyInputs ? (
          <input
            type="checkbox"
            className="privacy-settings__checkbox"
            checked={!newPublicObservations}
            onChange={() => setNewPublicLocation(!newPublicObservations)}
          ></input>
        ) : newPublicObservations ? (
          `X  `
        ) : (
          `√ `
        )}
        <label className="privacy-settings__checkbox--label">
          Hide my observations
        </label>
      </div>
      <p className="privacy-settings__remove-text">
        Remove my current and historical data from the system
      </p>
    </section>
  );
}
