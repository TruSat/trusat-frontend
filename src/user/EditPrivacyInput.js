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
          onClick={() => setSetting(true)}
          value="public"
        ></input>
      </label>

      <label>
        Private{" "}
        <input
          type="radio"
          name="privacySetting"
          onClick={() => setSetting(false)}
          value="private"
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
