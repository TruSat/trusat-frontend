import React, { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useAuthDispatch } from "./auth/auth-context";
import { useUserDispatch } from "./user/user-context";
import { ObjectsProvider } from "./objects/objects-context";
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

export default function App() {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    // get jwt from local storage
    // utilized for authentication and is decoded to return users ethereum address
    const retrieveJwt = () => {
      const jwt = localStorage.getItem("trusat-jwt");
      authDispatch({ type: "SET_JWT", payload: jwt });
      authDispatch({ type: "AUTHENTICATED", payload: true });

      const { address } = jwt_decode(jwt);
      userDispatch({ type: "SET_USER_ADDRESS", payload: address });

      axios
        .post(
          `https://api.consensys.space:8080/profile`,
          JSON.stringify({
            jwt: jwt,
            address: address
          })
        )
        .then(result => {
          userDispatch({ type: "SET_USER_DATA", payload: result.data });
          userDispatch({ type: "SHOW_USER_PROFILE", payload: true });
        })
        .catch(err => console.log(err));
    };
    // private key for "burner wallet"
    // will be called if user has submitted an observation without signing up to TruSat
    const retrieveWallet = () => {
      const privateKey = localStorage.getItem("trusat-private-key");
      const wallet = new ethers.Wallet(privateKey);

      authDispatch({ type: "SET_BURNER", payload: wallet });
      userDispatch({
        type: "SET_USER_ADDRESS",
        payload: wallet.signingKey.address
      });
      authDispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
    };

    if (localStorage.getItem("trusat-private-key")) {
      retrieveWallet();
    }

    if (localStorage.getItem("trusat-jwt")) {
      retrieveJwt();
    }
  }, [authDispatch, userDispatch]);

  return (
    <Router>
      <BurgerMenu left />
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
    </Router>
  );
}
