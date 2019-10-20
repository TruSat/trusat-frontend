import React from "react";
import DiscordChatIcon from "../../assets/DiscordChatIcon.svg";

export default function DicordChatIcon() {
  return (
    <div className="discord-chat-button__wrapper">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discordapp.com/invite/MEyA2Ns"
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
