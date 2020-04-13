import React from "react";
import ReactGA from "react-ga";

export default function DicordChatIcon() {
  return (
    <div className="discourse-chat-button__wrapper">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://discuss.trusat.org/"
        onClick={() => {
          ReactGA.event({
            category: "Outbound link",
            action: "Clicked a social link",
            label: "Clicked Discuss link"
          });
        }}
      >
        <img
          className="discourse-chat-button__icon"
          src={
            "https://is5-ssl.mzstatic.com/image/thumb/Purple118/v4/4a/f1/b2/4af1b2c2-bdc8-8331-6595-2c759091ed95/AppIcon-0-1x_U007emarketing-0-85-220-0-10.png/1200x630wa.png"
          }
          alt="discourse chat"
        ></img>
      </a>
    </div>
  );
}
