import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import { useCatalogState, useCatalogDispatch } from "../catalog-context";

const options = [
  { value: "priorities", label: "PRIORITIES" },
  { value: "undisclosed", label: "UNDISCLOSED" },
  { value: "debris", label: "DEBRIS" },
  { value: "latest", label: "LATEST" },
  { value: "all", label: "ALL" }
];

function NavDropdown({ match, history, setRange }) {
  const [selectedOption, setSelectedOption] = useState("");
  const catalogFilter = match.params.catalogFilter;
  // const catalogDispatch = useCatalogDispatch();

  useEffect(() => {
    options
      .filter(option => option.value === catalogFilter)
      .map(option => setSelectedOption(option));
  }, [catalogFilter, setSelectedOption]);

  const handleChange = newSelectedOption => {
    setRange({ start: 0, end: 10 });

    // catalogDispatch({
    //   type: "SET_CATALOG_FILTER",
    //   payload: newSelectedOption.value
    // });

    history.push(`/catalog/${newSelectedOption.value}`);
  };

  const colorStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #ffbd3c"
    }),

    option: (provided, state) => ({
      ...provided,
      background: "#1f1f1f",
      borderBottom: "1px solid #4f4f4f",
      color: state.isSelected ? "#ffbd3c" : "white",
      padding: "1em"
    })
  };

  return (
    <div className="catalog-nav-dropdown__wrapper">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={colorStyles}
      />
    </div>
  );
}

export default withRouter(NavDropdown);
