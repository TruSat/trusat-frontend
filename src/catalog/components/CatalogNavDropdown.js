import React, { Fragment, useState, useEffect } from "react";
import { useTrusatGetApi } from "../../app/app-helpers";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import Spinner from "../../app/components/Spinner";

function NavDropdown({ catalogFilter, history, setRange, setDataStart }) {
  const [options, setOptions] = useState([
    { value: "priorities", label: "PRIORITIES" },
    { value: "latest", label: "LAUNCHES" },
    { value: "undisclosed", label: "UNDISCLOSED" },
    { value: "debris", label: "DEBRIS" },
  ]);
  const [selectedOption, setSelectedOption] = useState("");

  const [{ data, isLoading, errorMessage }, doFetch] = useTrusatGetApi();

  useEffect(() => {
    doFetch("/catalog/list");

    // only run when data has come down from the api call
    if (data == true) {
      const celestrakCategories = [];
      // Adds all of the sub categories under Featured group header to the dropdown
      data.data
        .filter((cat) => cat.groupHeader.title === "Featured")
        .map((cat) =>
          cat.groupCategories.map((featCat) =>
            celestrakCategories.push({
              value: featCat.path,
              label: featCat.title.toUpperCase(),
            })
          )
        );
      // Adds all of the remaining groupHeaders to the dropdown
      data.data
        .filter((cat) => cat.groupHeader.title !== "Featured")
        .map((cat) =>
          celestrakCategories.push({
            value: cat.groupHeader.path,
            label: cat.groupHeader.title.toUpperCase(),
          })
        );
      // Merge the hardcoded options with those pulled from the api
      setOptions((options) => options.concat(celestrakCategories));
    }
  }, [data, doFetch]);

  // Handles case when user choses an option
  useEffect(() => {
    options
      .filter((option) => option.value === catalogFilter)
      .map((option) => setSelectedOption(option));
  }, [options, catalogFilter, setSelectedOption]);

  const handleChange = (newSelectedOption) => {
    setRange({ start: 0, end: 10 });
    setDataStart(0);

    history.push(`/catalog/${newSelectedOption.value}`);
  };

  const colorStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid white",
      fontSize: "20px",
      fontWeight: "bold",
      padding: "0.25em",
    }),

    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      marginTop: "0",
    }),

    singleValue: (provided, state) => ({
      color: "white",
    }),

    option: (provided, state) => ({
      ...provided,
      background: "#043053",
      borderBottom: "1px solid #4f4f4f",
      color: state.isSelected ? "#FC7756" : "white",
      padding: "1em",
    }),
  };

  return (
    <div className="catalog-nav-dropdown__wrapper">
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          {errorMessage ? (
            <p>Something went wrong... {errorMessage}</p>
          ) : (
            <Select
              value={selectedOption}
              onChange={handleChange}
              options={options}
              styles={colorStyles}
            />
          )}
        </Fragment>
      )}
    </div>
  );
}

export default withRouter(NavDropdown);
