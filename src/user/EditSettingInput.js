import React, { useState } from "react";

export default function EditSettingInput({ setting, setSetting }) {
  return (
    <div>
      <input
        onChange={event => setSetting(event.target.value)}
        value={setting}
      ></input>
    </div>
  );
}
