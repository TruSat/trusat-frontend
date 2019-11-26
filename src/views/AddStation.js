import React, { useState } from "react";
import { QuestionMarkToolTip } from "../app/app-helpers";

export default function AddStation() {
  const [stationName, setStationName] = useState(``);
  const [latitude, setLatitude] = useState(``);
  const [longitude, setlongitude] = useState(``);
  const [altitude, setAltitude] = useState(``);
  const [notes, setNotes] = useState(``);

  const submitLocation = () => {};

  return (
    <div className="add-station">
      <h1 className="static-page__main-header--small">Add a location</h1>
      <h2 className="add-station__sub-header">
        You first need to set a station location
      </h2>

      <form
        className="app__form"
        onSubmit={event => {
          event.preventDefault();
          submitLocation();
        }}
      >
        <div>
          <label className="app__form__label station-form__label">
            <p>Station name or label</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            className="app__form__input"
            value={stationName}
            onChange={event => setStationName(event.target.value)}
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Latitude (degrees)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            className="app__form__input"
            value={latitude}
            onChange={event => setLatitude(event.target.value)}
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Longitude (degrees)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            className="app__form__input"
            value={longitude}
            onChange={event => setlongitude(event.target.value)}
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Altitude (meters)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            className="app__form__input"
            value={altitude}
            onChange={event => setAltitude(event.target.value)}
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Notes (optional)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            className="app__form__input"
            value={notes}
            onChange={event => setNotes(event.target.value)}
          ></input>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input className="app__form__checkbox" type="checkbox"></input>
          <label className="app__form__label station-form__label">
            <p>Make this my default observation location</p>
          </label>
        </div>

        <button type="submit" className="station-form__button">
          Add station
        </button>
      </form>
    </div>
  );
}
