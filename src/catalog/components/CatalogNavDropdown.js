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

function NavDropdown({ history, setRange }) {
  const [selectedOption, setSelectedOption] = useState("");
  const { catalogFilter } = useCatalogState();
  const catalogDispatch = useCatalogDispatch();

  useEffect(() => {
    options
      .filter(option => option.value === catalogFilter)
      .map(option => setSelectedOption(option));
  }, [catalogFilter, setSelectedOption]);

  const handleChange = newSelectedOption => {
    setRange({ start: 0, end: 10 });

    catalogDispatch({
      type: "SET_CATALOG_FILTER",
      payload: newSelectedOption.value
    });

    history.push(`/catalog/${newSelectedOption.value}`);
  };

  return (
    <div className="catalog-nav-dropdown__wrapper">
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "black",
            primary: "#ffbd3c"
          }
        })}
      />
    </div>
  );
}

export default withRouter(NavDropdown);
