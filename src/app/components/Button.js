import React from "react";

export default function Button({ addStyles, color, text, onClick }) {
  return (
    <span className={`app__button--${color} ${addStyles}`} onClick={onClick}>
      {text}
    </span>
  );
}
