import React from "react";
import ProfileSettings from "../user/ProfileSettings";
import SecuritySettings from "../user/SecuritySettings";

export default function UserSettings() {
  return (
    <div className="account-settings__wrapper">
      <h1 className="account-settings__header">ACCOUNT SETTINGS</h1>
      <ProfileSettings />
      <SecuritySettings />
    </div>
  );
}
