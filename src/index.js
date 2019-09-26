import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import { AuthProvider } from "../src/auth/auth-context";

import { ProfileProvider } from "../src/profile/profile-context";
import { ObjectsProvider } from "../src/objects/objects-context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AuthProvider>
    <ProfileProvider>
      <ObjectsProvider>
        <App />
      </ObjectsProvider>
    </ProfileProvider>
  </AuthProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
