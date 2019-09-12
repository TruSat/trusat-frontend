import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";

const options = [
  { value: "priorities", label: "Priorities" },
  { value: "undisclosed", label: "Undisclosed" },
  { value: "debris", label: "Debris" },
  { value: "latest", label: "Latest" },
  { value: "all", label: "All" }
];

function NavDropdown({ history, setRange }) {
  const [selectedOption, setSelectedOption] = useState("");
  const { catalogFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  console.log(`catalog filter is =`, catalogFilter);

  useEffect(() => {
    options.map(option => {
      if (option.value === catalogFilter) {
        setSelectedOption(option);
      }
    });
  }, [catalogFilter, setSelectedOption]);

  const handleChange = newSelectedOption => {
    setRange({ start: 0, end: 20 });

    catalogDispatch({
      type: "SET_CATALOG_FILTER",
      payload: newSelectedOption.value
    });

    history.push(`/catalog/${newSelectedOption.value}`);
  };

  return (
    <Select value={selectedOption} onChange={handleChange} options={options} />
  );
}

export default withRouter(NavDropdown);
