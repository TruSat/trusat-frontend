import React from "react";
import { API_ROOT } from "../../app/app-helpers";
import axios from "axios";

export default class DownloadObservations extends React.Component {
  state = {
    isLoading: false,
    errorMessage: "",
    csvData: []
  };

  linkRef = React.createRef();

  download = async () => {
    this.setState({ isLoading: true });

    try {
      const result = await axios.post(
        `${API_ROOT}/getAllObservations`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      // If replacing a previously generated file, revoke the object URL to avoid memory leaks.
      if (this.state.csvFile !== null) {
        window.URL.revokeObjectURL(this.state.csvData);
      }

      this.setState({
        csvData: result.data
      });

      const href = window.URL.createObjectURL(
        new Blob([this.state.csvData], {
          type: "text/csv"
        })
      );
      this.linkRef.current.download = "my_observations.csv";
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
      <div>
        <span className="download-observations" onClick={this.download}>
          {this.state.isLoading
            ? `...Loading`
            : `Download my ${this.props.observationCount} Observations`}
        </span>

        {this.state.errorMessage ? (
          <p>Something went wrong... {this.state.errorMessage}</p>
        ) : null}

        <a className="app__hide" ref={this.linkRef}>
          download
        </a>
      </div>
    );
  }
}
