import React, { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuthDispatch } from "./auth/auth-context";
import { useUserDispatch } from "./user/user-context";
import { ObjectsProvider } from "./objects/objects-context";
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
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    // get jwt from local storage
    // utilized for authentication and is decoded to return users ethereum address
    const retrieveJwtAndGetUserData = async () => {
      const jwt = localStorage.getItem("trusat-jwt");
      const { address } = await jwt_decode(jwt);
      // console.log(`jwt from localStorage = `, jwt);
      // console.log(`decoded address from jwt in localStorage = `, address);
      await axios
        .post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({
            jwt: jwt,
            address: address
          })
        )
        .then(result => {
          // console.log(
          //   `userData retrieved from /profile on app load = `,
          //   result.data
          // );
          authDispatch({ type: "SET_JWT", payload: jwt });
          authDispatch({
            type: "SET_USER_ADDRESS",
            payload: address
          });
          userDispatch({ type: "SET_USER_DATA", payload: result.data });
        })
        .catch(err => console.log(err));
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

      <Route exact path="/" component={Welcome} />
      <Route path="/catalog/:catalogFilter" component={Catalog} />
      <Route path="/submit" component={Submit} />
      <ObjectsProvider>
        <Route path="/object/:number" component={ObjectInfo} />
      </ObjectsProvider>
      <Route path="/profile/:address" component={Profile} />
      <Route exact path="/settings" component={AccountSettings} />
      <Route path="/settings/metamask" component={MetamaskImport} />
      <Route path="/about" component={About} />
      <Route path="/how" component={HowTo} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
      <Route exact path="/claim" component={ClaimAccount} />
      <Route path="/claim/:jwt" component={VerifyClaimAccount} />
    </Router>
  );
}
