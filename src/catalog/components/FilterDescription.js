import React from "react";

export default function FilterDescription({ catalogFilter }) {
  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "The satellites most in need of monitoring by the space sustainability community. This list is auto-generated. Open a satellite for details on when and where to see it."
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
      copy:
        "The most recently launched objects in the catalog need fresh observations."
    },
    { filter: "all", copy: "All objects of the TruSat catalog." }
  ];

  // Will return an array with 1 object if a featured filter was chosen
  const featuredDescription = filterDescriptions.filter(
    description => description.filter === catalogFilter
  );

  // if featured filter was chosen
  return featuredDescription.length === 1 ? (
    // return detailed description of featured filter
    <p
      key={`${featuredDescription[0].filter} copy`}
      className="catalog__filter-description"
    >
      {featuredDescription[0].copy}
    </p>
  ) : (
    // otherwise return generic description of regular filter found in "more" dropdown
    <p key={`${catalogFilter} copy`} className="catalog__filter-description">
      {`All the objects classified as "${catalogFilter}" in the TruSat Catalog`}
    </p>
  );
}
