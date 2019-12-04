import React, { useState, Fragment } from "react";
import axios from "axios";
import { API_ROOT } from "../app/app-helpers";
import { useAuthState } from "../auth/auth-context";
import { QuestionMarkToolTip } from "../app/app-helpers";
import { checkJwt } from "../auth/auth-helpers";
import Spinner from "../app/components/Spinner";
import CircleCheck from "../assets/CircleCheck.svg";

export default function AddStation() {
  const { jwt } = useAuthState();
  // form state
  const [stationName, setStationName] = useState(``);
  const [latitude, setLatitude] = useState(``);
  const [longitude, setlongitude] = useState(``);
  const [altitude, setAltitude] = useState(``);
  const [notes, setNotes] = useState(``);
  // const [isDefault, setIsDefault] = useState(false);
  // submission state
  const [isLoading, setIsLoading] = useState(false);
  const [successfullyAddedStation, setSuccessfullyAddedStation] = useState(``);
  const [errors, setErrors] = useState([]);
  const [isError, setIsError] = useState(false);

  const resetFormValues = () => {
    setStationName(``);
    setLatitude(``);
    setlongitude(``);
    setAltitude(``);
    setNotes(``);
    // setIsDefault(false);
  };

  const submitLocation = async () => {
    setIsError(false);
    setSuccessfullyAddedStation(``);
    setIsLoading(true);
    // checks if jwt is valid and hasn't expired
    checkJwt(jwt);
    // if no errors
    try {
      const result = await axios.post(
        `${API_ROOT}/generateStation`,
        JSON.stringify({
          jwt: jwt,
          station: stationName,
          latitude: latitude,
          longitude: longitude,
          altitude: altitude,
          notes: notes
        })
      );
      console.log(result);
      setSuccessfullyAddedStation(result.data.station_id);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
    resetFormValues();
  };

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
            required
            type="text"
            className="app__form__input"
            value={stationName}
            onChange={event => setStationName(event.target.value)}
            maxLength={30}
            placeholder="e.g. Crater Lake Campground"
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Latitude (degrees)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            required
            type="number"
            className="app__form__input"
            value={latitude}
            onChange={event => {
              // limit to 15 chars
              if (event.target.value.length < 16) {
                setLatitude(event.target.value);
              }
            }}
            placeholder="e.g. 42.97473848"
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Longitude (degrees)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            required
            type="number"
            className="app__form__input"
            value={longitude}
            onChange={event => {
              if (event.target.value.length < 16) {
                setlongitude(event.target.value);
              }
            }}
            placeholder="e.g. 25.3930"
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Altitude (meters)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <input
            required
            type="number"
            className="app__form__input"
            value={altitude}
            onChange={event => {
              // limit to 10 chars
              if (event.target.value.length < 11) {
                setAltitude(event.target.value);
              }
            }}
            placeholder="e.g. 394.4"
          ></input>
        </div>
        <div>
          <label className="app__form__label station-form__label">
            <p>Notes (optional)</p>
            <QuestionMarkToolTip toolTipText={``} />
          </label>
          <textarea
            rows={4}
            className="app__form__input station-form__textarea"
            value={notes}
            onChange={event => setNotes(event.target.value)}
            placeholder="e.g. equipment description"
            maxLength={140}
          ></textarea>
          {notes.length !== 0 ? (
            <p style={{ textAlign: "right" }}>{140 - notes.length}</p>
          ) : null}
        </div>
        {/* <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="default-checkbox"
            className="app__form__checkbox"
            type="checkbox"
            value={isDefault}
            onClick={() => setIsDefault(!isDefault)}
          ></input>
          <label
            htmlFor="default-checkbox"
            className="app__form__label station-form__label"
          >
            <p>Make this my default observation location</p>
          </label>
        </div> */}
        {successfullyAddedStation ? (
          <Fragment>
            <div className="app__success-message">
              <img src={CircleCheck} alt="check"></img>
              {` `}
              You successfully added a new location and it's station number is{" "}
              {successfullyAddedStation}!
            </div>
          </Fragment>
        ) : null}
        {isError ? (
          <p className="app__error-message">Something went wrong...</p>
        ) : null}
        {isLoading ? (
          <Spinner />
        ) : (
          <button type="submit" className="station-form__button">
            Add station
          </button>
        )}
      </form>
    </div>
  );
}
