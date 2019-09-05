import React from "react";

export const renderFlag = code => {
  if (!code) {
    return <p className="table__small-text">?</p>;
  } else if (!code.includes("/")) {
    return (
      <img
        className="catalog-table__small-text"
        src={`https://www.countryflags.io/${code}/flat/32.png`}
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
          src={`https://www.countryflags.io/${sharedCode}/flat/32.png`}
          alt={`${sharedCode} flag `}
        />
      );
    });
  }
};
