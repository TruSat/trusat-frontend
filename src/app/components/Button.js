import React from "react";

export default function Button({ addStyles, color, text, onClick }) {
  return (
    <span
      className={`app__${color}-button--small ${addStyles}`}
      onClick={onClick}
    >
      {text}
    </span>
  );
}
