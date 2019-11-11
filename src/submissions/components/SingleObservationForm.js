import React, { useState, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";
import Spinner from "../../app/components/Spinner";
import { checkJwt } from "../../auth/auth-helpers";
import { API_ROOT } from "../../app/app-helpers";
import CircleCheck from "../../assets/CircleCheck.svg";

// import { useTrusatGetApi } from "../../app/app-helpers";

export default function SingleObservationForm() {
  // STATION CONDITIONS
  const [station, setStation] = useState(``); // 4 chars
  const [cloudedOut, setCloudedOut] = useState(false);
  const [observerUnavailable, setObserverUnavailable] = useState(false);
  const [date, setDate] = useState(``); // 8 chars
  const [time, setTime] = useState(`         `); // 9 chars
  const [timeUncertainty, setTimeUncertainty] = useState(`18`); // 2 chars
  const [conditions, setConditions] = useState(` `); // 1 char
  // OBJECT POSITION
  const [object, setObject] = useState(``); // 15 chars
  // position format in the UI
  const [angleFormatCode, setAngleFormatCode] = useState(`2`); // 1 char
  const [epochCode, setEpochCode] = useState(`5`); // 1 char
  const [rightAscensionOrAzimuth, setRightAscensionOrAzimuth] = useState(
    `       `
  ); // 7 chars
  const [declinationOrElevationSign, setDeclinationOrElevationSign] = useState(
    `+`
  ); // 1 char
  // declinatiion OR Elevation
  const [declinationOrElevation, setDeclinationOrElevation] = useState(
    `      `
  ); // 6 chars
  // positional uncertainty
  const [positionalUncertainty, setPositionalUncertainty] = useState(`18`); // 2 chars
  // BEHAVIOR
  const [behavior, setBehavior] = useState(` `); // 1 char
  const [visualMagnitudeSign, setVisualMagnitudeSign] = useState("+"); // 1 char
  const [visualMagnitude, setVisualMagnitude] = useState(`   `); // 3 chars
  const [visualMagnitudeUncertainty, setVisualMagnitudeUncertainty] = useState(
    "10"
  );
  const [flashPeriod, setFlashPeriod] = useState(`      `); // 6 chars
  const [remarks, setRemarks] = useState("");
  // IOD STRING
  const [IOD, setIOD] = useState("");
  // VALIDATION ERROR MESSAGING
  const numRegEx = /^\d+$/; // checks if string only contains numbers
  // const today = new Date(); // get todays date
  // const maxDate = `${today.getFullYear()}-${today.getMonth() +
  //   1}-${today.getDate()}`; // get max date
  const [isStationError, setIsStationError] = useState(false);
  const [isDateError, setIsDateError] = useState(false);
  const [isTimeError, setIsTimeError] = useState(false);
  const [isObjectError, setIsObjectError] = useState(false);
  const [
    isRightAscensionOrAzimuthError,
    setIsRightAscensionOrAzimuthError
  ] = useState(false);
  const [
    isDeclinationOrElevationError,
    setIsDeclinationOrElevationError
  ] = useState(false);

  // const iodRegEx = /^(\d{5}\s\d{2}\s\d{3}(?=[A-Z]+\s*)[\D\s]{3}(?<!\s\w)\s|\s{16})\d{4}\s[EGFPBTCO ]\s[\d+]{8}(\d*\s*$|(?=.{9})\d*\s*?\s\d{2}\s([1-7][\s0-6]\s(?=[\d\s*]{7})\d+\s*?[+-](?=[\d\s*]{6})\d+\s*?\s\d{2}|\s{20})(\s[EFIRSXBHPADMNV]([+-](?=[\d\s*?]{3})\d+\s*?\s(?=[\d\s*?]{2})\d+\s*?\s(\s+\d+$)?)?)?)/;

  // const [{ data, isLoading, isError }, doFetch] = useTrusatGetApi();

  // SUBMISSION UI STATES
  const [isLoading, setIsLoading] = useState(false);
  // server provides a count of accepted IODs - i.e. correct format and not duplicates
  const [successCount, setSuccessCount] = useState(null);
  // server provides these so we can render more specific error messages
  const [errorMessages, setErrorMessages] = useState([]);
  const { jwt } = useAuthState();
  const [isError, setIsError] = useState(false);

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

  // Input Validation
  useEffect(() => {
    // station is mandatory, must be 4 chars long, all numbers
    if (station.length !== 4 || !numRegEx.test(station)) {
      setIsStationError(true);
    } else {
      setIsStationError(false);
    }

    // date is mandatory, must be 8 chars long, all numbers
    if (date.length !== 8 || !numRegEx.test(date)) {
      setIsDateError(true);
    } else {
      setIsDateError(false);
    }

    // if time contains non-whitespace chars or is not 9 chars long
    if (/\S/.test(time) || time.length !== 9) {
      // time must be 9 chars, all numbers
      if (time.length !== 9 || !numRegEx.test(time)) {
        setIsTimeError(true);
      } else {
        setIsTimeError(false);
      }
    } else {
      setIsTimeError(false);
    }

    // object is mandatory, must be 8 chars long
    if (object.length !== 15) {
      setIsObjectError(true);
    } else {
      setIsObjectError(false);
    }

    // if rightAscensionOrAzimuth contains non-whitespace chars or is not 9 chars long
    if (
      /\S/.test(rightAscensionOrAzimuth) ||
      rightAscensionOrAzimuth.length !== 7
    ) {
      // rightAscensionOrAzimuth must be 7 chars, all numbers
      if (
        rightAscensionOrAzimuth.length !== 7 ||
        !numRegEx.test(rightAscensionOrAzimuth)
      ) {
        setIsRightAscensionOrAzimuthError(true);
      } else {
        setIsRightAscensionOrAzimuthError(false);
      }
    } else {
      setIsRightAscensionOrAzimuthError(false);
    }

    // if declinationOrElevation contains non-whitespace chars or is not 9 chars long
    if (
      /\S/.test(declinationOrElevation) ||
      declinationOrElevation.length !== 6
    ) {
      // time must be 9 chars, all numbers
      if (
        declinationOrElevation.length !== 6 ||
        !numRegEx.test(declinationOrElevation)
      ) {
        setIsDeclinationOrElevationError(true);
      } else {
        setIsDeclinationOrElevationError(false);
      }
    } else {
      setIsDeclinationOrElevationError(false);
    }
  }, [
    station,
    date,
    time,
    numRegEx,
    object,
    rightAscensionOrAzimuth,
    declinationOrElevation
  ]);

  // SEARCH FOR OBJECT IN DATABASE
  // useEffect(() => {
  //   doFetch(`/findObject/${object}`);
  //   console.log(data);
  // }, [object, doFetch, data]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsError(false);
    setSuccessCount(null);
    setErrorMessages([]);

    // check if jwt is valid and hasn't expired before submission
    await checkJwt(jwt);

    // Only submit IOD if no validation errors found
    if (
      !isStationError &&
      !isDateError &&
      !isTimeError &&
      !isObjectError &&
      !isRightAscensionOrAzimuthError &&
      !isDeclinationOrElevationError
    ) {
      try {
        const result = await axios.post(
          `${API_ROOT}/submitObservation`,
          JSON.stringify({ jwt: jwt, multiple: IOD })
        );

        if (result.data.success !== 0) {
          setSuccessCount(result.data.success);
        } else if (result.data.error_messages.length !== 0) {
          setErrorMessages(result.data.error_messages);
        }
      } catch (error) {
        setIsError(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <p style={{ color: "orange", marginBottom: "1em", whiteSpace: "pre" }}>
        IOD = {IOD}
        {` `}
        {remarks}
      </p>
      <p style={IOD.length === 80 ? { color: "green" } : { color: "red" }}>
        IOD length = {IOD.length}
      </p>
      <form
        className="single-observation-form"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {/* STATION CONDITIONS */}
        <section className="station-conditions__section">
          <h2 className="single-observation-form__heading">
            STATION CONDITIONS
          </h2>
          <div className="station-conditions__location-checkbox-wrapper">
            <div className="station-conditions__location-wrapper">
              <label>Station Location</label>
              <input
                className="app__form__input"
                required
                type="number"
                value={station}
                onChange={event => {
                  if (event.target.value.length < 5) {
                    setStation(event.target.value);
                  }
                }}
                placeholder="####"
                style={isStationError ? { border: "2px solid red" } : null}
              />
              {isStationError ? (
                <p className="app__error-message">
                  Station must be a numerical value of 4 characters
                </p>
              ) : null}
            </div>
            {/* checkboxes */}
            <div className="station-conditions__checkbox-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={cloudedOut}
                  onChange={() => {
                    setCloudedOut(!cloudedOut);
                    setObserverUnavailable(false);
                    setConditions("C");
                  }}
                ></input>
                Clouded Out
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={observerUnavailable}
                  onChange={() => {
                    setObserverUnavailable(!observerUnavailable);
                    setCloudedOut(false);
                    setConditions("O");
                  }}
                ></input>
                Observer Unavailable
              </label>
            </div>
          </div>
          {/* Date, time and time uncertainty */}
          <div className="station-conditions__date-time-uncertainty-wrapper">
            <div className="station-conditions__date-time-wrapper">
              <label>Time of observation</label>
              <div className="station-conditions__date-time-wrapper-inner">
                <input
                  required
                  className="station-conditions__date app__form__input"
                  type="number"
                  placeholder="YYYYMMDD"
                  // onChange={event => {
                  //   setDate(event.target.value.replace(/-/g, ""));
                  // }}
                  value={date}
                  onChange={event => {
                    // limit input to 8 chars
                    if (event.target.value.length < 9) {
                      setDate(event.target.value);
                    }
                  }}
                  style={isDateError ? { border: "2px solid red" } : null}
                />

                <input
                  type="number"
                  className="station-conditions__time app__form__input"
                  onChange={event => {
                    // limit input to 9 chars
                    if (event.target.value.length < 10) {
                      setTime(event.target.value);
                    }
                  }}
                  value={time}
                  placeholder="HHMMSSsss"
                  style={isTimeError ? { border: "2px solid red" } : null}
                />
              </div>
              {isDateError ? (
                <p className="app__error-message">
                  Date must be a numerical value of 8 characters in the
                  following format: YYYYMMDD
                </p>
              ) : null}
              {isTimeError ? (
                <p className="app__error-message">
                  Time must be a numerical value of 9 characters representing
                  UTC time in the following format: HHMMSSsss
                </p>
              ) : null}
            </div>
            <div className="station-conditions__time-uncertainty-wrapper">
              <label>Time uncertainty</label>
              <select
                className="app__form__input"
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
          <h2 className="single-observation-form__heading">OBJECT POSITION</h2>
          <div className="object-position__object-wrapper">
            <input
              type="text"
              required
              className="object-position__object-input app__form__input"
              onChange={event => {
                // limit input to 15 chars
                if (event.target.value.length < 16) {
                  setObject(event.target.value);
                }
              }}
              value={object}
              placeholder="Object"
              style={isObjectError ? { border: "2px solid red" } : null}
            />
            {isObjectError ? (
              <p className="app__error-message">
                Enter a valid Object or International Designation number for the
                object you are reporting an observation for.
              </p>
            ) : null}
          </div>

          <div className="object-position__angle-epoch-wrapper">
            <div className="object-position__angle-wrapper">
              <label>Position format</label>
              <select
                className="app__form__input"
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
                className="app__form__input"
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
                  className="app__form__input"
                  type="number"
                  onChange={event => {
                    // limit input to 7 chars
                    if (event.target.value.length < 8) {
                      setRightAscensionOrAzimuth(event.target.value);
                    }
                  }}
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
                  style={
                    isRightAscensionOrAzimuthError
                      ? { border: "2px solid red" }
                      : null
                  }
                />
                {isRightAscensionOrAzimuthError ? (
                  <p className="app__error-message">
                    Enter a valid numerical value for Right Ascension or Azimuth
                    referencing the position format you chose above
                  </p>
                ) : null}
              </div>
              <div className="object-position__declination-elevation-wrapper">
                <label>
                  {angleFormatCode < 4 || angleFormatCode > 6
                    ? "Declination"
                    : "Elevation"}
                </label>
                <div className="object-position__declination-elevation-wrapper-inner">
                  <select
                    className="object-position__visual-magnitude-sign-select app__form__input"
                    onChange={event =>
                      setDeclinationOrElevationSign(event.target.value)
                    }
                    value={declinationOrElevationSign}
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                  <input
                    className="object-position__visual-declination-elevation app__form__input"
                    type="number"
                    onChange={event => {
                      // limit input to 6 chars
                      if (event.target.value.length < 7) {
                        setDeclinationOrElevation(event.target.value);
                      }
                    }}
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
                    style={
                      isDeclinationOrElevationError
                        ? { border: "2px solid red" }
                        : null
                    }
                  />
                  {isDeclinationOrElevationError ? (
                    <p className="app__error-message">
                      Enter a valid numerical value for Declination or Elevation
                      referencing the position format you chose above
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="object-position__position-uncertainty-wrapper">
              <label>Positional uncertainty</label>
              <select
                value={positionalUncertainty}
                onChange={event => setPositionalUncertainty(event.target.value)}
                className="app__form__input"
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
          <h2 className="single-observation-form__heading">
            BEHAVIOR (OPTIONAL)
          </h2>
          <div className="object-behavior__visibility-wrapper">
            <label>Visibility</label>
            <select
              className="object-behavior__behavior-select app__form__input"
              onChange={event => setBehavior(event.target.value)}
              value={behavior}
            >
              <option value={` `} disabled hidden>
                Choose Behavior
              </option>
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
              <label>Visual Magnitude (Brightness)</label>
              <div className="object-behavior__brightness">
                <select
                  className="object-behavior__visual-magnitude-sign-select app__form__input"
                  onChange={event => setVisualMagnitudeSign(event.target.value)}
                  value={visualMagnitudeSign}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <select
                  className="object-behavior__brightness-select app__form__input"
                  type="number"
                  onChange={event => setVisualMagnitude(event.target.value)}
                  value={visualMagnitude}
                >
                  <option value="010">1</option>
                  <option value="020">2</option>
                  <option value="030">3</option>
                  <option value="040">4</option>
                  <option value="050">5</option>
                  <option value="060">6</option>
                </select>
              </div>
            </div>
            <div className="object-behavior__brightness-uncertainty-wrapper">
              <label>Brightness uncertainty</label>
              <select
                className="object-behavior__brightness-uncertainty-select app__form__input"
                onChange={event =>
                  setVisualMagnitudeUncertainty(event.target.value)
                }
                value={visualMagnitudeUncertainty}
              >
                <option value={`01`}>0.1</option>
                <option value={`02`}>0.2</option>
                <option value={`03`}>0.3</option>
                <option value={`04`}>0.4</option>
                <option value={`05`}>0.5</option>
                <option value={`10`}>1</option>
                <option value={`15`}>1.5</option>
                <option value={`20`}>2</option>
              </select>
            </div>
            <div className="object-behavior__flash-period-wrapper">
              <label>Flash Period</label>
              <select
                className="object-behavior__flash-period-select app__form__input"
                onChange={event => setFlashPeriod(event.target.value)}
                value={flashPeriod}
              >
                <option value={` 05000`}>0.5 seconds</option>
                <option value={` 10000`}>1 seconds</option>
                <option value={` 15000`}>1.5 seconds</option>
                <option value={` 20000`}>2 seconds</option>
                <option value={` 25000`}>2.5 seconds</option>
                <option value={` 30000`}>3 seconds</option>
                <option value={` 35000`}>3.5 seconds</option>
                <option value={` 40000`}>4 seconds</option>
                <option value={` 45000`}>4.5 seconds</option>
                <option value={` 50000`}>5 seconds</option>
                <option value={` 55000`}>5.5 seconds</option>
                <option value={` 60000`}>6 seconds</option>
                <option value={` 65000`}>6.5 seconds</option>
                <option value={` 70000`}>7 seconds</option>
                <option value={` 75000`}>7.5 seconds</option>
                <option value={` 80000`}>8 seconds</option>
              </select>
            </div>
          </div>
          <div className="object-behavior__remarks-wrapper">
            <label>Remarks</label>
            <textarea
              placeholder="Brief comments placed here will be recorded with the observation record."
              value={remarks}
              onChange={event => setRemarks(event.target.value)}
              className="app__form__input"
            ></textarea>
          </div>
        </section>

        <p style={{ color: "orange", marginBottom: "1em" }}>
          IOD = {IOD}
          {` `}
          {remarks}
        </p>
        <p
          style={
            IOD.length === 80
              ? { color: "green", marginBottom: "1em" }
              : { color: "red", marginBottom: "1em" }
          }
        >
          IOD length = {IOD.length} characters
        </p>

        {/* Success message */}
        {successCount > 0 ? (
          <div className="app__success-message">
            <img
              className="multiple-observation-form__image"
              src={CircleCheck}
              alt="check"
            ></img>
            Thank you for your submission of {successCount}{" "}
            {successCount === 1 ? "observation" : "observations"}!
          </div>
        ) : null}

        {/* Failure messages */}
        {errorMessages.length > 0 ? (
          <Fragment>
            <p className="app__error-message">Something went wrong!</p>
            {errorMessages.map(message => {
              return <p className="app__error-message">{message}</p>;
            })}
          </Fragment>
        ) : null}

        {isError ? (
          <p className="app__error-message">Something went wrong...</p>
        ) : isLoading ? (
          <Spinner />
        ) : (
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
        )}
      </form>
    </Fragment>
  );
}
