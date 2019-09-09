import React from "react";
import DownloadObjectTleButton from "./DownloadObjectTleButton";
import { useObjectsState, useObjectsDispatch } from "../objects-context";

export default function ObservationsFilter() {
  const { observationFilter } = useObjectsState();
  const objectsDispatch = useObjectsDispatch();

  return (
    <section className="object-observations__nav">
      <div className="object-observations__nav-links-wrapper">
        <div
          className={
            observationFilter === "influence"
              ? "object-observations__nav-link-wrapper--highlight"
              : "object-observations__nav-link-wrapper--lowlight"
          }
        >
          <span
            className={
              observationFilter === "influence"
                ? "object-observations__nav-link--highlight"
                : "object-observations__nav-link--lowlight"
            }
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

        <div
          className={
            observationFilter === "history"
              ? "object-observations__nav-link-wrapper--highlight"
              : "object-observations__nav-link-wrapper--lowlight"
          }
        >
          <span
            className={
              observationFilter === "history"
                ? "object-observations__nav-link--highlight"
                : "object-observations__nav-link--lowlight"
            }
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

        <div
          className={
            observationFilter === "mySightings"
              ? "object-observations__nav-link-wrapper--highlight"
              : "object-observations__nav-link-wrapper--lowlight"
          }
        >
          <span
            className={
              observationFilter === "mySightings"
                ? "object-observations__nav-link--highlight"
                : "object-observations__nav-link--lowlight"
            }
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

      <DownloadObjectTleButton />
    </section>
  );
}
