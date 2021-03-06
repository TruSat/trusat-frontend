import React from "react";
import DownloadObjectTleButton from "../components/DownloadObjectTleButton";
import { useObjectsState } from "../objects-context";

export default function HowToSeeIt() {
  const { objectInfo, noradNumber } = useObjectsState();

  return (
    <div className="object-info__how-to-wrapper">
      <h2 className="object-info__section-title">TRACK THIS SAT</h2>
      <p className="object-info__link-text">
        <a
          className="object-info__link-text app__link--lowlight"
          href="https://learn.trusat.org/docs/guide"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn how to track satellites
        </a>
      </p>
      <p className="object-info__link-text">
        See when and where to spot this at{" "}
        {objectInfo.heavens_above_url ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={objectInfo.heavens_above_url}
            className="app__link--lowlight"
          >
            Heavens Above
          </a>
        ) : null}{" "}
        or{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.calsky.com/csephem.cgi?&object=Satellite&number=${noradNumber}`}
          className="app__link--lowlight"
        >
          Calsky
        </a>
      </p>
      <DownloadObjectTleButton />
    </div>
  );
}
