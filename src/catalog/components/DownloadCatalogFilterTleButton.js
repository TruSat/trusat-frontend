import React, { Fragment } from "react";
import { API_ROOT, axiosWithCache } from "../../app/app-helpers";
import ReactGA from "react-ga";

export default class DownloadCatalogFilterTleButton extends React.Component {
  state = {
    isLoading: false,
    errorMessage: "",
    textFile: null
  };

  linkRef = React.createRef();

  fetchData = async () => {
    this.setState({ errorMessage: "" });
    this.setState({ isLoading: true });

    try {
      const result = await axiosWithCache(
        `${API_ROOT}/tle/trusat_${this.props.catalogFilter}.txt`
      );

      // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
      if (this.state.textFile !== null) {
        window.URL.revokeObjectURL(this.state.textFile);
      }

      this.setState({ textFile: result.data });

      const href = window.URL.createObjectURL(
        new Blob([this.state.textFile], {
          type: "text/csv"
        })
      );
      this.linkRef.current.download = `trusat_${this.props.catalogFilter}.txt`;
      this.linkRef.current.href = href;
      this.linkRef.current.click();
      this.linkRef.current.href = "";
    } catch (error) {
      this.setState({ errorMessage: error.response.data });
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Fragment>
        <span
          className="catalog__button catalog__get-data-button"
          onClick={() => {
            ReactGA.event({
              category: "TLE usage",
              action: `Clicked download predictions button`,
              label: `Download TLEs from ${this.props.catalogFilter}`
            });
            this.fetchData();
          }}
        >
          {this.state.isLoading
            ? `...Loading`
            : `Download ${this.props.catalogFilter.charAt(0).toUpperCase() +
                this.props.catalogFilter.slice(1)} TLEs`}
        </span>

        {this.state.errorMessage ? (
          <p>Something went wrong... {this.state.errorMessage}</p>
        ) : null}

        <a className="app__hide" href="/#" ref={this.linkRef}>
          download
        </a>
      </Fragment>
    );
  }
}
