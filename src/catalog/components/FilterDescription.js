import React from "react";

export default function FilterDescription({ catalogFilter }) {
  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "This is a hitlist of satellites most in need of amateur observations. Higher priority sats include recent launches, changes in orbit, or lesser known orbits."
    },
    {
      filter: "undisclosed",
      copy: "Classified satellites."
    },
    {
      filter: "debris",
      copy:
        "Old satellites, spent rocket stages, and the fragments from their disintegration and collisions."
    },
    {
      filter: "latest",
      copy: "The most recently launched objects."
    },
    { filter: "all", copy: "All objects in the TruSat catalog." }
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
