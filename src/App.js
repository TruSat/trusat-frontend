import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context";
import NavBar from "./app/components/NavBar";
import Catalog from "./views/Catalog";
import Submit from "./views/Submit";
import Welcome from "./views/Welcome";
import Profile from "./views/Profile";
import UserSettings from "./views/UserSettings";
import About from "./views/About";
import HowTo from "./views/HowTo";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import ObjectInfo from "./views/ObjectInfo";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/catalog" component={Catalog} />
        <Route path="/catalog/submit" component={Submit} />
        <Route path="/object/:number" component={ObjectInfo} />
        <Route path="/profile/:address" component={Profile} />
        <Route path="/settings" component={UserSettings} />
        <Route path="/about" component={About} />
        <Route path="/how" component={HowTo} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </AuthProvider>
  );
}
