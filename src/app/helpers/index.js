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

export const shortenAddress = address => {
  return (
    <div data-tip={address}>
      {`${address.substring(0, 5)}...`}
      <ReactTooltip type="info" />
    </div>
  );
};
