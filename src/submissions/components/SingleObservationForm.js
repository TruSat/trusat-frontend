import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SingleObservationForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [object, setObject] = useState("");
  // right ascension
  const [rightAscHH, setRightAscHH] = useState("");
  const [rightAscMM, setRightAscMM] = useState("");
  const [rightAscSS, setRightAscSS] = useState("");
  // declination
  const [decHH, setDecHH] = useState("");
  const [decMM, setDecMM] = useState("");
  const [decSS, setDecSS] = useState("");
  // Behavior, Brightness and Conditions
  const [behavior, setBehavior] = useState("");
  const [brightness, setBrightness] = useState("");
  const [conditions, setConditions] = useState("");

  const handleSubmit = () => {
    console.log({
      date,
      time,
      object,
      rightAscHH,
      rightAscMM,
      rightAscSS,
      decHH,
      decMM,
      decSS,
      behavior,
      brightness,
      conditions
    });
  };

  return (
    <form
      className="single-observation-form"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {/* Date and Time */}
      <div className="single-observation-form__date-time-wrapper">
        <input
          className="single-observation-form__date-input"
          type="date"
          onChange={event => setDate(event.target.value)}
        />
        <input
          className="single-observation-form__time-input"
          type="time"
          onChange={event => setTime(event.target.value)}
        />
      </div>

      {/* Object name/number */}
      <div className="single-observation-form__object-wrapper">
        <input
          className="single-observation-form__object-input"
          type="text"
          onChange={event => setObject(event.target.value)}
          value={object}
          placeholder="Object"
        />
      </div>

      {/* Right ascension and declination */}
      <div className="single-observation-form__ascension-declination-wrapper">
        <div>
          <p>Right ascension</p>
          <input
            type="number"
            onChange={event => setRightAscHH(event.target.value)}
            value={rightAscHH}
            placeholder="HH"
          />
          <input
            type="number"
            onChange={event => setRightAscMM(event.target.value)}
            value={rightAscMM}
            placeholder="MM"
          />
          <input
            type="number"
            onChange={event => setRightAscSS(event.target.value)}
            value={rightAscSS}
            placeholder="SS"
          />
        </div>
        <div>
          <p>Declination</p>
          <input
            type="number"
            onChange={event => setDecHH(event.target.value)}
            value={decHH}
            placeholder="HH"
          />
          <input
            type="number"
            onChange={event => setDecMM(event.target.value)}
            value={decMM}
            placeholder="MM"
          />
          <input
            type="number"
            onChange={event => setDecSS(event.target.value)}
            value={decSS}
            placeholder="SS"
          />
        </div>
      </div>

      {/* Behavior and Brightness */}
      <div className="single-observation-form__behavior-brightness-wrapper">
        <div className="single-observation-form__behavior-select-wrapper">
          <p>Behavior</p>
          <select
            className="single-observation-form__behavior-select"
            onChange={event => setBehavior(event.target.value)}
            placeholder="Behavior"
            selected={behavior}
            defaultValue={"choose"}
          >
            <option value="choose" disabled hidden></option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
            <option value="Ugly">Ugly</option>
          </select>
        </div>
        <div className="single-observation-form__brightness-input-wrapper">
          <p>Brightness</p>
          <input
            className="single-observation-form__brightness-input"
            type="number"
            onChange={event => setBrightness(event.target.value)}
            value={brightness}
          />
        </div>
      </div>

      {/* Conditions */}
      <div className="single-observation-form__conditions-wrapper">
        <span onClick={() => setConditions("excellent")}>Excellent</span>
        <span onClick={() => setConditions("good")}>Good</span>
        <span onClick={() => setConditions("fair")}>Fair</span>
        <span onClick={() => setConditions("poor")}>Poor</span>
        <span onClick={() => setConditions("bad")}>Bad</span>
        <span onClick={() => setConditions("terrible")}>Terrible</span>
      </div>

      {/* Cancel and Submit buttons */}
      <div className="single-observation-form__button-wrapper">
        <NavLink className="app__nav-link" to="/catalog/priorities">
          <span className="app__black-button--small single-observation-form__cancel-button">
            CANCEL
          </span>
        </NavLink>
        &nbsp;
        <button type="submit" className="app__white-button--small">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

// QUESTIONS
// 1. what is format for date
// 2. what is format for time
// 3. What is the format for object? and will we use API to search database for object names/numbers?
// 4. what are the options for 'behavior' and how are they formatted
// 5. How is conditions formatted
// 6. What inputs are mandatory?
