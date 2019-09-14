import React from "react";

import { useCatalogState } from "../catalog-context";

export default function FilterDescription() {
  const { catalogFilter } = useCatalogState();

  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "This is a hitlist of satellites most in need of amateur observations. Higher priority sats include recent launches, changes in orbit, or lesser known orbits."
    },
    {
      filter: "undisclosed",
      copy: "The classified satellites of the TruSat catalog."
    },
    {
      filter: "debris",
      copy:
        "Old satellites, spent rocket stages, and the fragments from their disintegration and collisions."
    },
    {
      filter: "latest",
      copy: "The most recently tracked objects in the catalog."
    },
    { filter: "all", copy: "All objects of the TruSat catalog." }
  ];

  return filterDescriptions
    .filter(description => description.filter === catalogFilter)
    .map(description => (
      <p
        key={`${description.filter} copy`}
        className="catalog__filter-description"
      >
        {description.copy}
      </p>
    ));
}
