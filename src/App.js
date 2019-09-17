import React, { useEffect } from "react";
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
    const retrieveJwt = async () => {
      const jwt = localStorage.getItem("trusat-jwt");
      await authDispatch({ type: "SET_JWT", payload: jwt });

      const { address } = await jwt_decode(jwt);
      userDispatch({
        type: "SET_USER_ADDRESS",
        payload: address
      });
    };
    // private key for "burner wallet"
    // will be called if user has submitted an observation without signing up to TruSat
    // const retrieveWallet = async () => {
    //   const privateKey = localStorage.getItem("trusat-private-key");
    //   const wallet = new ethers.Wallet(privateKey);

    //   authDispatch({ type: "SET_BURNER", payload: wallet });
    //   userDispatch({
    //     type: "SET_USER_ADDRESS",
    //     payload: wallet.signingKey.address
    //   });
    //   authDispatch({ type: "SET_AUTH_TYPE", payload: "burner" });
    // };

    if (localStorage.getItem("trusat-jwt")) {
      retrieveJwt();
    }

    // if (localStorage.getItem("trusat-private-key")) {
    //   retrieveWallet();
    // }
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
