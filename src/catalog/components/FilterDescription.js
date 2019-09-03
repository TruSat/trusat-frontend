import React from "react";

export default function FilterDescription({ catalogFilter }) {
  console.log(catalogFilter);

  const filterDescriptions = [
    {
      descriptionName: "priorities",
      descriptionCopy:
        "This is a hitlist of satellites most in need of amateur observations.Higher priority sats include recent launches, changes in orbit, orlesser known orbits"
    },
    { descriptionName: "undisclosed", descriptionCopy: "bla bla undisclosed." },
    { descriptionName: "debris", descriptionCopy: "bla bla debris." },
    { descriptionName: "latest", descriptionCopy: "bla bla latest" },
    { descriptionName: "all", descriptionCopy: "bla bla all." }
  ];

  return filterDescriptions.map(description => {
    if (description.descriptionName === catalogFilter) {
      return (
        <p className="catalog__filter-description">
          {description.descriptionCopy}
        </p>
      );
    }
  });
}
