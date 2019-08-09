import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context";
import NavBar from "./app/components/NavBar";
import OrbitPredictions from "./views/OrbitPredictions";
import Community from "./views/Community";
import Observations from "./views/Observations";
import Submit from "./views/Submit";
import AccountSettings from "./views/AccountSettings";
import ObjectInfo from "./views/ObjectInfo";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Route exact path="/" component={OrbitPredictions} />
        <Route path="/community" component={Community} />
        <Route path="/observations" component={Observations} />
        <Route path="/submit" component={Submit} />
        <Route path="/account" component={AccountSettings} />
        <Route path="/object/:number" component={ObjectInfo} />
      </Router>
    </AuthProvider>
  );
}
