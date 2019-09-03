import React from "react";

export default function FilterDescription({ catalogFilter }) {
  console.log(catalogFilter);

  const filterDescriptions = {
    priorities:
      "This is a hitlist of satellites most in need of amateur observations.Higher priority sats include recent launches, changes in orbit, orlesser known orbits",
    undisclosed:
      "These are objects not found in most public catalogs... mike needs to complete this copy",
    debris: "These are not full objects... mike needs to complete this copy",
    latest: "Mike needs to complete this copy",
    all: "Mike needs to complete this copy"
  };

  return (
    <p className="catalog__filter-description">
      {filterDescriptions.catalogFilter}
    </p>
  );
}
