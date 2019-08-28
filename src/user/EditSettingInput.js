import React, { useState } from "react";

export default function EditSettingInput({ setting, setSetting, submitEdit }) {
  const [showInputField, setShowInputfield] = useState(false);

  return showInputField ? (
    <div>
      <input
        onChange={event => setSetting(event.target.value)}
        value={setting}
      ></input>
      <button
        onClick={() => {
          submitEdit();
          setShowInputfield(false);
        }}
      >
        Submit
      </button>
    </div>
  ) : (
    <div>
      <button onClick={() => setShowInputfield(true)}>change</button>
      <p>{setting}</p>
    </div>
  );
}
