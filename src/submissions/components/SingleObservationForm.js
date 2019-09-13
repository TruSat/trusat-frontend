import React from "react";
import axios from "axios";

export default function SingleObservationForm() {
  const [objectName, setObjectName] = useState("");
  const [rightAscensionHH, setrightAscensionHH] = useState("");
  const [rightAscensionMM, setrightAscensionMM] = useState("");
  const [rightAscensionSS, setrightAscensionSS] = useState("");
  const [declinationHH, setDeclinationHH] = useState("");
  const [declinationMM, setDeclinationMM] = useState("");
  const [declinationSS, setDeclinationSS] = useState("");
  const [brightness, setBrightness] = useState("");
  const [conditions, setConditions] = useState("");

  const findObject = () => {
    // TODO - fix race conditions where this only runs when 5 characters are entered
    if (objectName.length >= 4) {
      axios
        .post(
          `https://api.consensys.space:8080/findObject`,
          JSON.stringify({ objectName: objectName })
        )
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
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
          onChange={async event => {
            await setObjectName(event.target.value);
            findObject();
          }}
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
    </div>
  );
}

// POST request
// receives a searchterm of type string
// returns an array of object names found in our database that include the search term
// eg when they type "USA 18" an array will be returned like this one:
const objects_found = ["USA 181", "USA 181 DEB"];
