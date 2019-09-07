import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context";
import { UserProvider } from "./user/user-context";
import NavBar from "./app/components/NavBar";
import Catalog from "./views/Catalog";
import Submit from "./views/Submit";
import Welcome from "./views/Welcome";
import Profile from "./views/Profile";
import AccountSettings from "./views/AccountSettings";
import About from "./views/About";
import HowTo from "./views/HowTo";
import LogIn from "./views/LogIn";
import SignUp from "./views/SignUp";
import ObjectInfo from "./views/ObjectInfo";
import BurgerMenu from "./app/components/BurgerMenu";
import MetamaskImport from "./views/MetamaskImport";
import OnLoad from "./views/OnLoad";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          {/* TODO - create a better component to handle the "on Load" functions */}
          <OnLoad />
          <BurgerMenu left />
          <NavBar />
          <Route exact path="/" component={Welcome} />
          <Route path="/catalog/:catalogFilter" component={Catalog} />
          <Route path="/submit" component={Submit} />
          <Route path="/object/:number" component={ObjectInfo} />
          <Route path="/profile/:address" component={Profile} />
          <Route exact path="/settings" component={AccountSettings} />
          <Route path="/settings/metamask" component={MetamaskImport} />
          <Route path="/about" component={About} />
          <Route path="/how" component={HowTo} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}
