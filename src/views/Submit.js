import React, { useState } from "react";

export default function Submit() {
  const [pastedIODs, setPastedIODs] = useState("");

  return (
    <React.Fragment>
      <h1>SUBMIT OBSERVATIONS</h1>

      <section style={{ margin: "1em" }}>
        <label>
          Submit preformatted data
          <input
            placeholder="Paste your data here"
            value={pastedIODs}
            onChange={event => setPastedIODs(event.target.value)}
          />
        </label>
      </section>

      <section style={{ margin: "1em" }}>
        Or enter an individual observation
      </section>
    </React.Fragment>
  );
}
