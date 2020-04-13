import React from "react";

export default function FilterDescription({
  catalogFilter,
  celestrakCategories,
  objectCount,
}) {
  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "satellites most in need of monitoring by the space sustainability community. This list is auto-generated. Open a satellite for details on when and where to see it.",
    },
    {
      filter: "undisclosed",
      copy: "satellites that do not appear in public space object catalogs.",
    },
    {
      filter: "debris",
      copy:
        "Old satellites, spent rocket stages, and fragments from their disintegration and collisions.",
    },
    {
      filter: "latest",
      copy:
        "most recently launched objects in the catalog that need fresh observations.",
    },
    { filter: "all", copy: "objects of the TruSat catalog." },
  ];

  // Will return an array with 1 object if a featured filter was chosen
  const featuredDescription = filterDescriptions.filter(
    (description) => description.filter === catalogFilter
  );

  const getCelestrakCategoryName = () => {
    if (celestrakCategories) {
      // check group headers for a match first
      // returns an array containing one object if a match is found
      const groupHeaderMatch = celestrakCategories.filter(
        (group) => group.groupHeader.path === catalogFilter
      );
      // return the "title" of the groupHeader if the paths (groupHeader and catalogFilter) match
      if (groupHeaderMatch.length !== 0) {
        return `${groupHeaderMatch[0].groupHeader.title} (${catalogFilter})`;
      } else {
        const groupCategoryMatch = celestrakCategories.map((group) =>
          group.groupCategories.filter(
            (groupCat) => groupCat.path === catalogFilter
          )
        );

        if (groupCategoryMatch.length !== 0) {
          // "flat" reduce the array of arrays into a single array containing 1 object - the group category match
          return `${groupCategoryMatch.flat(1)[0].title} (${catalogFilter})`;
        }
      }
    }
  };

  // if a NavBar "featured" filter was chosen
  return featuredDescription.length === 1 ? (
    // return detailed description of featured filter
    <p
      key={`${featuredDescription[0].filter} copy`}
      className="catalog__filter-description"
    >
      {objectCount !== 0
        ? `The ${objectCount} ${featuredDescription[0].copy}`
        : null}
    </p>
  ) : (
    // otherwise return generic description of celestrak category filter found in "more" dropdown
    <p key={`${catalogFilter} copy`} className="catalog__filter-description">
      {objectCount !== 0
        ? `All ${objectCount} objects classified as ${getCelestrakCategoryName()} in the TruSat Catalog`
        : `All objects classified as ${getCelestrakCategoryName()} in the TruSat Catalog`}
    </p>
  );
}
