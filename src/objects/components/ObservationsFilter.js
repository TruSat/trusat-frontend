import React from "react";
import DownloadObjectTleButton from "./DownloadObjectTleButton";
import { useObjectsState, useObjectsDispatch } from "../objects-context";

export default function ObservationsFilter({ noradNumber }) {
  const { observationFilter } = useObjectsState;
  const objectsDispatch = useObjectsDispatch();

  return (
    <section className="object-observations__nav">
      <div className="object-observations__nav-link-wrapper">
        <div>
          <span
            className="object-observations__nav-link"
            onClick={() =>
              objectsDispatch({
                type: "SET_OBSERVATION_FILTER",
                payload: "influence"
              })
            }
          >
            Influence
          </span>
        </div>

        <div>
          <span
            className="object-observations__nav-link"
            onClick={() =>
              objectsDispatch({
                type: "SET_OBSERVATION_FILTER",
                payload: "history"
              })
            }
          >
            History
          </span>
        </div>

        <div>
          <span
            className="object-observations__nav-link"
            onClick={() =>
              objectsDispatch({
                type: "SET_OBSERVATION_FILTER",
                payload: "mySightings"
              })
            }
          >
            My sightings
          </span>
        </div>
      </div>

      <DownloadObjectTleButton noradNumber={noradNumber} />
    </section>
  );
}
