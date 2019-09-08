import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import { AuthProvider } from "../src/auth/auth-context";
import { UserProvider } from "../src/user/user-context";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
