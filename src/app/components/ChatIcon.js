import React from "react";
import ChatIconSvg from "../../assets/icon-chat.svg";

export default function ChatIcon() {
  return (
    <div className="discourse-chat-button__wrapper">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discuss.trusat.org/"
      >
        <img
          className="discourse-chat-button__icon"
          src={ChatIconSvg}
          alt="discourse chat"
        ></img>
      </a>
    </div>
  );
}
