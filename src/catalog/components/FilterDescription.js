import React from "react";

export default function FilterDescription({ catalogFilter }) {
  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "This is an auto-generated list of satellites most in need of monitering by the space sustainability community. Click into the satellite for details on when and where to see it."
    },
    {
      filter: "undisclosed",
      copy: "These satellites do not appear in public space object catalogs."
    },
    {
      filter: "debris",
      copy:
        "Old satellites, spent rocket stages, and the fragments from their disintegration and collisions."
    },
    {
      filter: "latest",
      copy: "The most recently launched objects in the catalog need fresh observations."
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
