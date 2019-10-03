import React from "react";
import { useObjectsState } from "../objects-context";

export default function FilterDescription() {
  const { observationFilter } = useObjectsState();

  const filterDescriptions = [
    {
      filter: "influence",
      copy:
        "The more accurate and timely your observations, the more weight they will carry in determining the latest orbit predictions."
    },
    {
      filter: "history",
      copy:
        "This is an open record of all observations in the catalog for this object."
    },
    {
      filter: "mySightings",
      copy: "All observations you’ve made for this object."
    }
  ];

  return filterDescriptions
    .filter(description => description.filter === observationFilter)
    .map(description => (
      <p
        key={`${description.filter} copy`}
        className="object-observation__filter-explainer app__hide-on-mobile"
      >
        {description.copy}
      </p>
    ));
}
