import React from "react";

export default function RoundedButton({ addStyles, color, text }) {
  return (
    <button className={`app__rounded-button--${color} ${addStyles}`}>
      {text}
    </button>
  );
}
