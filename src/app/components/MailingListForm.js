import React, { useState } from "react";
import ReactGA from "react-ga";

export default function MailingListForm({ testPilots, eventLabel }) {
  console.log(eventLabel);
  const [email, setEmail] = useState();

  return (
    <form
      action={
        testPilots
          ? `https://consensys.us4.list-manage.com/subscribe/post?u=d2289b46e82a459c8808b427c&amp;id=a76fc2d9aa`
          : `https://consensys.us4.list-manage.com/subscribe/post?u=d2289b46e82a459c8808b427c&amp;id=8b9ce58d71`
      }
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate"
      target="_blank"
      noValidate
    >
      <div className="mailing-list__input-button-wrapper">
        <input
          required
          name="EMAIL"
          id="mce-EMAIL"
          className={
            testPilots
              ? "mailing-list__input mailing-list__input--test-pilots"
              : "mailing-list__input"
          }
          type="email"
          placeholder="Your email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        ></input>
        <button
          type="submit"
          name="subscribe"
          className={
            testPilots
              ? "mailing-list__subscribe-button mailing-list__subscribe-button--test-pilots"
              : "mailing-list__subscribe-button"
          }
          color="white"
          id="mc-embedded-subscribe"
          onClick={() => {
            if (eventLabel) {
              ReactGA.event({
                category: "Onboarding",
                action: "Subscribed to mailing list",
                label: eventLabel
              });
            }
          }}
          onSubmit={() => {
            setEmail("");
          }}
        >
          {testPilots ? `SIGN UP` : `JOIN`}
        </button>
      </div>
    </form>
  );
}
