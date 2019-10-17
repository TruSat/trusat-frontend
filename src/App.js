import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { checkJwt } from "./auth/auth-helpers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthDispatch } from "./auth/auth-context";
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
import CookieBanner from "./app/components/CookieBanner";
import Charter from "./views/Charter";
import Whitepaper from "./views/Whitepaper";
import FAQ from "./views/FAQ";
import ReactGA from "react-ga";
import PrivacyPolicy from "./views/PrivacyPolicy";
import Terms from "./views/Terms";
import Footer from "./app/components/Footer";

export default function App() {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    // get jwt from local storage which is decoded to return the user ethereum address
    const retrieveJwtAndGetUserData = async () => {
      const jwt = localStorage.getItem("trusat-jwt");
      // checks if jwt is valid and hasn't expired
      checkJwt(jwt);

      const { address } = await jwt_decode(jwt);

      authDispatch({ type: "SET_JWT", payload: jwt });
      authDispatch({
        type: "SET_USER_ADDRESS",
        payload: address
      });
    };

    if (localStorage.getItem("trusat-jwt")) {
      retrieveJwtAndGetUserData();
    }
  }, [authDispatch]);

  return (
    <Router>
      {/* Shown on mobile view */}
      <BurgerMenu right />
      <MobileHeader />
      {/* Shown on desktop view */}
      <NavBar />
      <Route
        path="/"
        render={({ location }) => {
          ReactGA.pageview(location.pathname + location.search);
        }}
      />

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
        <Route path="/whitepaper" component={Whitepaper} />
        <Route path="/faq" component={FAQ}></Route>
        <Route path="/charter" component={Charter} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/terms" component={Terms} />
        <Route component={NoMatch} />
      </Switch>

      <CookieBanner />
      <Footer />
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
