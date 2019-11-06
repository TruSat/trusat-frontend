import React, { useState, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function SingleObservationForm() {
  // STATION CONDITIONS
  // Defaults to 9999 for users who don't have a station number
  const [station, setStation] = useState("9999");
  const [cloudedOut, setCloudedOut] = useState(false);
  const [observerUnavailable, setObserverUnavailable] = useState(false);
  // date, time and time uncertainty
  const [date, setDate] = useState("20191103");
  const [time, setTime] = useState("213045000");
  const [timeUncertainty, setTimeUncertainty] = useState("18");
  const [conditions, setConditions] = useState("\xa0");
  // OBJECT POSITION
  const [object, setObject] = useState("12345 98 123LEO");
  // position format in the UI
  const [angleFormatCode, setAngleFormatCode] = useState("2");
  const [epochCode, setEpochCode] = useState("5");
  // right ascension OR azimuth
  const [rightAscensionOrAzimuth, setRightAscensionOrAzimuth] = useState(
    "1122333"
  );
  const [declinationOrElevationSign, setDeclinationOrElevationSign] = useState(
    "+"
  );
  // declinatiion OR Elevation
  const [declinationOrElevation, setDeclinationOrElevation] = useState(
    "112233"
  );
  // positional uncertainty
  const [positionalUncertainty, setPositionalUncertainty] = useState("18");
  // BEHAVIOR

  // Brightness - AKA visual magnitude
  const [visualMagnitudeSign, setVisualMagnitudeSign] = useState("+");
  const [visualMagnitude, setVisualMagnitude] = useState(`070`);
  const [visualMagnitudeUncertainty, setVisualMagnitudeUncertainty] = useState(
    "10"
  );
  const [behavior, setBehavior] = useState("H");
  // Behavior, Brightness and Conditions
  const [flashPeriod, setFlashPeriod] = useState(` 10000`);
  const [remarks, setRemarks] = useState("");

  // The IOD string to be updated.
  const [IOD, setIOD] = useState("");

  useEffect(() => {
    setIOD(
      `${object} ${station} ${conditions} ${date}${time} ${timeUncertainty} ${angleFormatCode}${epochCode} ${rightAscensionOrAzimuth}${declinationOrElevationSign}${declinationOrElevation} ${positionalUncertainty} ${behavior}${visualMagnitudeSign}${visualMagnitude} ${visualMagnitudeUncertainty} ${flashPeriod}`
    );
  }, [
    object,
    station,
    conditions,
    date,
    time,
    timeUncertainty,
    angleFormatCode,
    epochCode,
    rightAscensionOrAzimuth,
    declinationOrElevationSign,
    declinationOrElevation,
    positionalUncertainty,
    behavior,
    visualMagnitudeSign,
    visualMagnitude,
    visualMagnitudeUncertainty,
    flashPeriod
  ]);

  const handleSubmit = () => {};

  const today = new Date();
  const maxDate = `${today.getFullYear()}-${today.getMonth() +
    1}-${today.getDate()}`;

  return (
    <Fragment>
      <p style={{ color: "orange", marginBottom: "1em" }}>
        IOD = {IOD}
        {` `}
        {remarks}
      </p>
      <p style={{ color: "orange" }}>IOD length = {IOD.length}</p>
      <form
        className="single-observation-form"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {/* STATION CONDITIONS */}
        <section className="station-conditions__section">
          <h2 className="station-conditions__heading">STATION CONDITIONS</h2>
          <div className="station-conditions__location-checkbox-wrapper">
            <div className="station-conditions__location-wrapper">
              <label>Station Location</label>
              <input
                required
                type="number"
                value={station}
                onChange={event => {
                  if (event.target.value.length < 5) {
                    setStation(event.target.value);
                  }
                }}
                placeholder="####"
              />
            </div>
            {/* checkboxes */}
            <div className="station-conditions__checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={cloudedOut}
                  onChange={() => setCloudedOut(!cloudedOut)}
                ></input>
                Clouded Out
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={observerUnavailable}
                  onChange={() => setObserverUnavailable(!observerUnavailable)}
                ></input>
                Observer Unavailable
              </label>
            </div>
          </div>
          {/* Date, time and time uncertainty */}
          <div className="station-conditions__date-time-wrapper">
            <div>
              <label>Time of observation</label>
              <div>
                <input
                  required
                  className=""
                  type="date"
                  onChange={event => {
                    setDate(event.target.value.replace(/-/g, ""));
                  }}
                  max={maxDate}
                />
                <input
                  className=""
                  onChange={event => setTime(event.target.value)}
                  value={time}
                  placeholder="HHMMSSsss"
                />
              </div>
            </div>
            <div className="station-conditions__time-uncertainty-wrapper">
              <label>Time uncertainty</label>
              <select
                onChange={event => setTimeUncertainty(event.target.value)}
                value={timeUncertainty}
              >
                <option value="15">0.001 seconds</option>
                <option value="56">0.05 seconds</option>
                <option value="17">0.1 seconds</option>
                <option value="97">0.9 seconds</option>
                <option value="18">1.0 seconds</option>
                <option value="28">2.0 seconds</option>
                <option value="58">5.0 seconds</option>
                <option value="19">10.0 seconds</option>
                <option value="29">20.0 seconds</option>
                <option value="99">90.0 seconds</option>
              </select>
            </div>
          </div>
          {/* Conditions */}
          <div className="station-conditions__conditions-wrapper">
            <label>Conditions (optional)</label>
            <div className="station-conditions__conditions-buttons-wrapper">
              <span
                className="station-conditions__button"
                onClick={() => setConditions("E")}
              >
                Excellent
              </span>
              <span
                className="station-conditions__button"
                onClick={() => setConditions("G")}
              >
                Good
              </span>
              <span
                className="station-conditions__button"
                onClick={() => setConditions("F")}
              >
                Fair
              </span>
              <span
                className="station-conditions__button"
                onClick={() => setConditions("P")}
              >
                Poor
              </span>
              <span
                className="station-conditions__button"
                onClick={() => setConditions("B")}
              >
                Bad
              </span>
              <span
                className="station-conditions__button"
                onClick={() => setConditions("T")}
              >
                Terrible
              </span>
            </div>
          </div>
        </section>

        {/* OBJECT POSITION */}
        <section className="object-position__section">
          <h2 className="object-position__heading">OBJECT POSITION</h2>
          <div className="object-position__object-wrapper">
            <input
              className="object-position__object-input"
              type="text"
              onChange={event => setObject(event.target.value)}
              value={object}
              placeholder="Object"
            />
          </div>

          <div className="object-position__angle-epoch-wrapper">
            <div className="object-position__angle-wrapper">
              <label>Position format</label>
              <select
                selected={angleFormatCode}
                onChange={event => setAngleFormatCode(event.target.value)}
                // default is 2
                value={angleFormatCode}
              >
                <option value="1">1: RA/DEC = HHMMSSs+DDMMSS MX</option>
                <option value="2">2: RA/DEC = HHMMmmm+DDMMmm MX</option>
                <option value="3">3: RA/DEC = HHMMmmm+DDdddd MX</option>
                <option value="4">4: AZ/EL = DDDMMSS+DDMMSS MX</option>
                <option value="5">5: AZ/EL = DDDMMmm+DDMMmm MX</option>
                <option value="6">6: AZ/EL = DDDdddd+DDdddd MX</option>
                <option value="7">7: RA/DEC = HHMMSSs+DDdddd MX</option>
              </select>
            </div>
            <div className="object-position__epoch-wrapper">
              <label>Epoch code</label>
              {/* TO DO - Epoch value must be "blank" if AZ/EL is chosen for angleFormatCode */}
              <select
                value={
                  Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                    ? "0"
                    : epochCode
                }
                onChange={event => setEpochCode(event.target.value)}
              >
                <option value="0">0 or blank = of date</option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="1"
                >
                  1 = 1855
                </option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="2"
                >
                  2 = 1875
                </option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="3"
                >
                  3 = 1900
                </option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="4"
                >
                  4 = 1950
                </option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="5"
                >
                  5 = 2000
                </option>
                <option
                  disabled={
                    Number(angleFormatCode) > 3 && Number(angleFormatCode) < 7
                      ? true
                      : false
                  }
                  value="6"
                >
                  6 = 2050
                </option>
              </select>
            </div>
          </div>
          {/* Right ascension and declination */}
          <div className="object-position__ascension-declination-uncertainty-wrapper">
            <div className="object-position__ascension-declination-wrapper">
              <div className="object-position__ascension-wrapper">
                <label>
                  {angleFormatCode < 4 || angleFormatCode > 6
                    ? "Right ascension"
                    : "Azimuth"}
                </label>
                <input
                  type="number"
                  onChange={event =>
                    setRightAscensionOrAzimuth(event.target.value)
                  }
                  value={rightAscensionOrAzimuth}
                  placeholder={
                    angleFormatCode === "1"
                      ? "HHMMSSs"
                      : angleFormatCode === "2"
                      ? "HHMMmmm"
                      : angleFormatCode === "3"
                      ? "HHMMmmm"
                      : angleFormatCode === "4"
                      ? "DDDMMSS"
                      : angleFormatCode === "5"
                      ? "DDDMMmm"
                      : angleFormatCode === "6"
                      ? "DDDdddd"
                      : angleFormatCode === "7"
                      ? "HHMMSSs"
                      : null
                  }
                />
              </div>
              <div className="object-position__declination-elevation-wrapper">
                <label>
                  {angleFormatCode < 4 || angleFormatCode > 6
                    ? "Declination"
                    : "Elevation"}
                </label>
                <div>
                  <select
                    className="object-position__visual-magnitude-sign-select"
                    onChange={event =>
                      setDeclinationOrElevationSign(event.target.value)
                    }
                    value={declinationOrElevationSign}
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                  <input
                    type="number"
                    onChange={event =>
                      setDeclinationOrElevation(event.target.value)
                    }
                    value={declinationOrElevation}
                    placeholder={
                      angleFormatCode === "1"
                        ? "DDMMSS"
                        : angleFormatCode === "2"
                        ? "DDMMmm"
                        : angleFormatCode === "3"
                        ? "DDdddd"
                        : angleFormatCode === "4"
                        ? "DDMMSS"
                        : angleFormatCode === "5"
                        ? "DDMMmm"
                        : angleFormatCode === "6"
                        ? "DDdddd"
                        : angleFormatCode === "7"
                        ? "DDdddd"
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="object-position__position-uncertainty-wrapper">
              <label>Position uncertainty</label>
              <select
                value={positionalUncertainty}
                onChange={event => setPositionalUncertainty(event.target.value)}
              >
                <option value="34">0.0003 seconds</option>
                <option value="56">0.05 seconds</option>
                <option value="17">0.1 seconds</option>
                <option value="97">0.9 seconds</option>
                <option value="18">1.0 seconds</option>
                <option value="28">2.0 seconds</option>
                <option value="58">5.0 seconds</option>
                <option value="19">10.0 seconds</option>
                <option value="29">20.0 seconds</option>
                <option value="99">90.0 seconds</option>
              </select>
            </div>
          </div>
        </section>

        {/* BEHAVIOR */}
        <section className="object-behavior__section">
          <h2 className="object-behavior__heading">BEHAVIOR (OPTIONAL)</h2>
          <div className="object-behavior__visibility-wrapper">
            <label>Visibility</label>
            <select
              className="object-behavior__behavior-select"
              onChange={event => setBehavior(event.target.value)}
              placeholder="Behavior"
              value={"choose"}
            >
              <option value="choose" disabled hidden></option>
              <option value="E">
                Unusually faint because of eclipse exit/entrance
              </option>
              <option value="F">Constant flash period</option>
              <option value="I">Irregular</option>
              <option value="R">Regular variations</option>
              <option value="S">Steady</option>
              <option value="X">Irregular flash period</option>
              <option value="B">
                Time zero for averaging several flash cycles
              </option>
              <option value="H">One flash in a series</option>
              <option value="P">
                end time for averaging several flash cycles. Time interval from
                last "B" report divided by flash period reported on this line
                gives number of flashes that occurred since "B".
              </option>
              <option value="A">
                became visible (was invisible); use E for eclipse exit
              </option>
              <option value="D">
                Object in field of view, but not visible
              </option>
              <option value="M">Brightest</option>
              <option value="N">Faintest</option>
              <option value="V">Best seen using averted vision</option>
            </select>
          </div>
          <div className="object-behavior__brightness-brightness-uncertainty-wrapper">
            <div className="object-behavior__brightness-wrapper">
              <label>Brightness</label>
              <div>
                <select
                  className="object-behavior__visual-magnitude-sign-select"
                  onChange={event => setVisualMagnitudeSign(event.target.value)}
                  value={visualMagnitudeSign}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <select
                  className="object-behavior__brightness-select"
                  type="number"
                  onChange={event => setVisualMagnitude(event.target.value)}
                  value={visualMagnitude}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <div className="object-behavior__brightness-uncertainty-wrapper">
              <label>Brightness uncertainty</label>
              <select
                className="object-behavior__brightness-uncertainty-select"
                onChange={event =>
                  setVisualMagnitudeUncertainty(event.target.value)
                }
                value={visualMagnitudeUncertainty}
              >
                <option value="01">0.1</option>
                <option value="02">0.2</option>
                <option value="03">0.3</option>
                <option value="04">0.4</option>
                <option value="05">0.5</option>
                <option value="06">0.6</option>
              </select>
            </div>
            <div className="object-behavior__flash-period-wrapper">
              <label>Flash Period</label>
              <select
                className="object-behavior__flash-period-select"
                onChange={event => setFlashPeriod(event.target.value)}
                value={flashPeriod}
              >
                <option value="01">0.1</option>
                <option value="02">0.2</option>
                <option value="03">0.3</option>
                <option value="04">0.4</option>
                <option value="05">0.5</option>
                <option value="06">0.6</option>
              </select>
            </div>
          </div>
          <div className="object-behavior__remarks-wrapper">
            <label>Remarks</label>
            <textarea
              placeholder="What else is noteworthy?"
              value={remarks}
              onChange={event => setRemarks(event.target.value)}
            ></textarea>
          </div>
        </section>

        <p style={{ color: "orange", marginBottom: "1em" }}>
          IOD = {IOD}
          {` `}
          {remarks}
        </p>
        <p style={{ color: "orange" }}>IOD length = {IOD.length}</p>

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
    </Fragment>
  );
}
