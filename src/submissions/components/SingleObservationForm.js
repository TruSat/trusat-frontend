import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "../../auth/auth-context";
import Spinner from "../../app/components/Spinner";
import { checkJwt } from "../../auth/auth-helpers";
import {
  API_ROOT,
  QuestionMarkToolTip,
  toolTipCopy
} from "../../app/app-helpers";
import CircleCheck from "../../assets/CircleCheck.svg";
import ConditionExcellent from "../../assets/ConditionExcellent.svg";
import ConditionGood from "../../assets/ConditionGood.svg";
import ConditionFair from "../../assets/ConditionFair.svg";
import ConditionPoor from "../../assets/ConditionPoor.svg";
import ConditionBad from "../../assets/ConditionBad.svg";
import ConditionTerrible from "../../assets/ConditionTerrible.svg";
import ReactGA from "react-ga";

export default function SingleObservationForm({
  setShowSingleObservationForm
}) {
  // STATION CONDITIONS
  const [station, setStation] = useState(``); // 4 chars
  const [cloudedOut, setCloudedOut] = useState(false);
  const [observerUnavailable, setObserverUnavailable] = useState(false);
  const [date, setDate] = useState(``); // 8 chars
  const [time, setTime] = useState(`         `); // 9 chars
  const [timeUncertainty, setTimeUncertainty] = useState(`18`); // 2 chars
  const [conditions, setConditions] = useState(` `); // 1 char
  const [isHiddenInputs, setIsHiddenInputs] = useState(false);
  // OBJECT POSITION
  const [objectSearchTerm, setObjectSearchTerm] = useState(``); // 15 chars
  const [object, setObject] = useState(``); // 15 chars
  const [objectSearchResults, setObjectSearchResults] = useState([]); // renders a list under input field
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
  const [showBehaviorOptions, setShowBehaviorOptions] = useState(false); // Utilized to render behavior options when user selected an optical behavior
  const [visualMagnitudeSign, setVisualMagnitudeSign] = useState(` `); // 1 char
  const [visualMagnitude, setVisualMagnitude] = useState(`   `); // 3 chars
  const [visualMagnitudeUncertainty, setVisualMagnitudeUncertainty] = useState(
    `  `
  ); // 2 chars
  const [flashPeriod, setFlashPeriod] = useState(`      `); // 6 chars
  const [remarks, setRemarks] = useState(``);
  // IOD STRING
  const [IOD, setIOD] = useState(``);
  // VALIDATION ERROR MESSAGING
  const numRegEx = /^\d+$/; // checks if string only contains numbers
  const [isStationError, setIsStationError] = useState(false);
  const [isDateFormatError, setIsDateFormatError] = useState(false);
  const [isTimeFormatError, setIsTimeFormatError] = useState(false);
  const [isDateAndTimeError, setIsDateAndTimeError] = useState(false);
  const [isObjectError, setIsObjectError] = useState(false);
  const [
    isRightAscensionOrAzimuthError,
    setIsRightAscensionOrAzimuthError
  ] = useState(false);
  const [
    isDeclinationOrElevationError,
    setIsDeclinationOrElevationError
  ] = useState(false);
  // SUBMISSION UI STATES
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // server provides success and error messages upon submissions which are displayed in UI
  const [successCount, setSuccessCount] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const { jwt } = useAuthState();
  // set to true if attempt to submit fails
  const [isError, setIsError] = useState(false);

  // Builds the IOD string
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

  // return all the 'default values'
  const resetFormVariables = () => {
    setStation(``); // 4 chars
    setCloudedOut(false);
    setObserverUnavailable(false);
    setDate(``); // 8 chars
    setTime(`         `); // 9 chars
    setTimeUncertainty(`18`); // 2 chars
    setConditions(` `); // 1 char
    setObject(``); // 15 chars
    setTimeUncertainty(`18`);
    setAngleFormatCode(`2`);
    setEpochCode(`5`);
    setDeclinationOrElevationSign(`+`);
    setPositionalUncertainty(`18`);
    setIsHiddenInputs(false);
    setObjectSearchTerm(``);
    setObject(``);
    setObjectSearchResults([]);
    setAngleFormatCode(`2`);
    setEpochCode(`5`);
    setRightAscensionOrAzimuth(`       `); // 7 chars
    setDeclinationOrElevationSign(`+`);
    setDeclinationOrElevation(`      `); // 6 chars
    setPositionalUncertainty(`18`); // 2 chars
    setBehavior(` `); // 1 char
    setShowBehaviorOptions(false);
    setVisualMagnitudeSign(` `); // 1 char
    setVisualMagnitude(`   `);
    setVisualMagnitudeUncertainty(`  `); // 2 chars
    setFlashPeriod(`      `); // 6 chars
    setRemarks(``);
  };

  // Updates IOD when user toggles `Clouded Out` or `Observer Unavailable`
  useEffect(() => {
    if (conditions === "C" || conditions === "O") {
      setIsHiddenInputs(true); // clear N/A inputs
      setObject(`               `); // 15 chars
      setTimeUncertainty(`  `); // 2 chars
      setAngleFormatCode(` `); // 1 char
      setEpochCode(` `); // 1 char
      setDeclinationOrElevation();
      setRightAscensionOrAzimuth(`       `); // 7 chars
      setDeclinationOrElevationSign(` `); // 1 char
      setDeclinationOrElevation(`      `); // 6 chars
      setPositionalUncertainty(`  `); // 2 chars
      setVisualMagnitudeSign(` `); // 1 char
    } else {
      setIsHiddenInputs(false); // show relevant inputs when 'C' or 'O' is toggled off
    }
  }, [conditions]);

  // Validates if observation date submitted is before current date
  useEffect(() => {
    if (date.length === 8) {
      const todayDate = new Date(); // get todays date
      const todayTimeStamp = todayDate.getTime();
      // convert date and time inputs to format readable by Date object
      // uses midnight for time if user hasn't added a time value
      const observationDateTime = new Date(
        `${[date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)].join("-")} ${
          time === `         `
            ? `00:00:00`
            : [time.slice(0, 2), time.slice(2, 4), time.slice(4, 6)]
                .join(":")
                .substring(0, 8)
        }`
      );
      // TODO - add additional check to reject observations from too long ago
      const observationTimeStamp = observationDateTime.getTime();

      if (observationTimeStamp > todayTimeStamp) {
        setIsDateAndTimeError(true); // date of observation is after current time
      } else {
        setIsDateAndTimeError(false); // date of observation is before current time
      }
    }
  }, [date, time]);

  // Validates formats of form fields
  useEffect(() => {
    // station is mandatory, must be 4 chars long, all numbers
    if (station.length !== 4 || !numRegEx.test(station)) {
      setIsStationError(true);
    } else {
      setIsStationError(false);
    }

    // date is mandatory, must be 8 chars long, all numbers
    if (date.length !== 8 || !numRegEx.test(date)) {
      setIsDateFormatError(true);
    } else {
      setIsDateFormatError(false);
    }

    // if time contains non-whitespace chars or is not 9 chars long
    if (/\S/.test(time) || time.length !== 9) {
      // time must be 9 chars, all numbers
      if (time.length !== 9 || !numRegEx.test(time)) {
        setIsTimeFormatError(true);
      } else {
        setIsTimeFormatError(false);
      }
    } else {
      setIsTimeFormatError(false);
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

  // Search for objects in the database
  useEffect(() => {
    const fetchObject = async () => {
      try {
        const response = await axios(
          `${API_ROOT}/findObject?objectName=${objectSearchTerm}`
        );
        setObjectSearchResults(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    // start searching when user has entered more than 2 chars
    if (objectSearchTerm.length > 2) {
      fetchObject();
    }
  }, [objectSearchTerm]);

  // Render results of search under the input field
  const renderObjectSearchResults = () => {
    // need to inlude the norad number in this formatting as there is norad numbers less than 5 digits in length
    const formatObject = ({ norad, cospar }) => {
      let formattedNorad;

      if (norad.toString().length !== 5) {
        // append leading zeros to norad numbers less than 5 chars in length
        const leadingZeros = "0".repeat(5 - norad.toString().length);
        formattedNorad = `${leadingZeros}${norad}`;
      } else {
        // use norad if 5 chars in length
        formattedNorad = norad;
      }

      const formattedCospar = `${cospar
        .substring(2)
        .replace(/-/g, ` `)}${" ".repeat(11 - cospar.length)}`;

      return `${formattedNorad} ${formattedCospar}`;
    };

    return objectSearchResults.map(obj => {
      return (
        <span
          key={obj.norad_number}
          className="object-position__search-result"
          onClick={() => {
            setObject(
              formatObject({
                norad: obj.norad_number,
                cospar: obj.cospar_id
              })
            );
            setObjectSearchTerm(``);
            setObjectSearchResults([]);
          }}
        >{`${obj.name} = ${formatObject({
          norad: obj.norad_number,
          cospar: obj.cospar_id
        })}`}</span>
      );
    });
  };

  // Show behavior options when user chooses an Optical Behavior
  useEffect(() => {
    if (behavior !== ` `) {
      setShowBehaviorOptions(true);
      setVisualMagnitudeSign("+");
      setVisualMagnitudeUncertainty("10");
    } else {
      setShowBehaviorOptions(false);
      setVisualMagnitudeSign(` `); // ` char
      setVisualMagnitudeUncertainty(`  `); // 2 chars
    }
  }, [behavior]);

  // Only show submit button in full color when no errors present in form
  useEffect(() => {
    if (
      !isStationError &&
      !isDateFormatError &&
      !isTimeFormatError &&
      !isDateAndTimeError &&
      !isObjectError &&
      !isRightAscensionOrAzimuthError &&
      !isDeclinationOrElevationError
    ) {
      setShowSubmitButton(true);
    } else {
      setShowSubmitButton(false);
    }
  }, [
    isStationError,
    isDateFormatError,
    isTimeFormatError,
    isDateAndTimeError,
    isObjectError,
    isRightAscensionOrAzimuthError,
    isDeclinationOrElevationError
  ]);

  // submit the IOD
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
      !isDateFormatError &&
      !isTimeFormatError &&
      !isDateAndTimeError &&
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
          ReactGA.event({
            category: "Submissions",
            action: "User clicked submit on SingleObservationForm",
            label: "Submission Success"
          });
          resetFormVariables();
        } else if (result.data.error_messages.length !== 0) {
          setErrorMessages(result.data.error_messages);
          ReactGA.event({
            category: "Submissions",
            action: "User clicked submit on SingleObservationForm",
            label: "Submission Failure"
          });
        }
      } catch (error) {
        setIsError(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      {jwt === "none" ? (
        <p className="app__error-message">
          Please log in to submit your observations
        </p>
      ) : null}
      <form
        className="single-observation-form"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        {/* STATION CONDITIONS */}
        <section className="single-observation-form__section">
          <h2 className="single-observation-form__heading">
            STATION CONDITIONS
          </h2>
          <div className="station-conditions__location-checkbox-wrapper">
            <div className="station-conditions__location-wrapper">
              <label>
                Station Location{` `}
                <QuestionMarkToolTip
                  toolTipText={toolTipCopy.station_location}
                />
                {` `}
                Don't have a station number? Submit location{" "}
                <a
                  className="app__link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.google.com/forms/d/1SoQivnx_dZPku0eZKlPXnNwggH2XDtb-e4GpAMSvYE8/viewform?edit_requested=true"
                >
                  here
                </a>
              </label>
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
                style={isStationError ? { border: "2px solid #FC7756" } : null}
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
                    if (!cloudedOut) {
                      setCloudedOut(true);
                      setObserverUnavailable(false);
                      setConditions("C");
                    } else if (cloudedOut) {
                      setCloudedOut(false);
                      setConditions(` `);
                    }
                  }}
                ></input>
                Clouded Out{" "}
                <QuestionMarkToolTip toolTipText={toolTipCopy.clouded_out} />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={observerUnavailable}
                  onChange={() => {
                    if (!observerUnavailable) {
                      setObserverUnavailable(true);
                      setCloudedOut(false);
                      setConditions("O");
                    } else if (observerUnavailable) {
                      setObserverUnavailable(false);
                      setConditions(` `);
                    }
                  }}
                ></input>
                Observer Unavailable
                <QuestionMarkToolTip
                  toolTipText={toolTipCopy.observer_unavailable}
                />
              </label>
            </div>
          </div>
          {/* Date, time and time uncertainty */}
          <div className="station-conditions__date-time-uncertainty-wrapper">
            <div className="station-conditions__date-time-wrapper">
              <label>
                Time of observation{" "}
                <QuestionMarkToolTip
                  toolTipText={toolTipCopy.time_of_observation}
                />
              </label>
              <div className="station-conditions__date-time-wrapper-inner">
                <div className="station-conditions__date">
                  <input
                    required
                    className="app__form__input"
                    type="number"
                    placeholder="YYYYMMDD"
                    value={date}
                    onChange={event => {
                      // limit input to 8 chars
                      if (event.target.value.length < 9) {
                        setDate(event.target.value);
                      }
                    }}
                    style={
                      isDateFormatError ? { border: "2px solid #FC7756" } : null
                    }
                  />
                </div>
                <div className="station-conditions__time">
                  <input
                    type="number"
                    className="app__form__input"
                    onChange={event => {
                      // limit input to 9 chars
                      if (event.target.value.length < 10) {
                        setTime(event.target.value);
                      }
                    }}
                    value={time}
                    placeholder="HHMMSSsss"
                    style={
                      isTimeFormatError ? { border: "2px solid #FC7756" } : null
                    }
                  />
                </div>
              </div>
              {isDateFormatError ? (
                <p className="app__error-message">
                  Date must be a numerical value of 8 characters in the
                  following format: YYYYMMDD
                </p>
              ) : null}
              {isTimeFormatError ? (
                <p className="app__error-message">
                  Time must be a numerical value of 9 characters representing
                  UTC time in the following format: HHMMSSsss
                </p>
              ) : null}
              {isDateAndTimeError ? (
                <p className="app__error-message">
                  You have entered a date/time for your observation that is in
                  the future
                </p>
              ) : null}
            </div>
            {isHiddenInputs ? null : (
              <div className="station-conditions__time-uncertainty-wrapper">
                <label>
                  Time uncertainty{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.time_uncertainty}
                  />
                </label>
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
            )}
          </div>
          {/* Conditions */}
          {isHiddenInputs ? null : (
            <div className="station-conditions__conditions-wrapper">
              <label>Sky Conditions (optional) </label>
              <div className="station-conditions__conditions-buttons-wrapper">
                <div>
                  <img
                    src={ConditionExcellent}
                    alt="excellent conditions"
                    className={
                      conditions === "E"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("E")}
                  ></img>
                  Excellent{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_excellent}
                  />
                </div>
                <div>
                  <img
                    src={ConditionGood}
                    alt="good conditions"
                    className={
                      conditions === "G"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("G")}
                  ></img>
                  Good{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_good}
                  />
                </div>

                <div>
                  <img
                    src={ConditionFair}
                    alt="fair conditions"
                    className={
                      conditions === "F"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("F")}
                  ></img>
                  Fair{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_fair}
                  />
                </div>
                <div>
                  <img
                    src={ConditionPoor}
                    alt="poor conditions"
                    className={
                      conditions === "P"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("P")}
                  ></img>
                  Poor{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_poor}
                  />
                </div>

                <div>
                  <img
                    src={ConditionBad}
                    alt="bad conditions"
                    className={
                      conditions === "B"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("B")}
                  ></img>
                  Bad{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_bad}
                  />
                </div>
                <div>
                  <img
                    src={ConditionTerrible}
                    alt="terrible conditions"
                    className={
                      conditions === "T"
                        ? "station-conditions__button station-conditions__button--highlight"
                        : "station-conditions__button"
                    }
                    onClick={() => setConditions("T")}
                  ></img>
                  Terrible{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.sky_conditions_terrible}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* OBJECT POSITION */}
        {isHiddenInputs ? null : (
          <section className="single-observation-form__section">
            <h2 className="single-observation-form__heading">
              OBJECT POSITION
            </h2>
            <div className="object-position__object-wrapper">
              <label>Object</label>
              {/* Show object name if they have chosen one, search field if they haven't */}
              {object ? (
                <div>
                  <span className="object-position__chosen-object">
                    {object}
                  </span>
                  <span
                    className="object-position__x-button"
                    onClick={() => setObject(``)}
                  >
                    X
                  </span>
                </div>
              ) : (
                <input
                  type="text"
                  required
                  className="app__form__input object-position__object-input"
                  onChange={event => {
                    // limit input to 15 chars
                    if (event.target.value.length < 16) {
                      setObjectSearchTerm(event.target.value);
                    }
                  }}
                  value={object ? object : objectSearchTerm}
                  placeholder="Search objects by Name or Norad/International Designation Number"
                  style={isObjectError ? { border: "2px solid #FC7756" } : null}
                />
              )}
              {isObjectError ? (
                <p className="app__error-message">
                  Enter a valid Object or International Designation number then
                  select the Object you are submitting an observation for
                </p>
              ) : null}
              {objectSearchResults.length !== 0 ? (
                <div className="object-position__search-results-wrapper">
                  {renderObjectSearchResults()}
                </div>
              ) : null}
            </div>

            <div className="object-position__angle-epoch-wrapper">
              <div className="object-position__angle-wrapper">
                <label>
                  Position format{" "}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.position_format}
                  />
                </label>
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
                <label>
                  Epoch code{" "}
                  <QuestionMarkToolTip toolTipText={toolTipCopy.epoch_code} />
                </label>
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
                  <option value="0">blank = of date</option>
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
                    {angleFormatCode < 4 || angleFormatCode > 6 ? (
                      <Fragment>
                        Right ascension{" "}
                        <QuestionMarkToolTip
                          toolTipText={toolTipCopy.right_ascension}
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        Azimuth{" "}
                        <QuestionMarkToolTip
                          toolTipText={toolTipCopy.azimuth}
                        />
                      </Fragment>
                    )}
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
                      Enter a valid numerical value for Right Ascension or
                      Azimuth referencing the position format you chose above
                    </p>
                  ) : null}
                </div>
                <div className="object-position__declination-elevation-wrapper">
                  <label>
                    {angleFormatCode < 4 || angleFormatCode > 6 ? (
                      <Fragment>
                        Declination{" "}
                        <QuestionMarkToolTip
                          toolTipText={toolTipCopy.declination}
                        />
                      </Fragment>
                    ) : (
                      <Fragment>
                        Elevation{" "}
                        <QuestionMarkToolTip
                          toolTipText={toolTipCopy.elevation}
                        />
                      </Fragment>
                    )}
                  </label>
                  <div className="object-position__declination-elevation-wrapper-inner">
                    <select
                      className="app__form__input app__form__input--sign object-position__declination-elevation-sign"
                      onChange={event =>
                        setDeclinationOrElevationSign(event.target.value)
                      }
                      value={declinationOrElevationSign}
                    >
                      <option value="+">+</option>
                      <option value="-">-</option>
                    </select>
                    <input
                      className="app__form__input object-position__declination-elevation"
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
                  </div>
                  {isDeclinationOrElevationError ? (
                    <p className="app__error-message">
                      Enter a valid numerical value for Declination or Elevation
                      referencing the position format you chose above
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="object-position__position-uncertainty-wrapper">
                <label>
                  Positional uncertainty{` `}
                  <QuestionMarkToolTip
                    toolTipText={toolTipCopy.position_uncertainty}
                  />
                </label>
                <select
                  value={positionalUncertainty}
                  onChange={event =>
                    setPositionalUncertainty(event.target.value)
                  }
                  className="app__form__input"
                >
                  <option value="17">0.1 seconds</option>
                  <option value="97">0.9 seconds</option>
                  <option value="18">1.0 seconds</option>
                  <option value="28">2.0 seconds</option>
                  <option value="58">5.0 seconds</option>
                  <option value="19">10.0 seconds</option>
                </select>
              </div>
            </div>
          </section>
        )}

        {/* BEHAVIOR */}
        {isHiddenInputs ? null : (
          <section className="single-observation-form__section">
            <h2 className="single-observation-form__heading">
              BEHAVIOR (OPTIONAL)
            </h2>
            <div className="object-behavior__visibility-wrapper">
              <label>
                Optical Behavior{" "}
                <QuestionMarkToolTip toolTipText={toolTipCopy.visibility} />
              </label>
              <select
                className="object-behavior__behavior-select app__form__input"
                onChange={event => setBehavior(event.target.value)}
                value={behavior}
              >
                <option value={` `}>Not specified</option>
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
                  end time for averaging several flash cycles. Time interval
                  from last "B" report divided by flash period reported on this
                  line gives number of flashes that occurred since "B".
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
            {showBehaviorOptions ? (
              <div className="object-behavior__brightness-brightness-uncertainty-wrapper">
                <div className="object-behavior__brightness-wrapper">
                  <label>
                    Brightness{" "}
                    <QuestionMarkToolTip toolTipText={toolTipCopy.brightness} />
                  </label>
                  <div className="object-behavior__brightness">
                    <select
                      className="app__form__input app__form__input--sign"
                      onChange={event =>
                        setVisualMagnitudeSign(event.target.value)
                      }
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
                      <option value={`   `} disabled hidden>
                        Magnitude
                      </option>
                      <option value="010">1</option>
                      <option value="020">2</option>
                      <option value="030">3</option>
                      <option value="040">4</option>
                      <option value="050">5</option>
                      <option value="060">6</option>
                      <option value="070">7</option>
                      <option value="080">8</option>
                      <option value="090">9</option>
                    </select>
                  </div>
                </div>
                <div className="object-behavior__brightness-uncertainty-wrapper">
                  <label>
                    Brightness uncertainty{" "}
                    <QuestionMarkToolTip
                      toolTipText={toolTipCopy.brightness_uncertainty}
                    />
                  </label>
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
                    <option value={`06`}>0.6</option>
                    <option value={`07`}>0.7</option>
                    <option value={`08`}>0.8</option>
                    <option value={`09`}>0.9</option>
                    <option value={`10`}>1</option>
                    <option value={`11`}>1.1</option>
                    <option value={`12`}>1.2</option>
                    <option value={`13`}>1.3</option>
                    <option value={`14`}>1.4</option>
                    <option value={`15`}>1.5</option>
                  </select>
                </div>
                <div className="object-behavior__flash-period-wrapper">
                  <label>
                    Flash Period{" "}
                    <QuestionMarkToolTip
                      toolTipText={toolTipCopy.flash_period}
                    />
                  </label>
                  <select
                    className="object-behavior__flash-period-select app__form__input"
                    onChange={event => setFlashPeriod(event.target.value)}
                    value={flashPeriod}
                  >
                    <option value={`      `}>Not specified</option>
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
            ) : null}

            <div className="object-behavior__remarks-wrapper">
              <label>Remarks</label>
              <textarea
                placeholder="Brief comments placed here will be recorded with the observation record."
                value={remarks}
                onChange={event => setRemarks(event.target.value)}
                className="app__form__input"
                maxLength={140}
              ></textarea>
              {remarks ? (
                <p
                  style={
                    remarks.length > 130
                      ? { color: "red", textAlign: "right" }
                      : { textAlign: "right" }
                  }
                >
                  {140 - remarks.length}
                </p>
              ) : null}
            </div>
          </section>
        )}

        <div className="iod-wrapper">
          <label>
            IOD <QuestionMarkToolTip toolTipText={toolTipCopy.iod} />
          </label>
          <div className="iod-wrapper-inner">
            <p
              className="iod"
              style={
                IOD.length === 80
                  ? { color: "white", whiteSpace: "pre" }
                  : { color: "#FC7756", whiteSpace: "pre" }
              }
            >
              {IOD}
            </p>
          </div>
        </div>

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
          <Fragment>
            <div className="single-observation-form__button-wrapper">
              <span
                className="submit__single-observation-nav-button"
                onClick={() => setShowSingleObservationForm(false)}
              >
                Or enter pre-formatted data
              </span>

              {jwt === "none" ? null : (
                <button
                  className="submit__submit-button"
                  style={
                    showSubmitButton ? { opacity: "1" } : { opacity: "0.5" }
                  }
                >
                  SUBMIT
                </button>
              )}
            </div>
            {jwt === "none" ? null : (
              <p className="submit__submit-warning">
                Please keep in mind that this data will be automatically
                recorded into TruSat's catalog of orbital positions, and
                factored into orbital predictions for this object.
              </p>
            )}
          </Fragment>
        )}
      </form>
    </Fragment>
  );
}
