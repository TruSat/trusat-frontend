import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";

const options = [
  { value: "priorities", label: "PRIORITIES" },
  { value: "latest", label: "LAUNCHES" },
  { value: "undisclosed", label: "UNDISCLOSED" },
  { value: "debris", label: "DEBRIS" },
  { value: "all", label: "ALL" }
];

function NavDropdown({ catalogFilter, history, setRange }) {
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    options
      .filter(option => option.value === catalogFilter)
      .map(option => setSelectedOption(option));
  }, [catalogFilter, setSelectedOption]);

  const handleChange = newSelectedOption => {
    setRange({ start: 0, end: 10 });

    history.push(`/catalog/${newSelectedOption.value}`);
  };

  const colorStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid white",
      fontSize: "20px",
      fontWeight: "bold",
      padding: "0.25em"
    }),

    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      marginTop: "0"
    }),

    singleValue: (provided, state) => ({
      color: "white",
    }),

    option: (provided, state) => ({
      ...provided,
      background: "#043053",
      borderBottom: "1px solid #4f4f4f",
      color: state.isSelected ? "#FC7756" : "white",
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
