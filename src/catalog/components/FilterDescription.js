import React, { Fragment } from "react";

export default function FilterDescription({
  catalogFilter,
  celestrakCategories
}) {
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

  console.log(celestrakCategories);

  const getCelestrakCategoryName = () => {
    if (celestrakCategories) {
      // check group headers for a match first
      // returns an array containing one object if a match is found
      const groupHeaderMatch = celestrakCategories.filter(
        group => group.groupHeader.path === catalogFilter
      );
      // return the "title" of the group header if the paths (url and API) match
      if (groupHeaderMatch.length !== 0) {
        return groupHeaderMatch[0].groupHeader.title;
      } else {
        return catalogFilter;
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
      {featuredDescription[0].copy}
    </p>
  ) : (
    // otherwise return generic description of celestrak category filter found in "more" dropdown
    <p key={`${catalogFilter} copy`} className="catalog__filter-description">
      All the objects classified as {getCelestrakCategoryName()} in the TruSat
      Catalog
    </p>
  );
}
