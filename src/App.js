import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthDispatch } from "./auth/auth-context";
import { useUserDispatch } from "./user/user-context";
import NavBar from "./app/components/NavBar";
import MobileHeader from "./app/components/MobileHeader";
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
import ClaimAccount from "./views/ClaimAccount";
import VerifyClaimAccount from "./views/VerifyClaimAccount";

export default function App() {
  const [isError, setIsError] = useState(false);
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    let didCancel = false;

    // get jwt from local storage
    // utilized for authentication and is decoded to return users ethereum address
    const retrieveJwtAndGetUserData = async () => {
      const jwt = localStorage.getItem("trusat-jwt");
      const { address } = await jwt_decode(jwt);

      try {
        const result = await axios.post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({
            jwt: jwt,
            address: address
          })
        );

        if (!didCancel) {
          authDispatch({ type: "SET_JWT", payload: jwt });
          authDispatch({
            type: "SET_USER_ADDRESS",
            payload: address
          });
          userDispatch({ type: "SET_USER_DATA", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          setIsError(true);
        }
      }
    };

    if (localStorage.getItem("trusat-jwt")) {
      retrieveJwtAndGetUserData();
    }
  }, [authDispatch, userDispatch]);

  return (
    <Router>
      {/* Shown on mobile view */}
      <BurgerMenu right />
      <MobileHeader />
      {/* Shown on desktop view */}
      <NavBar />

      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/catalog/:catalogFilter" component={Catalog} />
        <Route path="/submit" component={Submit} />
        <Route path="/object/:number" component={ObjectInfo} />
        <Route exact path="/profile/:address" component={Profile} />
        <Route exact path="/settings" component={AccountSettings} />
        <Route path="/settings/metamask" component={MetamaskImport} />
        <Route path="/about" component={About} />
        <Route path="/how" component={HowTo} />
        <Route path="/login" component={LogIn} />
        <Route path="/signup" component={SignUp} />
        <Route exact path="/claim" component={ClaimAccount} />
        <Route path="/claim/:jwt" component={VerifyClaimAccount} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

function NoMatch({ location }) {
  return (
    <div>
      <h3 className="app__error-message">
        <code>{location.pathname}</code> is not a route in TruSat. Please check
        that you entered the correct URL
      </h3>
    </div>
  );
}
