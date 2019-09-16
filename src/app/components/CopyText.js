import React, { useState } from "react";

export default function CopyText({ textToCopy }) {
  const [showCopiedText, setShowCopiedText] = useState(false);

  return (
    <p
      className="app__copy-text"
      onClick={() => {
        navigator.clipboard.writeText(textToCopy);
        setShowCopiedText(true);
      }}
    >
      {showCopiedText ? "copied!" : "copy"}
    </p>
  );
}
