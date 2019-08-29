import React, { useState } from "react";

export default function EditPrivacyInput({ setting, setSetting, submitEdit }) {
  const [showOptions, setShowOptions] = useState(false);

  return showOptions ? (
    <div>
      <label>
        Public{" "}
        <input
          type="radio"
          name="privacySetting"
          onChange={() => setSetting(true)}
          value="public"
          checked={setting}
        ></input>
      </label>

      <label>
        Private{" "}
        <input
          type="radio"
          name="privacySetting"
          onChange={() => setSetting(false)}
          value="private"
          checked={!setting}
        ></input>
      </label>

      <button
        onClick={() => {
          submitEdit();
          setShowOptions(false);
        }}
      >
        Submit
      </button>
    </div>
  ) : (
    <div>
      <button onClick={() => setShowOptions(true)}>change</button>
      <p>{setting}</p>
    </div>
  );
}
