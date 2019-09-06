import React from "react";

export default function EditProfileSettingInput({ setting, setSetting }) {
  return (
    <div>
      <input
        className="edit-profile-settings-input"
        onChange={event => setSetting(event.target.value)}
        value={setting}
      ></input>
    </div>
  );
}
