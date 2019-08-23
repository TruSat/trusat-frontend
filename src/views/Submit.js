import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../auth/auth-context";

export default function Submit() {
  const { jwt } = useAuthState();

  const [pastedIODs, setPastedIODs] = useState("");

  const [objectName, setObjectName] = useState("");
  const [rightAscensionHH, setrightAscensionHH] = useState("");
  const [rightAscensionMM, setrightAscensionMM] = useState("");
  const [rightAscensionSS, setrightAscensionSS] = useState("");
  const [declinationHH, setDeclinationHH] = useState("");
  const [declinationMM, setDeclinationMM] = useState("");
  const [declinationSS, setDeclinationSS] = useState("");
  const [brightness, setBrightness] = useState("");
  const [conditions, setConditions] = useState("");

  const handleSubmit = () => {
    axios
      .post(
        `https://api.consensys.space:8080/submitObservation`,
        // iod - will be a single iod
        // iods - will be a bunch of iods that will need to be parsed on backend
        JSON.stringify({ jwt: jwt, iods: pastedIODs, iod: "" })
      )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  // TODO
  // This will concatenate all the data entered to the individual obervation fields and return an iod
  // Need to ask chris how to form this
  const createIOD = () => {};

  return (
    <React.Fragment>
      <h1>SUBMIT OBSERVATIONS</h1>

      <section style={{ border: "1px solid yellow", margin: "1em" }}>
        <label>
          <p>Submit preformatted data</p>
          {/* TODO - split inputted text into seperate lines, using the chracter length of an IOD as the charcter limit */}
          <input
            placeholder="Paste your data here"
            value={pastedIODs}
            onChange={event => setPastedIODs(event.target.value)}
          />
        </label>
      </section>

      <section style={{ border: "1px solid yellow", margin: "1em" }}>
        <p>Or enter an individual observation</p>

        <div>
          <input type="date" />
          <input type="time" />
        </div>

        {/* TODO - API call to search the database for names of objects */}
        <input
          type="text"
          value={objectName}
          onChange={event => setObjectName(event.target.value)}
          placeholder="object name"
        />
        <div>
          <p>Right ascension</p>
          <input
            type="text"
            value={rightAscensionHH}
            onChange={event => setrightAscensionHH(event.target.value)}
            placeholder="HH"
          />
          <input
            type="text"
            value={rightAscensionMM}
            onChange={event => setrightAscensionMM(event.target.value)}
            placeholder="MM"
          />
          <input
            type="text"
            value={rightAscensionSS}
            onChange={event => setrightAscensionSS(event.target.value)}
            placeholder="SS"
          />
        </div>

        <div>
          <p>Declination</p>
          <input
            type="text"
            value={declinationHH}
            onChange={event => setDeclinationHH(event.target.value)}
            placeholder="HH"
          />
          <input
            type="text"
            value={declinationMM}
            onChange={event => setDeclinationMM(event.target.value)}
            placeholder="MM"
          />
          <input
            type="text"
            value={declinationSS}
            onChange={event => setDeclinationSS(event.target.value)}
            placeholder="SS"
          />
        </div>

        <div>
          <div>
            <p>Behavior</p>
            <select defaultValue="behavior">
              <option style={{ display: "none" }} value="" defaultValue>
                Behavior
              </option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
            </select>
          </div>
          <div>
            <p>Brightness</p>
            <input
              type="number"
              value={brightness}
              onChange={event => setBrightness(event.target.value)}
            />
          </div>
        </div>

        <div>
          <p>Conditions</p>
          <button onClick={() => setConditions("excellent")}>Excellent</button>
          <button onClick={() => setConditions("good")}>Good</button>
          <button onClick={() => setConditions("fair")}>Fair</button>
          <button onClick={() => setConditions("poor")}>Poor</button>
          <button onClick={() => setConditions("bad")}>Bad</button>
          <button onClick={() => setConditions("terrible")}>Terrible</button>
        </div>
      </section>

      <section style={{ margin: "1em" }}>
        <NavLink to="/catalog">
          <button>CANCEL</button>
        </NavLink>
        <button onClick={handleSubmit}>SUBMIT</button>
      </section>
    </React.Fragment>
  );
}
