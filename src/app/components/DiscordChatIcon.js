import React from "react";
import DiscordChatIcon from "../../assets/icon-chat.svg";

export default function DicordChatIcon() {
  return (
    <div className="discord-chat-button__wrapper">
      <a
        rel="noopener noreferrer"
        href="https://discuss.trusat.org/"
      >
        <img
          className="discord-chat-button__icon"
          src={DiscordChatIcon}
          alt="discord chat"
        ></img>
      </a>
    </div>
  );
}
