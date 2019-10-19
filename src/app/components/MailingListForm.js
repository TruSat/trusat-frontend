import React, { useState } from "react";

export default function MailingListForm({ testPilots }) {
  const [email, setEmail] = useState();

  return (
    <form
      action="https://consensys.us4.list-manage.com/subscribe/post?u=d2289b46e82a459c8808b427c&amp;id=8b9ce58d71"
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
          className="mailing-list__input"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        ></input>
        {testPilots ? (
          <input
            style={{ display: "none" }}
            type="checkbox"
            value="2"
            name="group[24881][2]"
            id="mce-group[24881]-24881-1"
            checked={true}
          ></input>
        ) : null}
        <button
          type="submit"
          name="subscribe"
          className="mailing-list__subscribe-button"
          color="white"
          text="SUBSCRIBE"
          id="mc-embedded-subscribe"
          onSubmit={() => setEmail("")}
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
