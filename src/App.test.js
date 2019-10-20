import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./auth/auth-context";
import { ProfileProvider } from "./profile/profile-context";
import { ObjectsProvider } from "./objects/objects-context";
import App from "./App";

describe("TruSat App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <AuthProvider>
        <ProfileProvider>
          <ObjectsProvider>
            <App />
          </ObjectsProvider>
        </ProfileProvider>
      </AuthProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
