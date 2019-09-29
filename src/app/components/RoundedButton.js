import React from "react";

export default function RoundedButton({ addStyles, color, text }) {
  return (
    <span className={`app__rounded-button--${color} ${addStyles}`}>{text}</span>
  );
}
