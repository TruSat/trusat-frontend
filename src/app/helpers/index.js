import React from "react";
import ReactTooltip from "react-tooltip";

export const renderFlag = code => {
  if (!code) {
    return <p className="table__small-text">unknown</p>;
  } else if (!code.includes("/")) {
    return (
      <img
        className="catalog-table__small-text"
        src={`https://www.countryflags.io/${code}/flat/16.png`}
        alt={`${code} flag `}
      />
    );
  } else if (code.includes("/")) {
    const sharedCodes = code.split("/");

    return sharedCodes.map(sharedCode => {
      return (
        <img
          key={sharedCode}
          className="catalog-table__small-text"
          src={`https://www.countryflags.io/${sharedCode}/flat/16.png`}
          alt={`${sharedCode} flag `}
        />
      );
    });
  }
};

export const shortenAddressToolTip = address => {
  return (
    <div data-tip={address}>
      {`${address.substring(0, 5)}...`}
      <ReactTooltip type="info" />
    </div>
  );
};

export const toolTip = (displayText, toolTipText) => {
  return (
    <div className="app__tool-tip-wrapper" data-tip={toolTipText}>
      {displayText}
      <ReactTooltip type="info" />
    </div>
  );
};

export const toolTipCopy = {
  object: "copy about object",
  origin: "copy about origin",
  purpose: "copy about purpose",
  confidence: "copy about confidence",
  last_seen_by: "copy about last seen by"
};
