import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context";
import NavBar from "./app/components/NavBar";
import Catalog from "./views/Catalog";
import Welcome from "./views/Welcome";
import Profile from "./views/Profile";
import About from "./views/About";
import HowTo from "./views/HowTo";
import ObjectInfo from "./views/ObjectInfo";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Route exact path="/" component={Welcome} />
        <Route path="/catalog" component={Catalog} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/how" component={HowTo} />
        <Route path="/object/:number" component={ObjectInfo} />
      </Router>
    </AuthProvider>
  );
}
